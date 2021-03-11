from main import ma, bcrypt
from models.User import User
from marshmallow import fields, validate, pre_load, validates_schema
import datetime


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password", "expires_in")
        exclude = ("_password",)
        dump_only = ("expires_on", "created_at")
    
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    is_admin = fields.Boolean(required=True)
    name = fields.String(required=True, validate=validate.Regexp("^[a-zA-Z ]*$"))
    expires_in = fields.DateTime(attribute="expires_on") # number of days to expire in

    @pre_load
    def normalize_data(self, data, **kwargs):
        if "email" in data:
            data["email"] = data["email"].lower()
        if "expires_in" in data:
            data["expires_in"] = (datetime.datetime.now() + datetime.timedelta(days=data["expires_in"])).isoformat()
        return data
    