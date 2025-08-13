from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterAPI, LoginAPI, DonorDonationListCreate, NGODonationList, ReceiverDonationListView,DonationClaimUpdateView

urlpatterns = [
    # API Endpoints
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    
    # JWT token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Donor API
    path('donor/donations/', DonorDonationListCreate.as_view(), name='donor-donations'),
    
    # NGO API
    path('ngo/donations/', NGODonationList.as_view(), name='ngo-donations'),
    
    # Receiver API
    path('receiver/donations/<int:pk>/claim/', DonationClaimUpdateView.as_view(), name='donation-claim'),
    path('receiver/donations/', ReceiverDonationListView.as_view(), name='receiver-donations'),
]