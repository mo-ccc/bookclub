from main import ma
from models.Tenant import Tenant
from marshmallow import fields, validate, pre_load

class TenantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tenant

    domain_name = fields.String(required=True, validate=validate.Length(min=3, max=10))

    @pre_load
    def normalize_data(self, data, **kwargs):
        data["domain_name"] = data["domain_name"].lower()
        return data
        