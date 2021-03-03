import flask
from main import db

class Availability(db.Model):
    __tablename__ = "availabilities"

    facility_id = db.Column(db.Integer, db.ForeignKey('facilities.id', ondelete="CASCADE"),
        nullable=False, primary_key = True
    )

    mondayStart = db.Column(db.Integer)
    mondayEnd = db.Column(db.Integer)
    tuesdayStart = db.Column(db.Integer)
    tuesdayEnd = db.Column(db.Integer)
    wednesdayStart = db.Column(db.Integer)
    wednesdayEnd = db.Column(db.Integer)
    thursdayStart = db.Column(db.Integer)
    thursdayEnd = db.Column(db.Integer)
    fridayStart = db.Column(db.Integer)
    fridayEnd = db.Column(db.Integer)
    saturdayStart = db.Column(db.Integer)
    saturdayEnd = db.Column(db.Integer)
    sundayStart = db.Column(db.Integer)
    sundayEnd = db.Column(db.Integer)
    