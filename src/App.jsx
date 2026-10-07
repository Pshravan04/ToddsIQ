import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/collections/:id" element={<Layout><Collection /></Layout>} />
          <Route path="/collections" element={<Layout><Collection /></Layout>} />
          <Route path="/products/:id" element={<Layout><Product /></Layout>} />
          <Route path="/product/:slug" element={<Layout><Product /></Layout>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
