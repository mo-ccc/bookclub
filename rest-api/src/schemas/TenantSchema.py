from main import ma
from models.Tenant import Tenant

class TenantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tenant
        