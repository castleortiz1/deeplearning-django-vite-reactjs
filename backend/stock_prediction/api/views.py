# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
from .models import StockData
from .serializers import StockDataSerializer

@api_view(['GET'])
def get_stock_data(request, ticker):
    """
    Obtiene datos históricos de una acción desde Yahoo Finance y los guarda en la base de datos.
    """
    try:
        # Obtener datos de Yahoo Finance
        stock = yf.Ticker(ticker)
        history = stock.history(period="1y")

        # Guardar datos en la base de datos
        for index, row in history.iterrows():
            StockData.objects.update_or_create(
                ticker=ticker,
                date=index.date(),
                defaults={
                    'open_price': row['Open'],
                    'close_price': row['Close'],
                    'high_price': row['High'],
                    'low_price': row['Low'],
                    'volume': row['Volume'],
                }
            )

        # Recuperar datos de la base de datos
        stock_data = StockData.objects.filter(ticker=ticker)
        serializer = StockDataSerializer(stock_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)