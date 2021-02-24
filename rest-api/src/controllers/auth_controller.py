import flask
from flask_jwt_extended import create_access_token
from models.User import User
from models.Tenant import Tenant
from schemas.UserSchema import UserSchema
from main import db, jwt, bcrypt

auth = flask.Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'], subdomain="<domain_name>")
def register(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = UserSchema(exclude=["is_admin",]).load(flask.request.json)
    user = User(**data)
    user.tenant_id = tenant.id
    user.is_admin = False
    db.session.add(user)
    db.session.commit()
    return UserSchema().dump(user)


@auth.route('/login', methods=['POST'], subdomain="<domain_name>")
def login(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = UserSchema(exclude=["is_admin",]).load(flask.request.json)
    print(data)
    user = User.query.filter(
        User.email==data["email"],
        User.tenant_id==tenant.id
    ).first_or_404()
    
    if bcrypt.check_password_hash(user.password, data["password"]):
        return 'success'
    return 'fail'