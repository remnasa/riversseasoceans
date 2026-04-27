from fastapi import FastAPI

from app.routers import health

app = FastAPI(title="Rivers Seas Oceans")

app.include_router(health.router)
