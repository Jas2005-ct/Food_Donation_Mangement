from rest_framework import serializers
from .models import User, Donor, NGO, Donation
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password', 'user_type']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type', 'donor')
        )
        return user

class DonorRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ['contact_person', 'phone_number']



class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = [
            'id', 'title', 'description', 'quantity',
            'meal_type', 'pickup_location', 'contact_number',
            'status', 'donor'
        ]
        read_only_fields = ['id', 'donor', 'status']
class NGORegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ['organization_name', 'registration_number']