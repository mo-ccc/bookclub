import flask
from main import db
import flask_jwt_extended as jwt

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility
from models.Availability import Availability

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

facilities = flask.Blueprint("facilities", __name__)

# Method to create a facility
@facilities.route('/facility', subdomain='<domain_name>', methods=["POST"])
@jwt.jwt_required()
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

# Method to retrieve all facilities
@facilities.route('/facility', methods=["GET"], subdomain="<domain_name>")
def get_facilities(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    facilities = Facility.query.filter_by(tenant_id=tenant.id)
    return flask.jsonify(FacilitySchema(many=True).dump(facilities))

# Detail get method
@facilities.route('/facility/<id>', methods=["GET"], subdomain="<domain_name>")
def detail_get_facility

