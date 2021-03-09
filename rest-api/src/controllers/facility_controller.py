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
    facilities = Facility.query.filter_by(tenant_id=tenant.id).all()
    return flask.jsonify(FacilitySchema(many=True).dump(facilities))

@facilities.route('/facility/<id>', subdomain="<domain_name>", methods=["PATCH"])
@jwt.jwt_required()
@jwt_services.admin_required()
def patch_facility(domain_name, id):
    facility = Facility.query.filter_by(id=id).first_or_404()
    data = FacilitySchema().load(flask.request.json)
    availability_data = data.pop("availabilities") # pops out the availability nested fields
    for key, value in data.items():
        setattr(facility, key, value)

    db.session.flush()

    if availability_data:
        availability_for_facility = Availability.query.filter_by(facility_id=facility.id).first()
        for key, value in availability_data.items():
            setattr(availability_for_facility, key, value)
    db.session.commit()
    return flask.jsonify(FacilitySchema().dump(facility))

@facilities.route('/facility/<id>', subdomain="<domain_name>", methods=["DELETE"])
@jwt.jwt_required()
@jwt_services.admin_required()
def delete_facility(domain_name, id):
    facility = Facility.query.filter_by(id=id).first_or_404()
    db.session.delete(facility)
    db.session.commit()
    return flask.jsonify(FacilitySchema().dump(facility))

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

    # dump the facility
    facility_data = FacilitySchema().dump(facility)
    # check if there are any time bounds
    if facility_data["availabilities"]:
        # if there are pop them out
        availabilities = facility_data.pop("availabilities")

        # generates some strings to use as keys for the next block
        weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        weekday_num = datetime.datetime.fromisoformat(date).weekday()
        current_day_keys = [f"{weekdays[weekday_num]}Start", f"{weekdays[weekday_num]}End"]

        # parse the values needed from the availability
        new_availability_dict = {
            "open":availabilities.get(current_day_keys[0], 0), 
            "close":availabilities.get(current_day_keys[1], 48),
        }
    else:
        new_availability_dict = {
            "open":0, 
            "close":48,
        }

    """
        facility: {
            availabilities: {open:0, close:48}
            ...
        }
        counts: {
            1: 8,
        }
    """

    facility_data["availabilities"] = new_availability_dict
    return flask.jsonify({"counts":counts, "facility":facility_data})


