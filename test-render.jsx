import React from 'react';
import { renderToString } from 'react-dom/server';
import Product from './src/pages/Product.jsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './src/context/CartContext.jsx';
import { CurrencyProvider } from './src/context/CurrencyContext.jsx';

// Since we can't easily mock useCart, we use the actual providers!

export function testRender(productData) {
  try {
    // We have to mock useParams to return a slug
    // We can do this by wrapping in a router
    const html = renderToString(
      <MemoryRouter initialEntries={['/product/toddsiq-robot']}>
        <CurrencyProvider>
          <CartProvider>
            <Routes>
              <Route path="/product/:slug" element={<Product />} />
            </Routes>
          </CartProvider>
        </CurrencyProvider>
      </MemoryRouter>
    );
    console.log("Render succeeded!");
  } catch (error) {
    console.log("Render failed with Error:", error.message);
  }
}
