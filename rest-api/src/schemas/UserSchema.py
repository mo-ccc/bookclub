from main import ma, bcrypt
from models.User import User
from marshmallow import fields, validate, pre_load


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
    
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    is_admin = fields.Boolean(required=True)

    @pre_load
    def normalize_data(self, data, **kwargs):
        data["password"] = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
        return data

    