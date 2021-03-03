import flask
from main import db, bcrypt
from sqlalchemy.sql.functions import now
from sqlalchemy.sql import select
from sqlalchemy.ext.hybrid import hybrid_property
import datetime


def get_expiry(context):
    from models.Tenant import Tenant
    tenant = Tenant.query.get(context.get_current_parameters()['tenant_id'])
    x = tenant.default_account_expiry_time
    return datetime.datetime.now() + datetime.timedelta(days=x)


class User(db.Model):
    __tablename__ = "users"

    __table_args__ = (
        db.UniqueConstraint('email', 'tenant_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    _password = db.Column("password", db.String(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    is_owner = db.Column(db.Boolean(), nullable=False, default=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=now())
    expires_on = db.Column(db.DateTime(), nullable=False, default=get_expiry)
    
    tenant_id = db.Column(
        db.Integer, 
        db.ForeignKey('tenants.id', ondelete="CASCADE"),
        nullable=False
    )

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')


    def __repr__(self):
        return f"email:{self.email} -- id:{self.id} -- tenant_id:{self.tenant_id}"