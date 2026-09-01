from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, Crop, Order, Logistics

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['email', 'password', 'role']

    def create(self, validated_data):
        email = validated_data['email']
        role = validated_data.get('role', 'buyer')
        
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data['password'],
            role=role
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =['id','email','role','is_active']

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields ='__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields ='__all__'

class LogisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logistics
        fields ='__all__'

        