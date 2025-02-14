# ml_model/predict.py
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf

# Cargar el modelo entrenado
def load_trained_model(filename='ml_model/model.h5'):
    return load_model(filename)

# Obtener datos recientes para predecir
def fetch_recent_data(ticker, lookback=60):
    stock = yf.Ticker(ticker)
    history = stock.history(period=f"{lookback+1}d")
    return history['Close'].values.reshape(-1, 1)

# Preprocesar datos para predicción
def preprocess_for_prediction(data, scaler, lookback=60):
    scaled_data = scaler.transform(data)
    X = []
    for i in range(lookback, len(scaled_data)):
        X.append(scaled_data[i-lookback:i, 0])
    X = np.array(X)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    return X

# Hacer una predicción
def predict_next_day_price(model, scaler, ticker="AAPL"):
    # Obtener datos recientes
    data = fetch_recent_data(ticker)

    # Preprocesar datos
    X = preprocess_for_prediction(data, scaler)

    # Hacer la predicción
    predicted_price = model.predict(X)
    predicted_price = scaler.inverse_transform(predicted_price)
    return predicted_price[-1][0]

if __name__ == "__main__":
    # Cargar el modelo y el scaler
    model = load_trained_model()
    scaler = MinMaxScaler(feature_range=(0, 1))  # Debes usar el mismo scaler que en el entrenamiento

    # Hacer una predicción
    predicted_price = predict_next_day_price(model, scaler, "AAPL")
    print(f"Predicted price for the next day: {predicted_price}")