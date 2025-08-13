from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import User, Donation
from .serializers import UserSerializer, DonorRegisterSerializer, NGORegisterSerializer, DonationSerializer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        data = request.data.copy()
        user_data = {
            'email': data.get('email'),
            'password': data.get('password'),
            'user_type': data.get('user_type')
        }

        user_serializer = self.get_serializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            profile_data = data.get(user.user_type, {})

            if user.user_type == 'donor':
                donor_serializer = DonorRegisterSerializer(data=profile_data)
                if donor_serializer.is_valid():
                    donor_serializer.save(user=user)
                else:
                    transaction.set_rollback(True)
                    return Response(donor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif user.user_type == 'ngo':
                ngo_serializer = NGORegisterSerializer(data=profile_data)
                if ngo_serializer.is_valid():
                    ngo_serializer.save(user=user)
                else:
                    transaction.set_rollback(True)
                    return Response(ngo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "user": UserSerializer(user).data,
                "message": "User registered successfully"
            }, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user_type": user.user_type,
                "email": user.email,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class DonorDonationListCreate(generics.ListCreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Donation.objects.filter(donor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(donor=self.request.user)

class NGODonationList(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

class DonationClaimUpdateView(generics.UpdateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # Check if the donation is available
        if instance.status != 'Available':
            return Response({'error': 'Donation is not available for claiming.'}, status=status.HTTP_400_BAD_REQUEST)
        
        instance.status = 'Claimed'
        instance.save()
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
class ReceiverDonationListView(generics.ListAPIView):
    queryset = Donation.objects.filter(status='Available')
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]