# Mission Brief — riversseasoceans

**Last updated:** 2026-06-19 (ecosystem update, Session 15)

Living briefing for `riversseasoceans`. Overwritten each session.
Detailed session history: `.claude/journal/` (untracked, never committed).

---

## What This Is

`riversseasoceans.org` — personal full-stack learning platform and portfolio.

Stack: FastAPI + Uvicorn (socket) → Nginx (SSL, 443) → React 19 + Vite SPA
Database: PostgreSQL (`rso` db, `rso_user`)
Server: DigitalOcean droplet `164.92.86.239`, user `remnasa`

---

## Current State

| Component | Status |
|---|---|
| FastAPI backend | ✓ Live |
| React frontend | ✓ Live |
| PostgreSQL + SQLAlchemy + Alembic | ✓ Connected |
| Blog feature (CRUD) | ✓ Complete |
| CI/CD (push to main → deploy) | ✓ Active |
| SSL + Nginx | ✓ Configured |
| Music / Projects page | ✗ Not built |
| Learning playgrounds (per Coursera course) | ✗ Not started |
| RAG (dysorthographia/dyslexia research) | ✗ Not started |

---

## What Was Done Last Session Touching This Repo (Session 14 — 2026-06-15)

- Order of the Phoenix service deployed to same production server (`phoenix.service`, port 8001)
- No changes to `riversseasoceans` app code in Sessions 14–15
- README updated to reflect current stack and architecture

---

## What Needs to Be Done Next

1. **Music / Projects page** — display AI-generated music and showcase built projects (OOTP, DA, RSO itself)
2. **Learning Playgrounds** — interactive per-course sections tied to Coursera curriculum
3. **RAG system** — ingest research papers on dysorthographia/dyslexia; semantic search + Q&A

---

## Server Quick Reference

```bash
ssh remnasa@164.92.86.239
source ~/riversseasoceans/venv/bin/activate
sudo systemctl restart uvicorn
sudo journalctl -u uvicorn --no-pager | tail -30
```

---

## Journal

Session detail (never committed): `.claude/journal/`
