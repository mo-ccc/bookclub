import flask
from main import db
import flask_jwt_extended as jwt

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

users = flask.Blueprint("users", __name__)

# Method to create a user
@users.route('/user', subdomain='<domain_name>', methods=["POST"])
@jwt.jwt_required()
def make_user(domain_name):
    if not current_user.is_admin or not current_user.is_owner:
        flask.abort(401)
    data = UserSchema().load(flask.request.json)
    return UserSchema().dump(data)

# Method to retrieve all users
@users.route('/user', subdomain='<domain_name>', methods=["GET"])
@jwt.jwt_required()
def get_users(domain_name):
    if not current_user.is_admin or not current_user.is_owner:
        flask.abort(401)
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = User.query.filter_by(tenant_id=tenant.id).all()
    return flask.jsonify(UserSchema(many=True).dump(members))