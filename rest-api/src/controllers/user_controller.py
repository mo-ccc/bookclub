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
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = UserSchema(exclude=("is_admin",)).load(flask.request.json)
    data["is_admin"] = False
    user = User(**data)
    user.tenant_id = tenant.id
    db.session.add(user)
    db.session.commit()
    return flask.jsonify(UserSchema().dump(user)), 201

# Method to retrieve all users
@users.route('/user', subdomain='<domain_name>', methods=["GET"])
@jwt.jwt_required()
@jwt_services.admin_required()
def get_users(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = User.query.filter_by(tenant_id=tenant.id).all()
    return flask.jsonify(UserSchema(many=True).dump(members))

# Method to update a user
@users.route('/user/<user_id>', subdomain='<domain_name>', methods=["PATCH"])
@jwt.jwt_required()
@jwt_services.admin_required()
def update_user(user_id, domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    user = User.query.filter(User.id==user_id, User.tenant_id==tenant.id).first_or_404()

    if not jwt.current_user.is_owner:
        data = UserSchema(exclude=("is_admin", "email", "password"), partial=True).load(flask.request.json)
    else:
        data = UserSchema(exclude=("email", "password"), partial=True).load(flask.request.json)

    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return flask.jsonify(UserSchema().dump(user))
