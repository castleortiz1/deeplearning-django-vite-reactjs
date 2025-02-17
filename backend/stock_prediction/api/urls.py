# backedn/stock_prediction/api/urls.py
from django.urls import path
from .views import api_root, stock_data, popular_stocks, search_stocks

urlpatterns = [
    path('', api_root, name='api-root'),
    path('stocks/popular/', popular_stocks, name='popular-stocks'),
    path('stocks/search/', search_stocks, name='search-stocks'),
    path('stocks/data/', stock_data, name='stock-data'),  # Corrección de la ruta
]