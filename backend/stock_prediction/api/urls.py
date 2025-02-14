# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('stock-data/<str:ticker>/', views.get_stock_data, name='get_stock_data'),
]