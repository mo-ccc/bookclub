from .models import Client
from .models import Domain
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['schema_name',]

    def create(self, validated_data):
        return Client.objects.create(**validated_data)

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ['domain',]

    def create(self, validated_data):
        return Domain.objects.create(**validated_data)