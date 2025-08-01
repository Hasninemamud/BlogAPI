from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image']
        
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']