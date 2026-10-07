import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1, flag: 'us' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.5, flag: 'au' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.8, flag: 'gb' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.35, flag: 'ca' }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');

  // Load saved currency on mount
  useEffect(() => {
    const saved = localStorage.getItem('toddsiq_currency');
    if (saved && CURRENCIES[saved]) {
      setCurrency(saved);
    }
  }, []);

  const changeCurrency = (code) => {
    if (CURRENCIES[code]) {
      setCurrency(code);
      localStorage.setItem('toddsiq_currency', code);
    }
  };

  const formatPrice = (priceInUSD) => {
    const { symbol, rate } = CURRENCIES[currency];
    const converted = priceInUSD * rate;
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      currencyDetails: CURRENCIES[currency],
      changeCurrency, 
      formatPrice,
      availableCurrencies: Object.values(CURRENCIES)
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
