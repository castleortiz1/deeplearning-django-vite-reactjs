# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('popular-stocks/', views.popular_stocks, name='popular-stocks'),
    path('search-stocks/', views.search_stocks, name='search-stocks'),
    path('stocks/', views.stock_list, name='stock-list'),
    path('stocks/<str:ticker>/', views.stock_detail, name='stock-detail'),
    path('stocks/<str:ticker>/historical/', views.stock_historical_data, name='stock-historical'),
]