from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.post import Post
from app.schemas.post import PostResponse

router = APIRouter(prefix="/api")


@router.get("/posts", response_model=list[PostResponse])
async def list_posts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Post).where(Post.is_published.is_(True)).order_by(Post.published_at.desc())
    )
    return result.scalars().all()


@router.get("/posts/{slug}", response_model=PostResponse)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Post).where(Post.slug == slug, Post.is_published.is_(True))
    )
    post = result.scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
