# api/urls.py
from django.urls import path
from . import views  # Esto asegura que se importen las vistas correctamente

urlpatterns = [
    path('', views.api_root, name='api-root'),  # Ruta base para la API
    path('api/stock-data/', views.stock_data, name='stock-data'),
    path('popular-stocks/', views.popular_stocks, name='popular-stocks'),
    path('search-stocks/', views.search_stocks, name='search-stocks'),  # Asegúrate de que esta línea esté correcta
]

