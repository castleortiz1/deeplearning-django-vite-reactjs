# backend/stock_prediction/api/models.py
from django.db import models

class Stock(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.ticker = self.ticker.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.ticker} - {self.name}"


class StockData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)  # Elimina el default
    date = models.DateField()
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('stock', 'date')


