import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

const NAV = [
  {
    label: 'Shop by Age',
    mega: true,
    ages: [
      { label: 'Tiny Tots', sub: '0–18 months', emoji: '🍼', color: '#FF9F7F', bg: '#FFF4F2', href: '/collections/tiny-tots' },
      { label: 'Toddlers', sub: '18 mo–3 yrs',  emoji: '🧸', color: '#6C8EF5', bg: '#EEF1FD', href: '/collections/toddlers' },
      { label: 'Pre-K',    sub: '3–5 years',    emoji: '🎨', color: '#1F9D8A', bg: '#E8F8F5', href: '/collections/pre-k' },
      { label: 'Big Kids', sub: '6–12 years',   emoji: '🔭', color: '#FFB627', bg: '#FFF8E7', href: '/collections/big-kids' },
    ],
    interests: [
      { label: 'STEM & Science', emoji: '🔬', color: '#6C8EF5' },
      { label: 'Arts & Crafts',  emoji: '🎨', color: '#F06292' },
      { label: 'Building',       emoji: '🧱', color: '#FFB627' },
      { label: 'Reading',        emoji: '📚', color: '#1F9D8A' },
      { label: 'Math & Logic',   emoji: '🧮', color: '#FF6154' },
      { label: 'Sensory Play',   emoji: '🌈', color: '#66BB6A' },
    ],
  },
  { label: 'New Arrivals', href: '/collections/new' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Gift Sets',    href: '/collections/gifts' },
  { label: '🔥 Sale',      href: '/collections/sale', sale: true },
];

const CHIPS = [
  '🚀 Free shipping on orders over $50',
  '🎁 Gift wrapping available',
  '⭐ 10,000+ happy families',
  '🔒 30-day hassle-free returns',
  '🌱 Eco-friendly packaging',
  '✨ Expert-curated toys',
];

export default function Layout({ children }) {
  const { cartCount, cartTotal } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setCartOpen(false); setSearchOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const doubled = [...CHIPS, ...CHIPS];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-track">
          {doubled.map((chip, i) => (
            <span key={i} className="announcement-chip">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="currentColor" opacity=".2"/>
                <circle cx="7" cy="7" r="2.5" fill="currentColor"/>
              </svg>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-xs)' }}>
        <div className="container">
          <nav className="nav-container">
            <Link to="/" className="logo">Todds<span>IQ</span>™</Link>

            <ul className="nav-links">
              {NAV.map((item) => (
                <li key={item.label} className="nav-item">
                  {item.mega ? (
                    <>
                      <button className={`nav-link${item.sale ? ' nav-link-sale' : ''}`}>
                        {item.label}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M6 8L1 3h10z"/>
                        </svg>
                      </button>
                      <div className="mega-menu">
                        <div>
                          <p className="mega-col-title">Shop by Age</p>
                          <div className="mega-age-tiles">
                            {item.ages.map(a => (
                              <Link key={a.label} to={a.href} className="mega-age-tile">
                                <div className="mega-age-dot" style={{ background: a.bg }}>
                                  <span>{a.emoji}</span>
                                </div>
                                <div className="mega-age-text">
                                  <strong>{a.label}</strong>
                                  <span>{a.sub}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mega-col-title">Shop by Interest</p>
                          <div className="mega-interest-list">
                            {item.interests.map(int => (
                              <a key={int.label} href="#" className="mega-interest-link">
                                <span className="mega-interest-icon" style={{ background: int.color + '20' }}>
                                  {int.emoji}
                                </span>
                                {int.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={item.href || '#'} className={`nav-link${item.sale ? ' nav-link-sale' : ''}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="nav-actions">
              <button className="nav-icon" onClick={() => setSearchOpen(true)} aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button className="nav-icon" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
              <button className="nav-icon" onClick={() => setCartOpen(true)} aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}