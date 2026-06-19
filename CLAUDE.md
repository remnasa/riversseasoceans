# CLAUDE.md — riversseasoceans

## GOLDEN RULES — Always Active

1. Harry always orchestrates. No direct technical answers without dispatching a specialist.
2. Credentials never in code. Secrets in `uvicorn.service` systemd file only.
3. Security (Kingsley) and compliance (Lupin) reviews never skipped for production work.
4. A BLOCKER from any agent halts that work stream.
5. MISSION_BRIEF.md always maintained. Journal captures session detail.
6. Destructive actions require explicit user approval before executing.
7. **Always run `ruff check .` before committing. Always run `pytest` after any code change.**
8. **Always run `npm run build` and verify the build before deploying frontend changes.**

---

## What This Repo Is

`riversseasoceans.org` — personal full-stack learning platform and portfolio. FastAPI
backend + React 19 frontend, live in production. This is the primary user-facing project.

Does NOT contain OOTP or DA agent code — those are separate repos. This repo is the
platform; the others are services that may eventually integrate with it.

**Connects to:**
- `rso-devops` — Nginx config, `uvicorn.service` systemd file
- `order-of-the-phoenix` — runs on same server at port 8001 (no code overlap)

---

## Stack

```
Browser → Nginx (443, SSL) → unix:/run/uvicorn/uvicorn.sock → Uvicorn → FastAPI → PostgreSQL
                           → /home/remnasa/riversseasoceans/frontend/dist/ (React SPA)
```

- **Backend:** FastAPI + Uvicorn (socket), `backend/app/`
- **Frontend:** React 19 + Vite, `frontend/src/`, built to `frontend/dist/`
- **Database:** PostgreSQL, db `rso`, user `rso_user`, port 5432
- **ORM:** SQLAlchemy 2.0 async + Alembic, `backend/alembic/`
- **Server:** DigitalOcean `164.92.86.239`, user `remnasa`

---

## Common Commands

```bash
# SSH to server
ssh remnasa@164.92.86.239

# Activate venv (server)
source ~/riversseasoceans/venv/bin/activate

# Service management
sudo systemctl restart uvicorn
sudo systemctl reload nginx
sudo systemctl status uvicorn

# Check logs
sudo journalctl -u uvicorn --no-pager | tail -30

# Run tests (from backend/)
cd backend && pytest

# Lint (from backend/)
cd backend && ruff check .
cd backend && ruff check --fix . && ruff format .

# Build frontend
cd frontend && npm run build

# Run migrations
cd backend && alembic upgrade head
cd backend && alembic current
```

---

## Deploying Changes

**Backend code change:**
```bash
sudo systemctl restart uvicorn
```

**Frontend change:**
```bash
cd ~/riversseasoceans/frontend && npm run build
sudo systemctl reload nginx
```

**Nginx config change (from rso-devops repo):**
```bash
sudo cp /dev/stdin /etc/nginx/sites-available/riversseasoceans.org   # paste, Ctrl+D
sudo nginx -t
sudo systemctl reload nginx
```

Never paste multi-line configs into nano — line wrapping breaks them. Use `cp /dev/stdin`.

---

## Agent Layer Note

This project is part of a two-layer agent system:
- **Layer 1 (hogwarts-agents):** Claude Code assistant agents — help you build this software
- **Layer 2 (runtime agents):** OOTP (`ootp_`) and DA (`da_`) agents run as separate services

Hogwarts agents handle coding assistance for this repo. The OOTP/DA runtime agents are
separate services on the same server — they do not live in this codebase.

---

## Code Standards

**Python (backend):**
- Python 3.11, Ruff enforced (`E`, `W`, `F`, `I`, `N`, `UP`, `S`)
- All endpoints async — no sync FastAPI routes
- SQLAlchemy 2.0: `select()` syntax, `mapped_column()`, `AsyncSession`
- Pydantic v2: `ConfigDict`, not class-based `Config`
- Type hints on every function signature

**JavaScript (frontend):**
- React 19 + Vite, `.jsx` files
- No TypeScript yet — add only if explicitly decided
- ESLint (if configured)

**Naming:**
| Thing | Style | Example |
|---|---|---|
| Variables / functions | `snake_case` | `get_posts` |
| Classes | `PascalCase` | `PostDetail` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| URL paths | `kebab-case` | `/api/blog-posts` |
| React components | `PascalCase` | `BlogCard` |

---

## Feature Roadmap

| Feature | Status |
|---|---|
| FastAPI backend | ✓ Live |
| React frontend | ✓ Live |
| PostgreSQL + SQLAlchemy + Alembic | ✓ Connected |
| Blog (CRUD) | ✓ Complete |
| CI/CD (push → deploy) | ✓ Active |
| SSL + Nginx | ✓ Configured |
| Music / Projects page | ✗ Next |
| Learning Playgrounds (per Coursera course) | ✗ Planned |
| RAG — dysorthographia/dyslexia research | ✗ Planned |

---

## Current Mission

See `MISSION_BRIEF.md` for current state, open blockers, and next step.
See `.claude/journal/` for full session history.
