import flask
from main import db
import datetime

from models.Tenant import Tenant
from models.User import User
from models.Facility import Facility

from schemas.UserSchema import UserSchema
from schemas.TenantSchema import TenantSchema
from schemas.FacilitySchema import FacilitySchema

import flask_jwt_extended as jwt
from services import jwt_services

import dotenv
import os
from io import BytesIO
import boto3
from PIL import Image as PIL_Image

dotenv.load_dotenv()

tenants = flask.Blueprint('tenants', __name__)

@tenants.route('/', methods=["GET"])
def get_main():
    return 'main'

@tenants.route('/', methods=["POST"])
def create_domain():
    """
        user: {
            name: "",
            email: "",
            password: ""
        }
        tenant: {
            domain_name: ""
        }
    """

    domain_data = TenantSchema().load(flask.request.json["tenant"])
    user_data = UserSchema(exclude=["is_admin",]).load(flask.request.json["user"])

    tenant = Tenant(**domain_data)
    db.session.add(tenant)
    db.session.flush()

    user = User(**user_data)
    user.tenant_id = tenant.id
    user.is_admin = True
    user.is_owner = True
    user.expires_on = datetime.datetime.utcnow() + datetime.timedelta(weeks=4000) # expiry is set to a lifetime

    db.session.add(user)
    db.session.commit()
    
    return flask.jsonify(UserSchema().dump(user)), 201


@tenants.route("/", subdomain="<domain_name>", methods=["GET"])
def get_subdomain(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    return TenantSchema().dump(tenant)

@tenants.route("/", subdomain="<domain_name>", methods=["PATCH"])
@jwt.jwt_required()
@jwt_services.owner_required()
def update_subdomain(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    data = TenantSchema(partial=True).load(flask.request.json)
    for key, value in data.items():
        setattr(tenant, key, value)
    db.session.commit()
    return flask.jsonify(TenantSchema().dump(tenant)), 200

@tenants.route("/", subdomain="<domain_name>", methods=["DELETE"])
@jwt.jwt_required()
@jwt_services.owner_required()
def delete_subdomain(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    db.session.delete(tenant)
    db.session.commit()
    return flask.jsonify("deleted")

@tenants.route("/image", subdomain="<domain_name>", methods=["POST"])
@jwt.jwt_required()
@jwt_services.owner_required()
def update_image(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    if 'image' not in flask.request.files:
        flask.abort(400, description="No image") 

    # checks request to see if image is in files
    image = flask.request.files["image"]
    # rips extension from filename
    file_extension = os.path.splitext(image.filename)[1]
    # check extension is a jpg, png or jpeg
    if file_extension not in [".jpg", ".png", ".jpeg"]: 
        flask.abort(400, description="Not an image")

    # sanitise domain name to ensure that filename is not going to cause issues
    from werkzeug.utils import secure_filename
    secure = secure_filename(f"{tenant.domain_name}.png")
    
    if os.getenv("AWS_ACCESS_KEY_ID"):
        bucket = boto3.resource(
            's3', region_name=os.getenv("BUCKET_REGION"),
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
        )
    else:
        bucket = boto3.resource('s3', region_name=os.getenv("BUCKET_REGION"))

    s3_object = bucket.Object(os.getenv("BUCKET_NAME"), f"tenant/{secure}")

    # All formats converted to png
    pillow_image = PIL_Image.open(image) # open image in pillow
    with BytesIO() as f: # bytesIO is used to save the image bytes in f variable
        pillow_image.save(f, format='PNG') # saved as png
        s3_object.put(Body=f.getvalue()) # putting the bytes on s3

    return flask.jsonify("uploaded image")

    