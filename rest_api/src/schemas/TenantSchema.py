from main import ma
from models.Tenant import Tenant
from marshmallow import fields, validate, pre_load

class TenantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tenant

    domain_name = fields.String(required=True, validate=validate.Length(min=3, max=10))
    statement = fields.String(validate=validate.Length(max=1000))
    description = fields.String(validate=validate.Length(max=1000))
    location = fields.String(validate=validate.Length(max=500))
    phone = fields.String(validate=validate.Length(max=15))

    @pre_load
    def normalize_data(self, data, **kwargs):
        if "domain_name" in data:
            data["domain_name"] = data["domain_name"].lower()
        return data
        