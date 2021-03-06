import flask
from main import db


class Tenant(db.Model):
    __tablename__ = 'tenants'

    id = db.Column(db.Integer, primary_key=True)
    domain_name = db.Column(db.String(10), nullable=False, unique=True)
    primary_color = db.Column(db.String(7))
    secondary_color = db.Column(db.String(7))
    open_registration = db.Column(db.Boolean(), nullable=False, default=True)
    default_account_expiry_time = db.Column(db.Integer, default=365)
    statement = db.Column(db.String(1000))
    description = db.Column(db.String(1000))
    location = db.Column(db.String(500))
    phone = db.Column(db.String(15))

    users = db.relationship('User', backref='tenant', passive_deletes='all')
    facilities = db.relationship('Facility', backref='tenant', passive_deletes='all')

    def __repr__(self):
        return f"{self.domain_name} -- {self.id}"
