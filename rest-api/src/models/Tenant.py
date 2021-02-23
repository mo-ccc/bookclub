import flask
from main import db


class Tenant(db.Model):
    __tablename__ = 'tenants'

    id = db.Column(db.Integer, primary_key=True)
    domain_name = db.Column(db.String(10), nullable=False, unique=True)
    primary_color = db.Column(db.String(8))
    secondary_color = db.Column(db.String(8))
    open_registration = db.Column(db.Boolean())

    users = db.relationship('User', backref='tenant', passive_deletes='all')
    facilities = db.relationship('Facility', backref='tenant', passive_deletes='all')

    def __repr__(self):
        return f"{self.domain_name} -- {self.id}"
