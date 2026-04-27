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

## Deploying to Production

```bash
# SSH into server
ssh remnasa@164.92.86.239

# Pull latest code
cd ~/riversseasoceans
git pull

# If backend changed
sudo systemctl restart uvicorn

# If frontend changed
cd frontend
npm run build

# If migrations needed
cd ../backend
source ../venv/bin/activate
alembic upgrade head
```

## Project Structure

```
riversseasoceans/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py      # Settings via env vars (pydantic-settings)
│   │   ├── database.py    # SQLAlchemy async engine + Base
│   │   ├── routers/
│   │   │   └── health.py  # GET /api/health
│   │   ├── models/        # ORM models (added per feature)
│   │   └── schemas/       # Pydantic schemas (added per feature)
│   ├── tests/
│   │   └── test_main.py
│   ├── alembic/           # DB migrations
│   ├── alembic.ini
│   ├── pyproject.toml     # Ruff + pytest config
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── pages/
    │   │   └── Home.jsx
    │   └── index.css
    └── vite.config.js     # /api proxy → :8000 in dev
```
