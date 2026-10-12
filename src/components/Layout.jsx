import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import Logo from './Logo';

const NAV = [
  {
    label: 'Shop by Age',
    mega: true,
    ages: [
      { label: 'Ages 1–3', sub: 'Sensory exploration & motor skills', emoji: '🧸', color: '#6C8EF5', bg: '#EEF1FD', href: '/collections/toddler' },
      { label: 'Ages 3–5', sub: 'Drawing robots & phonics',          emoji: '🎨', color: '#1F9D8A', bg: '#E8F8F5', href: '/collections/preschool' },
      { label: 'Ages 5+',  sub: 'Advanced STEM & kinetic physics',    emoji: '🔭', color: '#FFB627', bg: '#FFF8E7', href: '/collections/big-kids' },
    ],
    categories: [
      { label: 'All',             sub: 'Browse full collection',  emoji: '✨', color: '#FF6154', bg: '#FFF0EE', href: '/collections/all' },
      { label: 'STEM & Learning', sub: 'Logic, science & math',   emoji: '🔬', color: '#6C8EF5', bg: '#EEF1FD', href: '/collections/all?filter=STEM%20%26%20Learning' },
      { label: 'Arts & Crafts',   sub: 'Drawing, paint & create', emoji: '🎨', color: '#F06292', bg: '#FCE4EC', href: '/collections/all?filter=Arts%20%26%20Crafts' },
      { label: 'Building',        sub: 'Tracks, blocks & logic',  emoji: '🧱', color: '#FFB627', bg: '#FFF8E7', href: '/collections/all?filter=Building' },
      { label: 'Reading',         sub: 'Phonics, cards & books',  emoji: '📚', color: '#1F9D8A', bg: '#E8F8F5', href: '/collections/all?filter=Reading' },
      { label: 'Sensory',         sub: 'Tactile, sounds & lights',emoji: '🌈', color: '#9C27B0', bg: '#F3E5F5', href: '/collections/all?filter=Sensory' },
    ],
  },
  { label: 'About Us',     href: '/about' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Contact Us',   href: '/contact' },
  { label: '🔥 Sale',      href: '/collections/sale', sale: true },
];



export default function Layout({ children }) {
  const { cartCount, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { currency, currencyDetails, changeCurrency, availableCurrencies, formatPrice } = useCurrency();
  const CHIPS = [
    '⚡ 40% OFF + Free Shipping — Ending Soon!',
    '🛡️ 30-Day Risk-Free Guarantee',
    '⭐ 4.9/5 Rating (28,000+ Happy Families)',
  ];
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setIsCartOpen(false); setSearchOpen(false); setMobileMenuOpen(false); setCurrencyDropdownOpen(false); } };
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
            <Link to="/" className="logo flex items-center">
              <Logo className="h-7 md:h-8 w-auto" />
            </Link>

            <ul className="nav-links">
              {NAV.map((item) => (<NavItem key={item.label} item={item} />))}
            </ul>

            <div className="nav-actions">
              <Link to="/track" className="hidden lg:block font-label-sm text-xs font-bold uppercase tracking-widest text-ink hover:text-coral transition-colors mr-2">Track Your Order</Link>
              
              {/* Currency Dropdown */}
              <div className="relative hidden md:block mr-2 z-50">
                <div 
                  className="flex items-center gap-1.5 cursor-pointer hover:bg-black/5 px-2 py-1.5 rounded-lg transition-colors"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                >
                  <img src={`https://flagcdn.com/w20/${currencyDetails.flag}.png`} alt={currencyDetails.code} className="w-[18px] h-auto rounded-[2px] shadow-sm" />
                  <span className="text-xs font-bold text-ink">{currencyDetails.code}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>

                <AnimatePresence>
                  {currencyDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setCurrencyDropdownOpen(false)}></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-1 w-32 bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-ink/10 py-2 z-50"
                      >
                        {availableCurrencies.map(c => (
                          <div 
                            key={c.code}
                            className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer hover:bg-[#F4F1EA] transition-colors ${c.code === currency ? 'bg-[#F4F1EA] font-bold' : 'font-medium'}`}
                            onClick={() => {
                              changeCurrency(c.code);
                              setCurrencyDropdownOpen(false);
                            }}
                          >
                            <img src={`https://flagcdn.com/w20/${c.flag}.png`} alt={c.code} className="w-[18px] h-auto rounded-[2px] shadow-sm" />
                            <span className="text-ink">{c.code}</span>
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <button className="nav-icon md:hidden mr-1" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
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
              <button className="nav-icon" onClick={() => setIsCartOpen(true)} aria-label="Cart">
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

      <footer className="bg-[#F8F6F0] border-t-2 border-ink text-ink mt-0">
        {/* Value Props / Trust Pillars Strip */}
        <div className="border-b border-ink/10 bg-white/60">
          <div className="container mx-auto px-gutter py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-coral">
                      <rect width="16" height="13" x="1" y="6" rx="2"/><polygon points="17 8 20 8 23 11 23 16 17 16 17 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  ),
                  title: 'Free Express Shipping',
                  desc: 'On all orders over $50'
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
                    </svg>
                  ),
                  title: '30-Day Guarantee',
                  desc: 'Love it or 100% money back'
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-periwinkle">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  ),
                  title: 'Therapist Approved',
                  desc: 'Real milestone development'
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-marigold">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  ),
                  title: 'Dedicated Support',
                  desc: 'Fast help from caring parents'
                },
              ].map((pill, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/80 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-canvas flex items-center justify-center shrink-0 border border-ink/10 shadow-xs group-hover:scale-105 transition-transform">
                    {pill.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">{pill.title}</h4>
                    <p className="text-[12px] text-ink/65 leading-tight">{pill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-gutter pt-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Col 1: Brand & Mission & Socials (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link to="/" className="inline-block group">
                <Logo className="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
              </Link>
              
              <p className="text-sm text-ink/75 leading-relaxed max-w-sm">
                Parent-tested, therapist-approved screen-free toys designed to cultivate creativity, spatial logic, and lifelong milestone confidence.
              </p>

              {/* Verified rating chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink/10 shadow-xs">
                <div className="flex text-[#FFB627]">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-sm leading-none">{s}</span>
                  ))}
                </div>
                <span className="text-xs font-bold text-ink">4.9/5 from 28,000+ Families</span>
              </div>

              {/* Social icons */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40 mb-2">Connect With Us</p>
                <div className="flex items-center gap-2">
                  {[
                    {
                      name: 'Instagram',
                      url: 'https://instagram.com',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      )
                    },
                    {
                      name: 'TikTok',
                      url: 'https://tiktok.com',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.12-4.484V9.458a6.34 6.34 0 0 0-4.07 1.488 6.342 6.342 0 1 0 9.596 5.4v-7.14a8.196 8.196 0 0 0 4.77 1.506V7.27a4.84 4.84 0 0 1-1-.584z"/>
                        </svg>
                      )
                    },
                    {
                      name: 'YouTube',
                      url: 'https://youtube.com',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )
                    },
                    {
                      name: 'Pinterest',
                      url: 'https://pinterest.com',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.48.02-3.55.13-1 .85-6.23.85-6.23s-.22-.44-.22-1.09c0-1.02.59-1.78 1.33-1.78.63 0 .93.47.93 1.04 0 .63-.4 1.58-.61 2.45-.17.74.37 1.34 1.1 1.34 1.32 0 2.34-1.39 2.34-3.4 0-1.78-1.28-3.02-3.1-3.02-2.11 0-3.35 1.58-3.35 3.22 0 .64.25 1.32.55 1.69.06.08.07.14.05.22-.05.23-.18.73-.2.83-.03.14-.11.17-.25.1-1.02-.48-1.66-1.98-1.66-3.18 0-2.59 1.88-4.97 5.43-4.97 2.85 0 5.07 2.03 5.07 4.75 0 2.83-1.78 5.11-4.26 5.11-.83 0-1.62-.43-1.88-.94l-.51 1.96c-.19.71-.69 1.6-1.03 2.15A12 12 0 1 0 12 0z"/>
                        </svg>
                      )
                    },
                    {
                      name: 'Facebook',
                      url: 'https://facebook.com',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )
                    },
                  ].map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-9 h-9 rounded-xl bg-white border border-ink/10 flex items-center justify-center text-ink/70 hover:text-coral hover:border-coral hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2: Explore Toys (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink/40">Shop Toys</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Ages 1–3 (Toddler)', to: '/collections/toddler' },
                  { label: 'Ages 3–5 (Preschool)', to: '/collections/preschool' },
                  { label: 'Ages 5+ (Big Kids)', to: '/collections/big-kids' },
                  { label: 'Best Sellers', to: '/collections/best-sellers' },
                  { label: 'STEM & Learning', to: '/collections/all?filter=STEM%20%26%20Learning' },
                  { label: 'Arts & Crafts', to: '/collections/all?filter=Arts%20%26%20Crafts' },
                  { label: 'Building Sets', to: '/collections/all?filter=Building' },
                ].map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-1.5 text-sm font-medium text-ink/75 hover:text-coral hover:translate-x-1 transition-all duration-200"
                    >
                      <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral text-xs">→</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Support (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink/40">Parent Support</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Track Your Order', to: '/track' },
                  { label: 'FAQ & Help Center', to: '/faq' },
                  { label: 'Shipping & Delivery', to: '/shipping' },
                  { label: '30-Day Returns', to: '/shipping' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'About ToddsIQ', to: '/about' },
                ].map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-1.5 text-sm font-medium text-ink/75 hover:text-coral hover:translate-x-1 transition-all duration-200"
                    >
                      <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral text-xs">→</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Interactive Newsletter & VIP Club (4 cols) */}
            <div className="lg:col-span-4 space-y-4 bg-white/80 p-6 rounded-2xl border border-ink/10 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <h3 className="font-display text-xl font-bold text-ink">Join the Play Club</h3>
              </div>
              <p className="text-xs text-ink/70 leading-relaxed">
                Get <strong className="text-coral font-bold">10% OFF</strong> your first order, plus free developmental milestone activity guides sent weekly.
              </p>

              {newsletterSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-[#E8F8F5] border border-teal/30 text-ink"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-teal">
                    <span>🎉 Welcome to the club!</span>
                  </div>
                  <p className="text-xs text-ink/80 mt-1">
                    Use code <strong className="font-mono bg-white px-2 py-0.5 rounded border border-ink/10 text-coral">WELCOME10</strong> at checkout for 10% off.
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter parent email..."
                      required
                      className="w-full pl-3.5 pr-20 py-2.5 rounded-xl border-2 border-ink bg-white font-body-sm text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-coral transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 px-4 py-1.5 bg-coral text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#e0315f] active:scale-95 transition-all shadow-xs"
                    >
                      Join
                    </button>
                  </div>
                  <p className="text-[11px] text-ink/50 flex items-center gap-1">
                    <span>🔒</span> Zero spam. Unsubscribe anytime with 1 click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges & Back to Top */}
        <div className="border-t border-ink/10 bg-white/40">
          <div className="container mx-auto px-gutter py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink/60">
            <div className="flex items-center gap-3 text-center md:text-left">
              <span>© {new Date().getFullYear()} ToddsIQ™. All rights reserved.</span>
              <span className="hidden sm:inline text-ink/20">•</span>
              <span className="hidden sm:inline">Screen-Free Play</span>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-[11px] uppercase tracking-wider text-ink/40 mr-1 hidden lg:inline">Secure Checkout:</span>
              {['VISA', 'MC', 'AMEX', 'APPLE PAY', 'G PAY', 'PAYPAL'].map((pay) => (
                <span key={pay} className="px-2 py-0.5 rounded bg-white border border-ink/10 text-[10px] font-mono font-bold tracking-tight text-ink/70 shadow-xs">
                  {pay}
                </span>
              ))}
            </div>

            {/* Legal Links & Back to Top */}
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-coral transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-coral transition-colors">Terms</Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-ink/10 hover:border-coral hover:text-coral text-ink font-semibold transition-all group ml-1"
                aria-label="Back to top"
              >
                <span>Top</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-y-0.5 transition-transform"><path d="m18 15-6-6-6 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-[85vw] max-w-[400px] bg-canvas z-[2001] shadow-2xl overflow-y-auto border-r-2 border-ink"
            >
              <div className="p-6 flex items-center justify-between border-b border-surface-container">
                <span className="font-display-hero text-2xl font-bold text-ink">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {NAV.map(item => (
                  <div key={item.label}>
                    {item.mega ? (
                      <div className="mb-4">
                        <span className="px-4 py-1.5 text-xs font-bold text-ink-variant uppercase tracking-wider block">Shop by Age</span>
                        <div className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-surface-container ml-4">
                          {item.ages.map(a => (
                            <Link key={a.label} to={a.href} onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-[#F4F1EA] text-ink font-label-md flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{background: a.bg}}>{a.emoji}</span>
                              <div>
                                <strong className="block text-sm font-bold text-ink">{a.label}</strong>
                                <span className="block text-xs text-ink/60">{a.sub}</span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {item.categories && (
                          <>
                            <span className="px-4 py-1.5 text-xs font-bold text-ink-variant uppercase tracking-wider block mt-4">Shop by Category</span>
                            <div className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-surface-container ml-4">
                              {item.categories.map(c => (
                                <Link key={c.label} to={c.href} onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-[#F4F1EA] text-ink font-label-md flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-xs border border-ink/5" style={{background: c.bg}}>{c.emoji}</span>
                                  <div>
                                    <strong className="block text-sm font-semibold text-ink">{c.label}</strong>
                                    <span className="block text-[11px] text-ink/50">{c.sub}</span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <Link to={item.href || '#'} onClick={() => setMobileMenuOpen(false)} className={`px-4 py-3 rounded-xl hover:bg-[#F4F1EA] font-label-lg text-label-lg block ${item.sale ? 'text-coral font-bold' : 'text-ink'}`}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function NavItem({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <li 
      className="nav-item relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.mega ? (
        <>
          <button className={`nav-link${item.sale ? ' nav-link-sale' : ''} ${isHovered ? 'bg-[#F4F1EA]-high text-ink rounded-full' : ''}`}>
            {item.label}
            <motion.svg 
              animate={{ rotate: isHovered ? 180 : 0 }} 
              width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
            >
              <path d="M6 8L1 3h10z"/>
            </motion.svg>
          </button>
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 12, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(2px)' }}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                className="absolute top-[calc(100%+10px)] left-0 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_-8px_rgba(30,42,56,0.18),0_0_0_1px_rgba(30,42,56,0.06)] p-5 grid grid-cols-2 gap-5 w-[600px] z-[200] origin-top border border-ink/10"
              >
                <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

                {/* Left Column: Shop by Age */}
                <div className="flex flex-col gap-1 pr-3 border-r border-ink/5">
                  <div className="px-2 py-1 border-b border-ink/5 mb-1 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">Shop by Age</p>
                    <span className="text-[10px] font-semibold text-coral bg-coral/10 px-1.5 py-0.5 rounded">3 Stages</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {item.ages.map((a, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -8 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.02 * i }}
                        key={a.label}
                      >
                        <Link 
                          to={a.href} 
                          onClick={() => setIsHovered(false)} 
                          className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4F1EA] transition-all"
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110 shadow-xs border border-ink/5 flex-shrink-0" style={{ background: a.bg }}>
                            {a.emoji}
                          </div>
                          <div>
                            <strong className="block text-[14px] font-bold text-ink group-hover:text-coral transition-colors">{a.label}</strong>
                            <span className="text-[11.5px] text-ink/60 line-clamp-1">{a.sub}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto pt-3 border-t border-ink/5">
                    <Link
                      to="/collections/best-sellers"
                      onClick={() => setIsHovered(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F1EA] hover:bg-coral/10 text-ink group transition-colors"
                    >
                      <span className="text-xs font-bold group-hover:text-coral transition-colors">🔥 View Best Sellers</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink/40 group-hover:text-coral group-hover:translate-x-0.5 transition-all"><path d="m9 18 6-6-6-6"/></svg>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Shop by Category */}
                <div className="flex flex-col gap-1 pl-1">
                  <div className="px-2 py-1 border-b border-ink/5 mb-1 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">Shop by Category</p>
                    <span className="text-[10px] font-semibold text-ink/40">Filter by Type</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {item.categories?.map((c, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 8 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.02 * i }}
                        key={c.label}
                      >
                        <Link 
                          to={c.href} 
                          onClick={() => setIsHovered(false)} 
                          className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#F4F1EA] transition-all"
                        >
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform duration-200 group-hover:scale-110 shadow-xs border border-ink/5 flex-shrink-0" style={{ background: c.bg }}>
                            {c.emoji}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-[13.5px] font-semibold text-ink group-hover:text-coral transition-colors">
                              {c.label}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link to={item.href || '#'} className={`nav-link${item.sale ? ' nav-link-sale' : ''}`}>
          {item.label}
        </Link>
      )}
    </li>
  );
}
