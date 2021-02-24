import flask
from main import db

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

users = flask.Blueprint("users", __name__)

# Method to create a user
@users.route('/user', subdomain='<domain_name>', methods=["POST"])
def make_user(domain_name):
    data = UserSchema().load(flask.request.json)
    return UserSchema().dump(data)