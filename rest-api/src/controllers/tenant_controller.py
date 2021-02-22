import flask
from models.Tenant import Tenant
from models.Member import Member

tenants = flask.Blueprint('tenants', __name__)

@tenants.route('/')
def get_main():
    return 'main'

@tenants.route('/', subdomain='<domain_name>')
def get_sub(domain_name):
    tenant = Tenant.query.filter_by(domain_name=domain_name).first_or_404()
    members = Member.query.filter_by(domain_id=tenant.id).all()
    print(members)
    return str(members)
