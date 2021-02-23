import flask
from main import db
from sqlalchemy.sql.functions import now

class User(db.Model):
    __tablename__ = "users"

    __table_args__ = (
        db.UniqueConstraint('email', 'tenant_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    is_owner = db.Column(db.Boolean(), nullable=False, default=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=now())
    
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)

    def __repr__(self):
        return f"{self.email} -- {self.id}"