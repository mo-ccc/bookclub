from .tenant_controller import tenants
from .auth_controller import auth


blueprints = [
    tenants, auth
]