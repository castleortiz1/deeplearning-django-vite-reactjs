# backend/stock_prediction/api/serializers.py
from rest_framework import serializers
from .models import Stock, StockData

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

    def validate_ticker(self, value):
        if not value.isalnum():
            raise serializers.ValidationError("El ticker debe contener solo caracteres alfanuméricos.")
        return value.upper()

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = '__all__'

    def validate_open_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio de apertura debe ser mayor que cero.")
        return value

    def validate_close_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio de cierre debe ser mayor que cero.")
        return value
