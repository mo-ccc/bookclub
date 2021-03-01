from main import ma, bcrypt
from models.User import User
from marshmallow import fields, validate, pre_load, validates_schema
import datetime


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        exclude = ("_password", "expires_on")
    
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    is_admin = fields.Boolean(required=True)
    name = fields.String(required=True, validate=validate.Regexp("^[a-zA-Z ]*$"))
    expires_in = fields.Integer() # number of days to expire in

    @pre_load
    def normalize_data(self, data, **kwargs):
        data["email"] = data["email"].lower()
        if "expires_in" in data:
            data["expires_on"] = datetime.datetime.now() + datetime.timedelta(days=data["expires_in"])
        return data
    