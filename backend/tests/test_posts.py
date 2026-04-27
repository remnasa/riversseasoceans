import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.mark.anyio
async def test_list_posts_empty():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/api/posts")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.anyio
async def test_get_post_not_found():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as client:
        response = await client.get("/api/posts/nonexistent-slug")
    assert response.status_code == 404
