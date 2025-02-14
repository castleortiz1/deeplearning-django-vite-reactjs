# ml_model/train_model.py
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import yfinance as yf
import os

# Obtener datos de Yahoo Finance
def fetch_stock_data(ticker, period="1y"):
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    return history['Close'].values.reshape(-1, 1)

# Preprocesar datos
def preprocess_data(data, lookback=60):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)

    X, y = [], []
    for i in range(lookback, len(scaled_data)):
        X.append(scaled_data[i-lookback:i, 0])
        y.append(scaled_data[i, 0])
    X, y = np.array(X), np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    return X, y, scaler

# Crear y entrenar el modelo LSTM
def train_lstm_model(X, y):
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dense(units=25))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X, y, batch_size=32, epochs=10)
    return model

# Guardar el modelo entrenado
def save_model(model, filename='model.h5'):
    model.save(filename)

# Entrenar el modelo y guardarlo
if __name__ == "__main__":
    # Obtener datos de una acción (ej: Apple - AAPL)
    data = fetch_stock_data("AAPL")

    # Preprocesar datos
    X, y, scaler = preprocess_data(data)

    # Entrenar el modelo
    model = train_lstm_model(X, y)

    # Guardar el modelo entrenado
    save_model(model, os.path.join('ml_model', 'model.h5'))