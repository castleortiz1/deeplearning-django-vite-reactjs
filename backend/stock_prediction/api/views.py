# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def popular_stocks(request):
    try:
        stocks = [
            {"ticker": "AAPL", "name": "Apple Inc."},
            {"ticker": "TSLA", "name": "Tesla Inc."},
            {"ticker": "MSFT", "name": "Microsoft Corporation"},
            {"ticker": "AMZN", "name": "Amazon.com, Inc."}
        ]
        return Response(stocks, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error en popular_stocks: {str(e)}")  # Para debugging
        return Response(
            {"error": "Error interno del servidor"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )