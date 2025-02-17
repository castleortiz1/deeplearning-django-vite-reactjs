# backend/stock_prediction/authentication/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import FavoriteStock

User = get_user_model()

class UserTestCase(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")
        self.assertEqual(user.username, "testuser")
        self.assertTrue(user.check_password("password123"))

class FavoriteStockTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")

    def test_add_favorite_stock(self):
        favorite = FavoriteStock.objects.create(user=self.user, ticker="AAPL")
        self.assertEqual(favorite.ticker, "AAPL")

    def test_unique_together_constraint(self):
        FavoriteStock.objects.create(user=self.user, ticker="AAPL")
        with self.assertRaises(Exception):
            FavoriteStock.objects.create(user=self.user, ticker="AAPL")