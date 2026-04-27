from alembic import op
import sqlalchemy as sa

revision = 'a201d98633a4'
down_revision = '30b0d3bc4b1b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('slug', sa.String(255), nullable=False, unique=True),
        sa.Column('body', sa.Text(), nullable=False),
        sa.Column('published_at', sa.DateTime(), nullable=True),
        sa.Column('is_published', sa.Boolean(), nullable=False, server_default='false'),
    )


def downgrade() -> None:
    op.drop_table('posts')
