# api/serializers.py
from rest_framework import serializers
from .models import Stock  # Corregir la importación

class StockSerializer(serializers.ModelSerializer):  # Cambia el nombre para coincidir con el modelo
    class Meta:
        model = Stock
        fields = '__all__'  # Incluye todos los campos del modelo
