from main import ma
from models.Facility import Facility
from marshmallow import fields, validate, pre_load

class FacilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Facility

    name = fields.String(required=True, validate=validate.Length(min=1, max=20))
    