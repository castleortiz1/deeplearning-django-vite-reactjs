# backend/stock_prediction/authentication/urls.py
# backend/stock_prediction/authentication/urls.py

from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, FavoriteStockView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('favorites/', FavoriteStockView.as_view(), name='favorites'),
    path('favorites/<str:ticker>/', FavoriteStockView.as_view(), name='favorite-detail'),
]