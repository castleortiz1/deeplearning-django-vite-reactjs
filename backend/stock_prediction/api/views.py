# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def api_root(request):
    return Response({
        "popular-stocks": "/api/popular-stocks/",
        "search-stocks": "/api/search-stocks/?q=Apple",
        "stock-data": "/api/stock-data/?ticker=TSLA",  # Agregamos la nueva ruta
    })

@api_view(['GET'])
def search_stocks(request):
    query = request.GET.get('q', '')
    if query:
        results = [
            {"ticker": "AAPL", "name": "Apple Inc."},
            {"ticker": "TSLA", "name": "Tesla Inc."},
            {"ticker": "MSFT", "name": "Microsoft Corporation"},
        ]
        filtered_results = [stock for stock in results if query.lower() in stock['name'].lower()]
        return Response(filtered_results, status=status.HTTP_200_OK)
    return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def popular_stocks(request):
    data = [
        {"ticker": "AAPL", "name": "Apple Inc."},
        {"ticker": "TSLA", "name": "Tesla Inc."},
        {"ticker": "GOOGL", "name": "Alphabet Inc."}
    ]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def stock_data(request):
    ticker = request.GET.get('ticker', '').upper()  # Convertimos el ticker a mayúsculas
    if ticker:
        # Datos de ejemplo para diferentes tickers
        stock_data_map = {
            "TSLA": {
                "prices": [250, 255, 260, 265, 270],  # Precios históricos de ejemplo
                "name": "Tesla Inc.",
                "sector": "Automotive",
            },
            "AAPL": {
                "prices": [150, 152, 155, 153, 157],
                "name": "Apple Inc.",
                "sector": "Technology",
            },
            "GOOGL": {
                "prices": [2800, 2810, 2825, 2830, 2840],
                "name": "Alphabet Inc.",
                "sector": "Technology",
            },
        }
        if ticker in stock_data_map:
            return Response(stock_data_map[ticker], status=status.HTTP_200_OK)
        else:
            return Response({"error": "Ticker no encontrado"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"error": "No se proporcionó un ticker"}, status=status.HTTP_400_BAD_REQUEST)