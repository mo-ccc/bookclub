import flask
from models.Tenant import Tenant
from models.User import User

from schemas.UserSchema import UserSchema

tenants = flask.Blueprint('tenants', __name__)

@tenants.route('/')
def get_main():
    return 'main'

@tenants.route('/', subdomain='<domain_name>')
def get_sub(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = User.query.filter_by(domain_id=tenant.id).all()
    print(members)
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