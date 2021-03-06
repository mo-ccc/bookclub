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

# Detail get method
@facilities.route('/facility/<id>/<date>', subdomain="<domain_name>", methods=["GET"])
def detail_get_facility(domain_name, id, date):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    facility = Facility.query.filter_by(id=id).first_or_404()
    bookings = Booking.query.filter(
        Booking.facility_id==id, 
        Booking.date==datetime.datetime.fromisoformat(date)
    ).all()
    counts = {}
    for x in bookings:
        if x.timeslot not in counts:
            counts[x.timeslot] = 1
        else:
            counts[x.timeslot] = counts[x.timeslot] + 1
    

    weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    weekday_num = datetime.datetime.fromisoformat(date).weekday()
    weekday_strings = [f"{weekdays[weekday_num]}Start", f"{weekdays[weekday_num]}End"]

    facility_data = FacilitySchema().dump(facility)
    if facility_data["availabilities"]:
        availabilities = facility_data.pop("availabilities")
        new_availability_dict = {
            "open":availabilities.get(weekday_strings[0], 0), 
            "close":availabilities.get(weekday_strings[1], 48)
        }
    else:
        new_availability_dict = {
            "open":0, 
            "close":48
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


