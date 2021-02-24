import flask
from main import db

class Facility(db.Model):
    __tablename__ = "facilities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(1000))
    disabled = db.Column(db.Boolean(), nullable=False, default=True)
    max_capacity = db.Column(db.Integer, default=30)
    max_guests = db.Column(db.Integer, nullable=False, default=0)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenants.id'), nullable=False)

    def __repr__(self):
        return f"name:{self.name} -- id:{self.id} -- tenant:{self.tenant_id}"