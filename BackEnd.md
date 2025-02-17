absl-py==2.1.0
asgiref==3.8.1
astunparse==1.6.3
beautifulsoup4==4.13.3
certifi==2025.1.31
charset-normalizer==3.4.1
Django==5.1.6
django-cors-headers==4.7.0
djangorestframework==3.15.2
flatbuffers==25.2.10
frozendict==2.4.6
gast==0.6.0
google-pasta==0.2.0
grpcio==1.70.0
h5py==3.12.1
html5lib==1.1
idna==3.10
joblib==1.4.2
keras==3.8.0
libclang==18.1.1
lxml==5.3.1
Markdown==3.7
markdown-it-py==3.0.0
MarkupSafe==3.0.2
mdurl==0.1.2
ml-dtypes==0.4.1
multitasking==0.0.11
namex==0.0.8
numpy==2.0.2
opt_einsum==3.4.0
optree==0.14.0
packaging==24.2
pandas==2.2.3
peewee==3.17.9
platformdirs==4.3.6
protobuf==5.29.3
psycopg2==2.9.10
Pygments==2.19.1
python-dateutil==2.9.0.post0
pytz==2025.1
requests==2.32.3
rich==13.9.4
scikit-learn==1.6.1
scipy==1.15.1
six==1.17.0
soupsieve==2.6
sqlparse==0.5.3
tensorboard==2.18.0
tensorboard-data-server==0.7.2
tensorflow==2.18.0
tensorflow-io-gcs-filesystem==0.31.0
tensorflow_intel==2.18.0
termcolor==2.5.0
threadpoolctl==3.5.0
typing_extensions==4.12.2
tzdata==2025.1
urllib3==2.3.0
webencodings==0.5.1
Werkzeug==3.1.3
wrapt==1.17.2
yfinance==0.2.52
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_prediction.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
# stock_prediction/wsgi.py
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_prediction.settings')

application = get_wsgi_application()
# stock_prediction/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Cambia esto de 'stock_prediction.api.urls' a 'api.urls'
]
# stock_prediction/settings.py
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)rm10-i^47njnlp-r)^2d-pv=93rxo+s-+yw4ggpq_37x5louq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'stock_prediction',  # Agrega esto si falta
    # 'stock_prediction.api',  # Agrega esto si aún tienes problemas
    # 'stock_prediction.api',  # Asegúrate de que tu app esté aquí
    'corsheaders',
    'rest_framework',  # Para la API
    'api',  # Tu aplicación de API
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'stock_prediction.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'stock_prediction.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'stockdb',  # Nombre de la base de datos
        'USER': 'postgres',  # Usuario de PostgreSQL
        'PASSWORD': 'Caminacaminoconcamila@',  # Contraseña de PostgreSQL
        'HOST': 'localhost',  # Host de la base de datos
        'PORT': '5432',  # Puerto de PostgreSQL
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC-06:00'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True  # Permite todas las solicitudes CORS (solo para desarrollo)
CORS_ALLOW_CREDENTIALS = True

# Configuración de CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Si estás usando Vite
    "http://127.0.0.1:5173",
]

# Configuraciones adicionales de CORS si son necesarias
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
# stock_prediction/asgi.py
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_prediction.settings')

application = get_asgi_application()
# stock_prediction/__init__.py
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
# api/views.py
import yfinance as yf
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def api_root(request):
    return Response({
        "popular-stocks": "/api/popular-stocks/",
        "search-stocks": "/api/search-stocks/?q=Apple",
        "stock-data": "/api/stock-data/?ticker=TSLA",  # Agregamos la nueva ruta
    })

@api_view(['GET'])
def search_stocks(request):
    query = request.GET.get('q', '')
    if query:
        results = [
            {"ticker": "AAPL", "name": "Apple Inc."},
            {"ticker": "TSLA", "name": "Tesla Inc."},
            {"ticker": "MSFT", "name": "Microsoft Corporation"},
        ]
        filtered_results = [stock for stock in results if query.lower() in stock['name'].lower()]
        return Response(filtered_results, status=status.HTTP_200_OK)
    return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def popular_stocks(request):
    data = [
        {"ticker": "AAPL", "name": "Apple Inc."},
        {"ticker": "MSFT", "name": "Microsoft Corporation"},
        {"ticker": "GOOGL", "name": "Alphabet Inc. (Class A)"},
        {"ticker": "AMZN", "name": "Amazon.com Inc."},
        {"ticker": "TSLA", "name": "Tesla Inc."},
        {"ticker": "NVDA", "name": "NVIDIA Corporation"},
        {"ticker": "META", "name": "Meta Platforms Inc. (Facebook)"},
        {"ticker": "BRK.B", "name": "Berkshire Hathaway Inc. (Class B)"},
        {"ticker": "JNJ", "name": "Johnson & Johnson"},
        {"ticker": "V", "name": "Visa Inc."},
        {"ticker": "WMT", "name": "Walmart Inc."},
        {"ticker": "PG", "name": "Procter & Gamble Company"},
        {"ticker": "MA", "name": "Mastercard Incorporated"},
        {"ticker": "UNH", "name": "UnitedHealth Group Incorporated"},
        {"ticker": "JPM", "name": "JPMorgan Chase & Co."},
        {"ticker": "HD", "name": "Home Depot Inc."},
        {"ticker": "BAC", "name": "Bank of America Corporation"},
        {"ticker": "DIS", "name": "The Walt Disney Company"},
        {"ticker": "PYPL", "name": "PayPal Holdings Inc."},
        {"ticker": "ADBE", "name": "Adobe Inc."},
        {"ticker": "NFLX", "name": "Netflix Inc."},
        {"ticker": "CRM", "name": "Salesforce.com Inc."},
        {"ticker": "PFE", "name": "Pfizer Inc."},
        {"ticker": "XOM", "name": "Exxon Mobil Corporation"},
        {"ticker": "INTC", "name": "Intel Corporation"},
    ]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def stock_data(request):
    ticker = request.GET.get('ticker', '').upper()
    if ticker:
        try:
            # Obtén datos históricos de Yahoo Finance
            stock = yf.Ticker(ticker)
            history = stock.history(period="1y")  # Obtiene los datos del último año

            # Verifica si hay datos disponibles
            if history.empty:
                return Response({"error": "No se encontraron datos para el ticker proporcionado"}, status=status.HTTP_404_NOT_FOUND)

            # Procesa los datos para devolverlos en el formato esperado
            prices = history['Close'].tolist()  # Precios de cierre
            dates = history.index.strftime('%Y-%m-%d').tolist()  # Fechas

            response_data = {
                "prices": prices,
                "dates": dates,
                "name": stock.info.get("longName", ticker),  # Nombre de la acción
                "sector": stock.info.get("sector", "N/A"),  # Sector de la acción
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error al obtener datos de Yahoo Finance: {e}")
            return Response({"error": "No se pudieron obtener los datos de la acción"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"error": "No se proporcionó un ticker"}, status=status.HTTP_400_BAD_REQUEST)
# api/utils.py
import yfinance as yf

def fetch_stock_data(ticker, period="1y"):
    """
    Obtiene datos históricos de una acción desde Yahoo Finance.
    """
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    return history
# api/urls.py
from django.urls import path
from . import views  # Esto asegura que se importen las vistas correctamente

urlpatterns = [
    path('', views.api_root, name='api-root'),  # Ruta base para la API
    path('stock-data/', views.stock_data, name='stock-data'),
    path('popular-stocks/', views.popular_stocks, name='popular-stocks'),
    path('search-stocks/', views.search_stocks, name='search-stocks'),  # Asegúrate de que esta línea esté correcta
]
# api/serializers.py
from rest_framework import serializers
from .models import Stock  # Corregir la importación

class StockSerializer(serializers.ModelSerializer):  # Cambia el nombre para coincidir con el modelo
    class Meta:
        model = Stock
        fields = '__all__'  # Incluye todos los campos del modelo
# api/models.py
from django.db import models

class Stock(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.ticker} - {self.name}"

class StockData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    date = models.DateField()
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.stock.ticker} - {self.date}"
# api/apps.py
from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
# api/__init__.py