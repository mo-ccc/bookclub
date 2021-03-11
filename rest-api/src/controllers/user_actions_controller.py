import flask
from main import db
import flask_jwt_extended as jwt
import datetime

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

@actions.route("/myuser", subdomain="<domain_name>", methods=["GET"])
@jwt.jwt_required()
def get_self(domain_name):
    return flask.jsonify(UserSchema().dump(jwt.current_user))

@actions.route("/myuser", subdomain="<domain_name>", methods=["PATCH"])
@jwt.jwt_required()
def patch_self(domain_name):
    data = UserSchema(exclude=("is_admin", "expires_in"), partial=True).load(flask.request.json)
    for key, value in data.items():
        setattr(jwt.current_user, key, value)
    db.session.commit()
    return flask.jsonify(UserSchema().dump(jwt.current_user))

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

@actions.route('/booking/<id>', subdomain="<domain_name>", methods=["DELETE"])
@jwt.jwt_required()
def delete_booking(domain_name, id):
    booking = Booking.query.get(id)
    from schemas.BookingSchema import convert_time

    if not jwt.current_user.id == booking.user_id or \
    convert_time(booking.date, booking.timeslot) < datetime.datetime.utcnow():
        flask.abort(401)
    db.session.delete(booking)
    db.session.commit()
    return flask.jsonify(BookingSchema().dump(booking))