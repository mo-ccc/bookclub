import flask
from main import db
import flask_jwt_extended as jwt

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility
from models.Booking import Booking

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema
from schemas.BookingSchema import BookingSchema

from services import jwt_services

actions = flask.Blueprint("actions", __name__)

@actions.route("/booking-history", subdomain="<domain_name>", methods=["GET"])
@actions.route("/booking-history/<num>", subdomain="<domain_name>", methods=["GET"])
@jwt.jwt_required()
def get_booking_history(domain_name, num=0):
    if not num:
        bookings = Booking.query.filter_by(
            user_id=jwt.current_user.id
            ).order_by(Booking.id.desc()).all()
    else:
        bookings = Booking.query.filter_by(
            user_id=jwt.current_user.id
            ).order_by(Booking.id.desc()).limit(num)

    return flask.jsonify(BookingSchema(many=True).dump(bookings))

# Method to make a booking
@actions.route('/facility/<id>', subdomain="<domain_name>", methods=["POST"])
@jwt.jwt_required()
def make_booking(domain_name, id):
    facility = Facility.query.get(id)
    schema = BookingSchema(exclude=("user_id", "facility_id"))

    schema.context["fid"] = facility # a context is passed for one of the validators
    # the context is the facility the booking is made on
    data = schema.load(flask.request.json)

    booking = Booking(**data)
    booking.user = jwt.current_user
    facility.bookings.append(booking)
    db.session.commit()
    return flask.jsonify(BookingSchema().dump(booking)), 201