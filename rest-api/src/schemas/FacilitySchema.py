from main import ma
from models.Facility import Facility
from marshmallow import fields, validate, pre_load
from .AvailabilitySchema import AvailabilitySchema

class FacilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Facility
        ordered=True

    name = fields.String(required=True, validate=validate.Length(min=1, max=20))
    availabilities = fields.Nested(AvailabilitySchema)