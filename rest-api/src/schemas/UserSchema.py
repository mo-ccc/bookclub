from main import ma, bcrypt
from models.User import User
from marshmallow import fields, validate, pre_load


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        exclude = ("_password",)
    
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    is_admin = fields.Boolean(required=True)

    @pre_load
    def normalize_data(self, data, **kwargs):
        data["email"] = data["email"].lower()
        return data
    