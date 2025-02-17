# backend/stock_prediction/api/admin.py
from django.contrib import admin
from .models import Stock, StockData

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'name')
    search_fields = ('ticker', 'name')

@admin.register(StockData)
class StockDataAdmin(admin.ModelAdmin):
    list_display = ('stock', 'date', 'open_price', 'close_price')
    search_fields = ('stock__ticker',)
    list_filter = ('stock', 'date')
