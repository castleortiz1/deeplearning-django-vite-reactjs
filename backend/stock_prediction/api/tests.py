# backend/stock_prediction/api/tests.py
from django.test import TestCase
from .models import Stock, StockData

class StockModelTest(TestCase):
    def test_create_stock(self):
        stock = Stock.objects.create(ticker="AAPL", name="Apple Inc.")
        self.assertEqual(stock.ticker, "AAPL")
        self.assertEqual(stock.name, "Apple Inc.")

    def test_uppercase_ticker(self):
        stock = Stock.objects.create(ticker="aapl", name="Apple Inc.")
        self.assertEqual(stock.ticker, "AAPL")

class StockDataModelTest(TestCase):
    def setUp(self):
        self.stock = Stock.objects.create(ticker="AAPL", name="Apple Inc.")

    def test_create_stock_data(self):
        stock_data = StockData.objects.create(
            stock=self.stock,
            date="2023-01-01",
            open_price=150.00,
            close_price=155.00
        )
        self.assertEqual(stock_data.stock, self.stock)
        self.assertEqual(stock_data.date.isoformat(), "2023-01-01")
        self.assertEqual(stock_data.open_price, 150.00)
        self.assertEqual(stock_data.close_price, 155.00)
