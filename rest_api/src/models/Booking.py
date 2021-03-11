import flask
from main import db

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    timeslot = db.Column(db.SmallInteger)
    guests = db.Column(db.SmallInteger)

    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False
    )

    facility_id = db.Column(
        db.Integer, db.ForeignKey('facilities.id', ondelete="CASCADE"), nullable=False
    )

    user = db.relationship("User")