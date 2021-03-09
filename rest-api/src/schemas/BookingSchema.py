from main import ma
from models.Booking import Booking
from marshmallow import fields, validate, ValidationError, validates_schema
from .UserSchema import UserSchema
from .FacilitySchema import FacilitySchema
import datetime

def convert_time(date, timeslot):
    converted_date = datetime.datetime.combine(date, datetime.datetime.min.time())
    return converted_date + datetime.timedelta(minutes=30*timeslot)


class BookingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Booking
        include_fk = True

    timeslot = fields.Integer(required=True, validate=validate.Range(min=0, max=48))

    fid = fields.Raw()
    

    @validates_schema(skip_on_field_errors=True)
    def time_validator(self, data, **kwargs):
        print(data)
        if convert_time(data["date"], data["timeslot"]) < datetime.datetime.utcnow():
            raise ValidationError("booking time period has passed")

    @validates_schema(skip_on_field_errors=True)
    def within_range(self, data, **kwargs):
        # this next block ensures booking is within bounds
        facility = self.context.get("fid") # a facility object context is required
        weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        weekday_num = data["date"].weekday() # gets datetime from the user sent data
        weekday_strings = [f"{weekdays[weekday_num]}Start", f"{weekdays[weekday_num]}End"]
        if facility.availabilities.__dict__[weekday_strings[0]]:
            if facility.availabilities.__dict__[weekday_strings[0]] > data["timeslot"]:
                raise ValidationError("below range")
        if facility.availabilities.__dict__[weekday_strings[1]]:
            if data["timeslot"] > facility.availabilities.__dict__[weekday_strings[1]]:
                raise ValidationError("above range")

class BookingSchemaWithNested(BookingSchema):
    user = fields.Nested(UserSchema())