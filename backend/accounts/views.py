from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, ProfileSerializer
from .models import Profile
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data

        # Update user fields
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.save()

        # Update or create profile image
        profile, created = Profile.objects.get_or_create(user=user)
        if 'image' in request.FILES:
            profile.image = request.FILES['image']
            profile.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)