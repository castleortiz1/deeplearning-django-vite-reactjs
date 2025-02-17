# backend/stock_prediction/authentication/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, FavoriteStock

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')
    search_fields = ('username', 'email')

@admin.register(FavoriteStock)
class FavoriteStockAdmin(admin.ModelAdmin):
    list_display = ('user', 'ticker')
    search_fields = ('user__username', 'ticker')
