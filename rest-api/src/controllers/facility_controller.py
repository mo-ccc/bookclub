import flask
from main import db
import flask_jwt_extended as jwt
import datetime

from services import jwt_services

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility
from models.Availability import Availability
from models.Booking import Booking

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema
from schemas.BookingSchema import BookingSchema

facilities = flask.Blueprint("facilities", __name__)

# Method to create a facility
@facilities.route('/facility', subdomain='<domain_name>', methods=["POST"])
@jwt.jwt_required()
@jwt_services.admin_required()
def make_facility(domain_name):
    if not jwt.current_user.is_admin or not jwt.current_user.is_owner:
        return flask.abort(401)

    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = FacilitySchema().load(flask.request.json)
    availability_data = data.pop("availabilities") # pops out the availability nested fields
    facility = Facility(**data)
    facility.tenant_id = tenant.id

    db.session.add(facility)
    db.session.flush()

    availabilities = Availability(**availability_data) 
    # uses the availability nested fields to instance an availabillity model
    availabilities.facility = facility
    db.session.add(availabilities)

    db.session.commit()

    return FacilitySchema().dump(facility)

# Method to retrieve all facilities in a subdomain
@facilities.route('/facility', subdomain="<domain_name>", methods=["GET"])
def get_facilities(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    facilities = Facility.query.filter_by(tenant_id=tenant.id)
    return flask.jsonify(FacilitySchema(many=True).dump(facilities))

# Method to make a booking
@facilities.route('/facility/<id>', subdomain="<domain_name>", methods=["POST"])
@jwt.jwt_required()
def make_booking(domain_name, id):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
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

# Detail get method
@facilities.route('/facility/<id>/<date>', subdomain="<domain_name>", methods=["GET"])
def detail_get_facility(domain_name, id, date):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    facility = Facility.query.filter_by(id=id).first_or_404()
    bookings = Booking.query.filter(
        Booking.facility_id==id, 
        Booking.date==datetime.datetime.fromisoformat(date)
    ).all()

    # this block adds up the number of bookings for each timeslot and stores them in a dict
    # such as: {1: 8, 2: 5}. which means 8 bookings on the first timeslot of the day.
    counts = {}
    for x in bookings:
        if x.timeslot not in counts:
            counts[x.timeslot] = 1
        else:
            counts[x.timeslot] = counts[x.timeslot] + 1
    
    # generates some strings to use as keys for the next block
    weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    weekday_num = datetime.datetime.fromisoformat(date).weekday()
    yesterday_key = f"{weekdays[weekday_num-1]}End"
    current_day_keys = [f"{weekdays[weekday_num]}Start", f"{weekdays[weekday_num]}End"]
    if weekday_num == 6:
        tomorrow_day_key = "mondayStart"
    else:
        tomorrow_day_key = f"{weekdays[weekday_num+1]}Start"

    # dump the facility
    facility_data = FacilitySchema().dump(facility)
    # check if there are an time bounds
    if facility_data["availabilities"]:
        # if there are pop them out
        availabilities = facility_data.pop("availabilities")
        # parse the values needed from the availability
        new_availability_dict = {
            "yesterday_close":availabilities.get(yesterday_key, 48),
            "open":availabilities.get(current_day_keys[0], 0), 
            "close":availabilities.get(current_day_keys[1], 48),
            "tomorrow_open":availabilities.get(tomorrow_day_key, 0)
        }
    else:
        new_availability_dict = {
            "yesterday_close":48,
            "open":0, 
            "close":48,
            "tomorrow_open":0
        }

    facility_data["availabilities"] = new_availability_dict
    return flask.jsonify({"counts":counts, "facility":facility_data})


