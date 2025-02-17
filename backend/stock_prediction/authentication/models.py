# backend/stock_prediction/authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  # Mejor forma de referenciar el modelo de usuario

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.username

class FavoriteStock(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ticker = models.CharField(max_length=10)

    class Meta:
        unique_together = ('user', 'ticker')  # Evita duplicados

class StockData(models.Model):
    stock = models.CharField(max_length=50, default="AAPL")  # Define un valor por defecto
    date = models.DateField()
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.stock} - {self.date}"