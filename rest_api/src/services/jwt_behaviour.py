from main import jwt
from models.User import User
import flask
import dotenv
import os

dotenv.load_dotenv()

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@jwt.encode_key_loader
def custom_encode(arg1):
    return os.getenv("JWT_SECRET_KEY") + flask.request.view_args["domain_name"]

@jwt.decode_key_loader
def custom_decode(arg1, arg2):
    return os.getenv("JWT_SECRET_KEY") + flask.request.view_args["domain_name"]