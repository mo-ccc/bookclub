from main import ma
from models.Booking import Booking
from marshmallow import fields, validate, ValidationError, validates_schema
import datetime

def convert_time(date, timeslot):
    return date + datetime.timedelta(minutes=30*timeslot)


class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking

    timeslot = fields.Integer(required=True, validate=validate.Range(min=0, max=48))
    

    @validates_schema(skip_on_field_errors=True)
    def time_validator(self, data, **kwargs):
        print(data)
        if convert_time(data["date"], data["timeslot"]) < datetime.date.today():
            raise ValidationError("booking time period has passed")
