import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Diagnostics from './components/Diagnostics';
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

function ProductErrorBoundaryFallback({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-canvas text-ink p-4">
      <h2 className="text-2xl font-display font-bold mb-4">Something went wrong</h2>
      <p className="text-ink-muted mb-8 max-w-md text-center">
        We encountered an error while loading this product. Our team has been notified.
      </p>
      <div className="bg-white p-4 rounded-xl border border-ink/10 text-xs text-red-500 max-w-lg overflow-auto mb-8">
        {error.message}
      </div>
      <Link to="/" className="px-6 py-3 rounded-xl bg-coral text-white font-bold hover:opacity-90 transition-opacity">
        Back to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
      <BrowserRouter>
        <Diagnostics />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/collections/:id" element={<Layout><Collection /></Layout>} />
          <Route path="/collections" element={<Layout><Collection /></Layout>} />
          <Route path="/products/:id" element={<Layout><ErrorBoundary FallbackComponent={ProductErrorBoundaryFallback}><Product /></ErrorBoundary></Layout>} />
          <Route path="/product/:slug" element={<Layout><ErrorBoundary FallbackComponent={ProductErrorBoundaryFallback}><Product /></ErrorBoundary></Layout>} />
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
