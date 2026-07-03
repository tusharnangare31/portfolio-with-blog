import datetime
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

# Ensure tables are created
models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    try:
        # Check if we already have data
        if db.query(models.Post).count() > 0:
            print("Database already seeded!")
            return

        print("Seeding database with sample posts...")
        
        posts = [
            models.Post(
                title="Getting Started with Docker: A Beginner's Guide",
                slug="getting-started-with-docker",
                excerpt="Learn the fundamentals of Docker containerization and how to deploy your first containerized application.",
                content="""
# Getting Started with Docker

Docker is a platform designed to help developers build, share, and run modern applications. We handle the tedious setup, so you can focus on the code.

## Why Docker?
- **Consistency**: Run anywhere without "it works on my machine" issues.
- **Speed**: Deploy applications in seconds.
- **Isolation**: Keep applications and dependencies isolated.

## Basic Example
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

That's it for this quick introduction!
                """,
                published_at=datetime.datetime(2026, 6, 15, 10, 0),
                read_time=8,
                tags=["Docker", "DevOps", "Containerization"],
                cover_image="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80"
            ),
            models.Post(
                title="Deploying Applications on AWS: EC2, ECS, and Beyond",
                slug="aws-cloud-deployment-guide",
                excerpt="A comprehensive guide to deploying your applications on AWS using EC2, ECS, and Auto Scaling.",
                content="""
# AWS Deployment Guide

Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform. Let's look at a few deployment strategies.

## 1. Amazon EC2
Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud.

## 2. Amazon ECS
Amazon Elastic Container Service (Amazon ECS) is a highly scalable, fast, container management service that makes it easy to run, stop, and manage Docker containers on a cluster.

### ECR Push Commands
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker build -t my-app .
docker tag my-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```
                """,
                published_at=datetime.datetime(2026, 6, 28, 14, 30),
                read_time=12,
                tags=["AWS", "Cloud", "DevOps", "Docker"],
                cover_image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
            ),
            models.Post(
                title="My Journey into DevOps: From IT Student to Cloud Enthusiast",
                slug="my-devops-journey",
                excerpt="How I transitioned from a traditional IT student to a DevOps enthusiast, and the lessons I learned along the way.",
                content="""
# My DevOps Journey

Hello! I'm Tushar Nangare, an aspiring DevOps Engineer currently studying at PES Modern College of Engineering. 

## The Beginning
My journey started when I realized that writing code was only half the battle. Getting that code to run reliably in production was a completely different challenge.

## Discovering Docker and Cloud
I started learning Docker, which was a "lightbulb" moment for me. Containerization made so much sense! From there, I moved on to AWS.

### Key Milestones
1. Learning Linux administration
2. Mastering Git and GitHub
3. Containerization with Docker
4. CI/CD pipelines with GitHub Actions
5. Infrastructure as Code (Terraform)

I'm still learning every day, but the journey has been incredibly rewarding!
                """,
                published_at=datetime.datetime(2026, 7, 1, 9, 15),
                read_time=6,
                tags=["DevOps", "Career", "Learning"],
                cover_image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            )
        ]
        
        db.add_all(posts)
        db.commit()
        print("Database seeded successfully!")
        
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
