import flask
from main import db

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

facilities = flask.Blueprint("facilities", __name__)

# Method to create a facility
@facilities.route('/facility', subdomain='<domain_name>', methods=["POST"])
def make_facility(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = FacilitySchema().load(flask.request.json)
    facility = Facility(**data)
    facility.tenant_id = tenant.id

    db.session.add(facility)
    db.session.commit()

    return FacilitySchema().dump(facility)

