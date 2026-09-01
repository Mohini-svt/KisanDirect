from django.shortcuts import render
from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from .models import Order, Crop, Logistics
from .serializers import (
    RegisterSerializer,
    LoginSerializer, 
    OrderSerializer,
    UserSerializer,
    CropSerializer,
    LogisticsSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully!",
            "user": {"id": user.id, "email": user.email, "role": user.role}
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']
    selected_role = serializer.validated_data['role']

    user = authenticate(request, username=email, password=password)

    if user is None:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

    if user.role != selected_role:
        return Response({
            "error": f"Account exists, but it is registered as a '{user.role}', not a '{selected_role}'."
        }, status=status.HTTP_403_FORBIDDEN)

    return Response({
        "message": "Login successful",
        "user": {"id": user.id, "email": user.email, "role": user.role}
    }, status=status.HTTP_200_OK)

User = get_user_model()
#ENDPOINT FOR USERMANAGEMENT.JSX
class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class OrderListCreateView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class LogisticsListView(ListCreateAPIView):
    queryset = Logistics.objects.all()
    serializer_class = LogisticsSerializer

class CropListCreateView(ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer

class CropDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer    