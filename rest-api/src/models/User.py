import flask
from main import db, bcrypt
from sqlalchemy.sql.functions import now
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    __tablename__ = "users"

    __table_args__ = (
        db.UniqueConstraint('email', 'tenant_id'),
    )

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    _password = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    is_owner = db.Column(db.Boolean(), nullable=False, default=False)
    created_at = db.Column(db.DateTime(), nullable=False, server_default=now())
    
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')


    def __repr__(self):
        return f"email:{self.email} -- id:{self.id} -- tenant_id:{self.tenant_id}"