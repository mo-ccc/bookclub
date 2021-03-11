import flask
from main import db, bcrypt
import flask_jwt_extended as jwt
import datetime

from models.User import User
from models.Tenant import Tenant

from schemas.UserSchema import UserSchema

auth = flask.Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'], subdomain="<domain_name>")
def register(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    if not tenant.open_registration:
        flask.abort(401)
    data = UserSchema(exclude=["is_admin",]).load(flask.request.json)
    user = User(**data)
    user.tenant_id = tenant.id
    user.is_admin = False
    db.session.add(user)
    db.session.commit()
    return UserSchema().dump(user), 201


@auth.route('/login', methods=['POST'], subdomain="<domain_name>")
def login(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()

    # try except so that failed validation returns 401 reponse rather than 500
    try:
        data = UserSchema(exclude=["is_admin", "name", "expires_in"]).load(flask.request.json)
    except:
        return flask.abort(401)

    user = User.query.filter(
        User.email==data["email"],
        User.tenant_id==tenant.id
    ).first()

    if not user or not bcrypt.check_password_hash(user.password, data["password"]) or datetime.datetime.utcnow() > user.expires_on:
        return flask.abort(401)
    
    token = jwt.create_access_token(
        identity = user.id, 
        expires_delta=datetime.timedelta(days=1), # jwt token is invalidated after one day
        additional_claims={
            "is_admin":user.is_admin,
            "is_owner":user.is_owner
        } 
        # adds is_admin and is_owner claims to jwt token
    )
    # response = flask.Response()
    # jwt.set_access_cookies(response, token) # using cookie is unpreffered
    return flask.jsonify(token)

    