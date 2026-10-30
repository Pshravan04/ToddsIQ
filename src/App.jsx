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
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';
import { CartProvider, useCart } from './context/CartContext';
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

function CartRouteHandler() {
  const { setIsCartOpen } = useCart();
  useEffect(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);
  return <Home />;
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
          <Route path="/cart" element={<Layout><CartRouteHandler /></Layout>} />
          <Route path="/collections/:id" element={<Layout><Collection /></Layout>} />
          <Route path="/collections" element={<Layout><Collection /></Layout>} />
          <Route path="/products/:id" element={<Layout><ErrorBoundary FallbackComponent={ProductErrorBoundaryFallback}><Product /></ErrorBoundary></Layout>} />
          <Route path="/product/:slug" element={<Layout><ErrorBoundary FallbackComponent={ProductErrorBoundaryFallback}><Product /></ErrorBoundary></Layout>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Important Policy & Support Pages */}
          <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />

          <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/policies/terms-of-service" element={<Layout><TermsOfService /></Layout>} />

          <Route path="/shipping" element={<Layout><ShippingPolicy /></Layout>} />
          <Route path="/shipping-policy" element={<Layout><ShippingPolicy /></Layout>} />
          <Route path="/policies/shipping-policy" element={<Layout><ShippingPolicy /></Layout>} />

          <Route path="/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
          <Route path="/returns" element={<Layout><RefundPolicy /></Layout>} />
          <Route path="/policies/refund-policy" element={<Layout><RefundPolicy /></Layout>} />

          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/help" element={<Layout><FAQ /></Layout>} />

          <Route path="/track" element={<Layout><TrackOrder /></Layout>} />
          <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
