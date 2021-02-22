import flask
from main import db


class Tenant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String(10), nullable=False)
    primary_color = db.Column(db.String(8))
    secondary_color = db.Column(db.String(8))

    members = db.relationship('Member', backref='tenant', passive_deletes='all')

    def __repr__(self):
        return f"{self.domain} -- {self.id}"
