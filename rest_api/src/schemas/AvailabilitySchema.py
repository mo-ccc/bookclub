from main import ma
from models.Availability import Availability
from marshmallow import post_dump


class AvailabilitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Availability

    @post_dump
    def remove_none_fields(self, data, **kwargs):
        return {k: v for k, v in data.items() if v}