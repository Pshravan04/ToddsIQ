import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/collections/:id" element={<Layout><Collection /></Layout>} />
          <Route path="/collections" element={<Layout><Collection /></Layout>} />
          <Route path="/products/:id" element={<Layout><Product /></Layout>} />
          <Route path="/product/:slug" element={<Layout><Product /></Layout>} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
