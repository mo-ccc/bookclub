from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Client, Domain
from .serializers import ClientSerializer, DomainSerializer
from users.serializers import UserSerializer
from django_tenants.utils import schema_context

class CustomerCreateView(APIView):
    def post(self, request, format=None):
        tenant = Client(
            schema_name=request.data["domain"]
        )
        tenant.save()

        domain = Domain()
        domain.domain = request.data["domain"] + ".localhost"
        domain.tenant = tenant
        domain.is_primary = True
        domain.save()

        with schema_context(request.data["domain"]):
            serializer = UserSerializer(data=request.data["user"])
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(request.data)
        return JsonResponse(serializer.errors, status=404)