from datetime import datetime

from pydantic import BaseModel


class PostResponse(BaseModel):
    id: int
    title: str
    slug: str
    body: str
    published_at: datetime | None

    model_config = {"from_attributes": True}
