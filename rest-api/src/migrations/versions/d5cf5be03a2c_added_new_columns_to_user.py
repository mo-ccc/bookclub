"""added new columns to user

Revision ID: d5cf5be03a2c
Revises: c3476fc6578d
Create Date: 2021-03-01 17:30:43.089620

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5cf5be03a2c'
down_revision = 'c3476fc6578d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('expires_on', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('name', sa.String(length=30), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('name')
        batch_op.drop_column('expires_on')

    # ### end Alembic commands ###