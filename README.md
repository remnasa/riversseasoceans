# Rivers Seas Oceans

![CI/CD](https://github.com/remnasa/riversseasoceans/actions/workflows/ci.yml/badge.svg)

Personal learning platform and portfolio at [riversseasoceans.org](https://riversseasoceans.org).

## Stack

- **Backend:** FastAPI + Uvicorn + SQLAlchemy + Alembic + PostgreSQL
- **Frontend:** React 19 + Vite + React Router + react-markdown
- **Infra:** DigitalOcean droplet, Nginx, Let's Encrypt SSL

## Architecture

```
Browser (HTTPS)
  ↓
Nginx (port 443, SSL)
  ├─ /api/     → unix:/run/uvicorn/uvicorn.sock → Uvicorn → FastAPI
  └─ /         → frontend/dist/ (React SPA)
```

## Local Development

**Prerequisites:** Python 3.11+, Node 24+

```bash
# Terminal 1 — backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Terminal 2 — frontend
cd frontend
npm install
npm run dev   # Vite on :5173, proxies /api → :8000
```

Open `http://localhost:5173` in your browser.

## Running Tests

```bash
cd backend
source venv/bin/activate
pytest
ruff check .
```

## Database Migrations

```bash
cd backend
source venv/bin/activate
export DB_PASSWORD=your_password

# Apply all migrations
alembic upgrade head

# Create a new migration after model changes
alembic revision --autogenerate -m "description"
```

## CI/CD

On every push to `main`, GitHub Actions runs:

1. **Test** — `ruff check` + `pytest`
2. **Build** — `npm run build` (Node 24)
3. **Deploy** — SSH into the server, pull, install deps, run migrations, rebuild frontend, restart Uvicorn

Manual deploy (if needed):

```bash
ssh remnasa@164.92.86.239
cd ~/riversseasoceans
git pull
source venv/bin/activate
pip install -r backend/requirements.txt
cd backend && alembic upgrade head
cd ~/riversseasoceans/frontend && npm install && npm run build
sudo systemctl restart uvicorn
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/posts` | List published posts (newest first) |
| `GET` | `/api/posts/{slug}` | Get a single published post by slug |

## Project Structure

```
riversseasoceans/
├── .github/
│   └── workflows/
│       └── ci.yml             # Test → build → deploy on push to main
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI app entry point
│   │   ├── config.py          # Settings via env vars (pydantic-settings)
│   │   ├── database.py        # SQLAlchemy async engine + Base
│   │   ├── routers/
│   │   │   ├── health.py      # GET /api/health
│   │   │   └── posts.py       # GET /api/posts, GET /api/posts/{slug}
│   │   ├── models/
│   │   │   └── post.py        # Post ORM model
│   │   └── schemas/
│   │       └── post.py        # PostResponse Pydantic schema
│   ├── tests/
│   │   ├── conftest.py        # Async test client + in-memory SQLite DB
│   │   ├── test_main.py       # Health endpoint tests
│   │   └── test_posts.py      # Posts endpoint tests
│   ├── alembic/               # DB migrations
│   ├── alembic.ini
│   ├── pyproject.toml         # Ruff + pytest config
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── main.jsx            # React entry point
    │   ├── App.jsx             # React Router — / /blog /blog/:slug
    │   ├── App.css
    │   ├── index.css
    │   ├── pages/
    │   │   ├── Home.jsx        # Landing page
    │   │   ├── BlogList.jsx    # GET /api/posts → list of posts
    │   │   └── PostDetail.jsx  # GET /api/posts/:slug → Markdown post
    │   └── assets/
    └── vite.config.js          # /api proxy → :8000 in dev
```
