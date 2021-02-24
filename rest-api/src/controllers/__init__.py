from .tenant_controller import tenants
from .auth_controller import auth
from .user_controller import users
from .facility_controller import facilities


blueprints = [
    tenants, auth, users, facilities
]