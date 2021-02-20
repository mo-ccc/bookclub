from django.core.management.base import BaseCommand, CommandError
from customers.models import Client, Domain

class Command(BaseCommand):
    help = 'initializes public schema'

    def handle(self, *args, **kwargs):
        tenant = Client(
            schema_name='public'
        )
        tenant.save()

        domain = Domain()
        domain.domain = "localhost"
        domain.tenant = tenant
        domain.is_primary = True
        domain.save()