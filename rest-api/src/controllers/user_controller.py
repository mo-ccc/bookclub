import flask
from main import db
import flask_jwt_extended as jwt

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

from services import jwt_services

users = flask.Blueprint("users", __name__)

# Method to create a user
@users.route('/user', subdomain='<domain_name>', methods=["POST"])
@jwt.jwt_required()
@jwt_services.admin_required()
def make_user(domain_name):
    data = UserSchema().load(flask.request.json)
    return UserSchema().dump(data)

# Method to retrieve all users
@users.route('/user', subdomain='<domain_name>', methods=["GET"])
@jwt.jwt_required()
@jwt_services.admin_required()
def get_users(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = User.query.filter_by(tenant_id=tenant.id).all()
    return flask.jsonify(UserSchema(many=True).dump(members))