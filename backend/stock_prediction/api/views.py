# backend/stock_prediction/api/views.py
from django.db.models import Q

import yfinance as yf
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Stock

@api_view(['GET'])
def api_root(request):
    return Response({
        "popular-stocks": "/stocks/popular/",
        "search-stocks": "/stocks/search/",
        "stock-data": "/stocks/data/",
    })

@api_view(['GET'])
def search_stocks(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return Response({"error": "No se proporcionó un término de búsqueda"}, status=status.HTTP_400_BAD_REQUEST)
    
    stocks = Stock.objects.filter(Q(name__icontains=query) | Q(ticker__icontains=query))
    results = [{"ticker": stock.ticker, "name": stock.name} for stock in stocks]
    
    if results:
        return Response(results, status=status.HTTP_200_OK)
    
    return Response({"error": "No se encontraron resultados"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def popular_stocks(request):
    data = [
        {"ticker": "AAPL", "name": "Apple Inc."},
        {"ticker": "GOOGL", "name": "Alphabet Inc. (Class A)"},
        {"ticker": "AMZN", "name": "Amazon.com Inc."},
        {"ticker": "TSLA", "name": "Tesla Inc."},
        {"ticker": "NVDA", "name": "NVIDIA Corporation"},
        {"ticker": "META", "name": "Meta Platforms Inc. (Facebook)"},
        {"ticker": "JNJ", "name": "Johnson & Johnson"},
        {"ticker": "V", "name": "Visa Inc."},
        {"ticker": "WMT", "name": "Walmart Inc."},
        {"ticker": "PG", "name": "Procter & Gamble Company"},
        {"ticker": "MA", "name": "Mastercard Incorporated"},
        {"ticker": "UNH", "name": "UnitedHealth Group Incorporated"},
        {"ticker": "JPM", "name": "JPMorgan Chase & Co."},
        {"ticker": "HD", "name": "Home Depot Inc."},
        {"ticker": "BAC", "name": "Bank of America Corporation"},
        {"ticker": "DIS", "name": "The Walt Disney Company"},
        {"ticker": "PYPL", "name": "PayPal Holdings Inc."},
        {"ticker": "ADBE", "name": "Adobe Inc."},
        {"ticker": "NFLX", "name": "Netflix Inc."},
        {"ticker": "CRM", "name": "Salesforce.com Inc."},
        {"ticker": "PFE", "name": "Pfizer Inc."},
        {"ticker": "XOM", "name": "Exxon Mobil Corporation"},
        {"ticker": "INTC", "name": "Intel Corporation"},
    ]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def stock_data(request):
    ticker = request.GET.get('ticker', '').upper()
    if not ticker:
        return Response({"error": "No se proporcionó un ticker"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        stock = Stock.objects.get(ticker=ticker)  # Verifica si el ticker existe en la base de datos
    except Stock.DoesNotExist:
        return Response({"error": "No se encontró la acción con el ticker proporcionado"}, status=status.HTTP_404_NOT_FOUND)

    try:
        stock_api = yf.Ticker(ticker)
        history = stock_api.history(period="1y")

        if history.empty:
            return Response({"error": "No se encontraron datos en Yahoo Finance"}, status=status.HTTP_404_NOT_FOUND)

        response_data = {
            "ticker": ticker,
            "name": stock.name,
            "prices": history['Close'].tolist(),
            "dates": history.index.strftime('%Y-%m-%d').tolist(),
            "sector": stock_api.info.get("sector", "N/A"),
        }
        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error al obtener datos: {e}")
        return Response({"error": "Error al obtener datos de la acción"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)