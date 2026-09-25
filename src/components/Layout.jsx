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
      
      <footer className="animated-footer">
        <div className="footer-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
        
        <div className="container footer-content">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <h3 className="footer-logo">
                <span className="bounce-letter" style={{animationDelay: '0.1s'}}>T</span>
                <span className="bounce-letter" style={{animationDelay: '0.2s'}}>o</span>
                <span className="bounce-letter" style={{animationDelay: '0.3s'}}>d</span>
                <span className="bounce-letter" style={{animationDelay: '0.4s'}}>d</span>
                <span className="bounce-letter" style={{animationDelay: '0.5s'}}>s</span>
                <span className="bounce-letter highlight" style={{animationDelay: '0.6s'}}>I</span>
                <span className="bounce-letter highlight" style={{animationDelay: '0.7s'}}>Q</span>
              </h3>
              <p className="footer-tagline">Screen-free favorites designed to turn curiosity into hands-on play.</p>
              
              <div className="social-links">
                <a href="#" className="social-icon"><span>Fb</span></a>
                <a href="#" className="social-icon"><span>Ig</span></a>
                <a href="#" className="social-icon"><span>Tw</span></a>
                <a href="#" className="social-icon"><span>Tt</span></a>
              </div>
            </div>
            
            <div className="footer-links-col">
              <h4 className="footer-heading">Shop</h4>
              <ul className="animated-link-list">
                <li><Link to="/collections/best-sellers">Best Sellers</Link></li>
                <li><Link to="/collections/stem-science">STEM & Science</Link></li>
                <li><Link to="/collections/arts-crafts">Arts & Crafts</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-col">
              <h4 className="footer-heading">Support</h4>
              <ul className="animated-link-list">
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-newsletter-col">
              <h4 className="footer-heading">Join the Club</h4>
              <p className="newsletter-desc">Get 10% off your first order and exclusive access to new releases.</p>
              <div className="newsletter-form-group">
                <input type="email" placeholder="Email address" className="newsletter-input" />
                <button className="btn btn-primary newsletter-btn">Join</button>
              </div>
            </div>
          </div>
          
          {/* Floating animated elements inside footer */}
          <div className="footer-floating ff-1"></div>
          <div className="footer-floating ff-2"></div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} ToddsIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}
