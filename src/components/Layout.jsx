import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Truck, Tag, RefreshCcw, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

export default function Layout() {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();

  return (
    <>
      <div className="announcement-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="announcement-item">
            <Truck size={16} /> FREE SHIPPING ON ORDERS OVER $59
          </div>
          <div className="announcement-item">
            <Tag size={16} /> 10% OFF YOUR FIRST ORDER | USE CODE: TOY10
          </div>
          <div className="announcement-item">
            <RefreshCcw size={16} /> EASY RETURNS WITHIN 30 DAYS
          </div>
        </div>
      </div>
      <header>
        <div className="container nav-container">
          <Link to="/" className="logo">
            Todds<span>IQ</span>
          </Link>
          <nav className="nav-links playjoy-nav">
            <Link to="/collections/best-sellers">SHOP BY CATEGORY <ChevronDown size={14} /></Link>
            <Link to="/collections/stem-science">AGE <ChevronDown size={14} /></Link>
            <Link to="/collections/creative-play">BRANDS</Link>
            <Link to="/collections/build-construct">BEST SELLERS</Link>
            <Link to="/collections/new-arrivals">NEW ARRIVALS</Link>
            <Link to="/collections/sale" className="text-sale">SALE</Link>
          </nav>
          <div className="nav-actions playjoy-actions">
            <button className="nav-icon" onClick={() => setIsSearchOpen(true)}>
              <Search size={22} />
            </button>
            <button className="nav-icon">
              <User size={22} />
            </button>
            <button className="nav-icon cart-icon-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={22} />
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Todds<span style={{ color: 'var(--color-primary)' }}>IQ</span></h3>
            <p style={{ color: '#a0a0a0' }}>Screen-free favorites designed to turn curiosity into hands-on play.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Shop</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a0a0a0' }}>
              <li><Link to="/collections/best-sellers">Best Sellers</Link></li>
              <li><Link to="/collections/stem-science">STEM & Science</Link></li>
              <li><Link to="/collections/arts-crafts">Arts & Crafts</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#a0a0a0' }}>
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Join the Club</h4>
            <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>Get 10% off your first order and exclusive access to new releases.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="email" placeholder="Email address" style={{ padding: '10px', borderRadius: '8px', border: 'none', outline: 'none', width: '100%' }} />
              <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Join</button>
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #333', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} ToddsIQ. All rights reserved.
        </div>
      </footer>
      
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
