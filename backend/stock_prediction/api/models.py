# api/models.py
from django.db import models

class StockData(models.Model):
    ticker = models.CharField(max_length=10)  # Símbolo de la acción (ej: AAPL)
    date = models.DateField()  # Fecha del registro
    open_price = models.FloatField()  # Precio de apertura
    close_price = models.FloatField()  # Precio de cierre
    high_price = models.FloatField()  # Precio más alto del día
    low_price = models.FloatField()  # Precio más bajo del día
    volume = models.IntegerField()  # Volumen de transacciones

    def __str__(self):
        return f"{self.ticker} - {self.date}"