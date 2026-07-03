from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import datetime

import models
from database import engine, get_db

import os
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio Blog API")

# Configure CORS
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Dependency
security = HTTPBearer()
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "default_secret_token_change_me_in_prod")

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != ADMIN_TOKEN:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return credentials.credentials

# Pydantic Schemas for response formatting
class PostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    cover_image: Optional[str] = None
    read_time: int
    tags: List[str] = []
    
    class Config:
        from_attributes = True

class PostListResponse(PostBase):
    date: str # Formatted date string to match frontend

class PostDetailResponse(PostBase):
    content: str
    date: str

class PostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    read_time: int = 5
    tags: List[str] = []

class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    read_time: Optional[int] = None
    tags: Optional[List[str]] = None

def format_date(dt: datetime.datetime) -> str:
    if not dt:
        return ""
    # E.g., "June 15, 2026"
    return dt.strftime("%B %d, %Y").replace(" 0", " ")

@app.get("/api/posts", response_model=List[PostListResponse])
def get_posts(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    posts = db.query(models.Post).order_by(models.Post.published_at.desc()).offset(skip).limit(limit).all()
    
    # Format for the frontend
    response = []
    for p in posts:
        response.append(
            PostListResponse(
                title=p.title,
                slug=p.slug,
                excerpt=p.excerpt,
                cover_image=p.cover_image,
                read_time=p.read_time,
                tags=p.tags if p.tags else [],
                date=format_date(p.published_at)
            )
        )
    return response

@app.get("/api/posts/{slug}", response_model=PostDetailResponse)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    return PostDetailResponse(
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt,
        content=post.content,
        cover_image=post.cover_image,
        read_time=post.read_time,
        tags=post.tags if post.tags else [],
        date=format_date(post.published_at)
    )

@app.post("/api/posts", response_model=PostDetailResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db), token: str = Depends(verify_admin)):
    db_post = models.Post(
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt,
        content=post.content,
        cover_image=post.cover_image,
        read_time=post.read_time,
        tags=post.tags,
        published_at=datetime.datetime.utcnow()
    )
    db.add(db_post)
    try:
        db.commit()
        db.refresh(db_post)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="Slug already exists or database error")
    
    return PostDetailResponse(
        title=db_post.title,
        slug=db_post.slug,
        excerpt=db_post.excerpt,
        content=db_post.content,
        cover_image=db_post.cover_image,
        read_time=db_post.read_time,
        tags=db_post.tags,
        date=format_date(db_post.published_at)
    )

@app.put("/api/posts/{slug}", response_model=PostDetailResponse)
def update_post(slug: str, post_update: PostUpdate, db: Session = Depends(get_db), token: str = Depends(verify_admin)):
    db_post = db.query(models.Post).filter(models.Post.slug == slug).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    update_data = post_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
        
    db.commit()
    db.refresh(db_post)
    
    return PostDetailResponse(
        title=db_post.title,
        slug=db_post.slug,
        excerpt=db_post.excerpt,
        content=db_post.content,
        cover_image=db_post.cover_image,
        read_time=db_post.read_time,
        tags=db_post.tags,
        date=format_date(db_post.published_at)
    )

@app.delete("/api/posts/{slug}")
def delete_post(slug: str, db: Session = Depends(get_db), token: str = Depends(verify_admin)):
    db_post = db.query(models.Post).filter(models.Post.slug == slug).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}


# ── Contact Form ──────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def submit_contact(contact: ContactMessage):
    """
    Receives a contact form submission.
    Sends a notification via Discord webhook if configured,
    otherwise just logs the message.
    """
    import httpx

    discord_webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

    # Build a nice embed for Discord
    embed = {
        "embeds": [{
            "title": "📬 New Portfolio Contact Message",
            "color": 5763719,  # Green accent
            "fields": [
                {"name": "Name", "value": contact.name, "inline": True},
                {"name": "Email", "value": contact.email, "inline": True},
                {"name": "Message", "value": contact.message},
            ],
            "timestamp": datetime.datetime.utcnow().isoformat(),
        }]
    }

    if discord_webhook_url:
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.post(discord_webhook_url, json=embed)
                resp.raise_for_status()
        except Exception as e:
            print(f"Discord webhook failed: {e}")
            # Still return success to the user — we got their message
    else:
        # No webhook configured — just log it
        print(f"[CONTACT] From: {contact.name} <{contact.email}> — {contact.message}")

    return {"message": "Thank you! Your message has been received."}


# ── Sitemap & RSS ─────────────────────────────────────────────────────────────

from fastapi.responses import Response

SITE_URL = os.getenv("SITE_URL", "https://tusharnangare.netlify.app")

@app.get("/sitemap.xml")
def sitemap(db: Session = Depends(get_db)):
    """Generate a dynamic sitemap.xml from all blog posts."""
    posts = db.query(models.Post).order_by(models.Post.published_at.desc()).all()

    urls = [
        f"""  <url>
    <loc>{SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>""",
        f"""  <url>
    <loc>{SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>""",
    ]

    for post in posts:
        last_mod = post.published_at.strftime("%Y-%m-%d") if post.published_at else ""
        urls.append(f"""  <url>
    <loc>{SITE_URL}/blog/{post.slug}</loc>
    <lastmod>{last_mod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"".join(urls)}
</urlset>"""

    return Response(content=xml, media_type="application/xml")


@app.get("/rss.xml")
def rss_feed(db: Session = Depends(get_db)):
    """Generate an RSS 2.0 feed from all blog posts."""
    posts = db.query(models.Post).order_by(models.Post.published_at.desc()).limit(20).all()

    items = []
    for post in posts:
        pub_date = post.published_at.strftime("%a, %d %b %Y %H:%M:%S GMT") if post.published_at else ""
        items.append(f"""    <item>
      <title>{post.title}</title>
      <link>{SITE_URL}/blog/{post.slug}</link>
      <description>{post.excerpt}</description>
      <pubDate>{pub_date}</pubDate>
      <guid>{SITE_URL}/blog/{post.slug}</guid>
    </item>""")

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Tushar Nangare — DevOps Blog</title>
    <link>{SITE_URL}/blog</link>
    <description>Thoughts, tutorials and learnings from my DevOps journey.</description>
    <language>en-us</language>
{"".join(items)}
  </channel>
</rss>"""

    return Response(content=xml, media_type="application/xml")
