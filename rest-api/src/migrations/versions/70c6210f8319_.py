"""empty message

Revision ID: 70c6210f8319
Revises: 4ff7df824215
Create Date: 2021-02-22 18:58:04.952468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70c6210f8319'
down_revision = '4ff7df824215'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('is_owner', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('domain_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['domain_id'], ['tenants.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.drop_table('members')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('members',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), nullable=False),
    sa.Column('password', sa.VARCHAR(), nullable=False),
    sa.Column('is_admin', sa.BOOLEAN(), nullable=False),
    sa.Column('is_owner', sa.BOOLEAN(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('domain_id', sa.INTEGER(), nullable=False),
    sa.CheckConstraint('is_admin IN (0, 1)'),
    sa.CheckConstraint('is_owner IN (0, 1)'),
    sa.ForeignKeyConstraint(['domain_id'], ['tenants.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.drop_table('users')
    # ### end Alembic commands ###
