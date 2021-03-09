from .tenant_controller import tenants
from .auth_controller import auth
from .user_controller import users
from .facility_controller import facilities
from .user_actions_controller import actions
from .booking_controller import bookings


blueprints = [
    tenants, auth, users, facilities, actions, bookings
]