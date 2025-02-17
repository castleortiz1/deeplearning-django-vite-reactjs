# backend/stock_prediction/authentication/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserRegistrationSerializer,
    CustomTokenObtainPairSerializer,
    FavoriteStockSerializer,
)
from .models import FavoriteStock

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'Usuario registrado con éxito.',
                'user': {
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class FavoriteStockView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = FavoriteStock.objects.filter(user=request.user)
        serializer = FavoriteStockSerializer(favorites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FavoriteStockSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ticker):
        try:
            favorite = FavoriteStock.objects.get(user=request.user, ticker=ticker)
            favorite.delete()
            return Response({"message": "Acción eliminada de favoritos."}, status=status.HTTP_204_NO_CONTENT)
        except FavoriteStock.DoesNotExist:
            return Response({"error": "La acción no está en tus favoritos."}, status=status.HTTP_404_NOT_FOUND)