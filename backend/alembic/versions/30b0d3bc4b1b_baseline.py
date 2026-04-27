"""baseline

Revision ID: 30b0d3bc4b1b
Revises: 
Create Date: 2026-04-27 02:08:26.212163

"""
from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = '30b0d3bc4b1b'
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
