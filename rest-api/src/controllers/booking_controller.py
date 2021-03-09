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
from schemas.BookingSchema import BookingSchemaWithNested, BookingSchema

bookings = flask.Blueprint("bookings", __name__)

@bookings.route("/bookingscontrol", subdomain="<domain_name>", methods=["GET"])
@jwt.jwt_required()
@jwt_services.admin_required()
def get_bookings(domain_name):
    user_id = ["user_id", flask.request.args.get("user")]
    facility_id = ["facility_id", flask.request.args.get("facility")]
    date = ["date", flask.request.args.get("date")]

    if not user_id and not facility_id:
        flask.abort(405, description="a filter on user or facility is required") 

    queries = []
    for x in [user_id, facility_id, date]:
        if x[1]:
            queries.append(getattr(Booking, x[0]) == x[1])
    
    bookings = Booking.query.filter(*queries).all()
    return flask.jsonify(BookingSchemaWithNested(many=True).dump(bookings))
