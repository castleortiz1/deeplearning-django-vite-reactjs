# backend/stock_prediction/api/utils.py
import yfinance as yf

def fetch_stock_data(ticker, period="1y"):
    try:
        stock = yf.Ticker(ticker)
        history = stock.history(period=period)
        if history.empty:
            return {"error": f"No se encontraron datos para {ticker}"}
        return history
    except Exception as e:
        return {"error": f"Error al obtener datos para {ticker}: {str(e)}"}