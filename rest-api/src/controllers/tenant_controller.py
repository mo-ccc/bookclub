import flask
from main import db

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema

tenants = flask.Blueprint('tenants', __name__)

@tenants.route('/', methods=["GET"])
def get_main():
    return 'main'

@tenants.route('/', methods=["POST"])
def create_domain():
    domain_data = TenantSchema().load(flask.request.json["tenant"])
    user_data = UserSchema(exclude=["is_admin",]).load(flask.request.json["user"])

    tenant = Tenant(**domain_data)
    db.session.add(tenant)
    db.session.flush()

    user = User(**user_data)
    user.tenant_id = tenant.id
    user.is_admin = True
    user.is_owner = True

    db.session.add(user)
    db.session.commit()
    
    return UserSchema().dump(user)

@tenants.route('/', subdomain='<domain_name>', methods=["GET"])
def get_sub(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = User.query.filter_by(domain_id=tenant.id).all()
    return str(members)

# Method to create a user
@tenants.route('/users', subdomain='<domain_name>', methods=["POST"])
def make_user(domain_name):
    data = UserSchema().load(flask.request.json)
    return UserSchema().dump(data)

# Method to create a facility
@tenants.route('/facilties', subdomain='<domain_name>', methods=["POST"])
def make_facility(domain_name):
    pass