from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    excerpt = Column(String)
    content = Column(Text)
    cover_image = Column(String, nullable=True)
    published_at = Column(DateTime, server_default=func.now())
    read_time = Column(Integer, default=5)
    tags = Column(JSON, default=list)
