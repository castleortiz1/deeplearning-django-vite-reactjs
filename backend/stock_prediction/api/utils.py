# api/utils.py
import yfinance as yf

def fetch_stock_data(ticker, period="1y"):
    """
    Obtiene datos históricos de una acción desde Yahoo Finance.
    """
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    return history