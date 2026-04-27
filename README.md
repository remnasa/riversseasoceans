# Rivers Seas Oceans

Personal learning platform and portfolio at [riversseasoceans.org](https://riversseasoceans.org).

## Stack

- **Backend:** FastAPI + Uvicorn + SQLAlchemy + Alembic + PostgreSQL
- **Frontend:** React + Vite
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

**Prerequisites:** Python 3.11+, Node 20+

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev   # Vite dev server on :5173, proxies /api → :8000
```

## Running Tests

```bash
cd backend
pytest
ruff check .
```

## Project Structure

```
riversseasoceans/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py      # Settings via env vars
│   │   ├── database.py    # SQLAlchemy async engine
│   │   ├── routers/       # Route handlers
│   │   ├── models/        # ORM models
│   │   └── schemas/       # Pydantic schemas
│   ├── tests/
│   ├── alembic/           # DB migrations
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── pages/
    └── vite.config.js
```
