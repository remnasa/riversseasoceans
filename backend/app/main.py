from fastapi import FastAPI

from app.routers import health, posts

app = FastAPI(title="Rivers Seas Oceans")

app.include_router(health.router)
app.include_router(posts.router)
