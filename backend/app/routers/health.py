from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/health")
async def health_check() -> dict:
    return {"status": "ok"}
