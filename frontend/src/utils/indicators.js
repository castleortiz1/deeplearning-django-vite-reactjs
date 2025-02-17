// src/utils/indicators.js
export const calculateSMA = (prices, period) => {
  return prices.map((_, index, arr) =>
    index < period - 1 ? null : arr.slice(index - period + 1, index + 1).reduce((a, b) => a + b, 0) / period
  );
};

export const calculateEMA = (prices, period) => {
  const k = 2 / (period + 1);
  let emaArray = [];
  let prevEma = prices[0];

  prices.forEach((price, index) => {
    if (index === 0) {
      emaArray.push(price);
    } else {
      const ema = price * k + prevEma * (1 - k);
      emaArray.push(ema);
      prevEma = ema;
    }
  });

  return emaArray;
};

export const calculateRSI = (prices, period = 14) => {
  let gains = [];
  let losses = [];

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? Math.abs(change) : 0);
  }

  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let rsiArray = [100 - 100 / (1 + avgGain / avgLoss)];

  for (let i = period; i < gains.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
    rsiArray.push(100 - 100 / (1 + avgGain / avgLoss));
  }

  return rsiArray;
};

export const calculateMACD = (prices, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) => {
  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  const macdLine = shortEMA.map((val, i) => (val !== null && longEMA[i] !== null ? val - longEMA[i] : null));
  const signalLine = calculateEMA(macdLine.filter((v) => v !== null), signalPeriod);
  return { macd: macdLine, signal: signalLine };
};