import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';

const NAV = [
  {
    label: 'Shop by Age',
    mega: true,
    ages: [
      { label: 'Tiny Tots', sub: '0–18 months', emoji: '🍼', color: '#FF9F7F', bg: '#FFF4F2', href: '/collections/tiny-tots' },
      { label: 'Toddlers', sub: '18 mo–3 yrs',  emoji: '🧸', color: '#6C8EF5', bg: '#EEF1FD', href: '/collections/toddler' },
      { label: 'Pre-K',    sub: '3–5 years',    emoji: '🎨', color: '#1F9D8A', bg: '#E8F8F5', href: '/collections/preschool' },
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
  { label: 'About Us',     href: '/about' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Contact Us',   href: '/contact' },
  { label: '🔥 Sale',      href: '/collections/sale', sale: true },
];



export default function Layout({ children }) {
  const { cartCount, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { currency, currencyDetails, changeCurrency, availableCurrencies, formatPrice } = useCurrency();
  const CHIPS = [
    `⚡ FREE Express Shipping Over ${formatPrice(50)}`,
    '🛡️ 30-Day Risk-Free Guarantee',
    '⭐ 4.9/5 Rating (28,000+ Happy Families)',
  ];
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/" className="logo">Todds<span>IQ</span>™</Link>

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

      <footer className="bg-[#F4F1EA] border-t-2 border-ink pt-space-2xl pb-space-lg mt-space-xl">
        <div className="container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xl text-ink">
          <div className="space-y-4">
            <Link to="/" className="font-headline-md text-headline-md font-bold text-ink">Todds<span className="text-coral">IQ</span>™</Link>
            <p className="font-body-sm text-body-sm text-ink-variant max-w-xs">
              Parent-tested, therapist-approved screen-free toys that grow with your child's developmental milestones.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-label-lg text-label-lg font-bold">Shop</h3>
            <ul className="space-y-2 font-body-sm text-body-sm text-ink-variant">
              <li><Link to="/collections/tiny-tots" className="hover:text-coral transition-colors">Tiny Tots (0-18m)</Link></li>
              <li><Link to="/collections/toddler" className="hover:text-coral transition-colors">Toddlers (18m-3y)</Link></li>
              <li><Link to="/collections/preschool" className="hover:text-coral transition-colors">Pre-K (3-5y)</Link></li>
              <li><Link to="/collections/big-kids" className="hover:text-coral transition-colors">Big Kids (6-12y)</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-label-lg text-label-lg font-bold">Support</h3>
            <ul className="space-y-2 font-body-sm text-body-sm text-ink-variant">
              <li><Link to="/faq" className="hover:text-coral transition-colors">FAQ & Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-coral transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-coral transition-colors">Contact Us</Link></li>
              <li><Link to="/track" className="hover:text-coral transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-label-lg text-label-lg font-bold">Stay in the Loop</h3>
            <p className="font-body-sm text-body-sm text-ink-variant">Get 10% off your first order plus free developmental play guides.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="w-full px-3 py-2 rounded-xl border-2 border-ink bg-canvas font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
              <button className="px-4 py-2 bg-coral text-canvas rounded-xl font-label-md text-label-md border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="container mx-auto px-gutter mt-space-xl pt-space-md border-t-2 border-ink flex flex-col md:flex-row items-center justify-between gap-4 font-body-xs text-body-xs text-ink-variant">
          <p>© {new Date().getFullYear()} ToddsIQ. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-coral transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-coral transition-colors">Terms of Service</Link>
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
                        <span className="px-4 py-2 text-sm font-bold text-ink-variant uppercase tracking-wider block">{item.label}</span>
                        <div className="flex flex-col gap-1 pl-4 mt-2 border-l-2 border-surface-container ml-4">
                          {item.ages.map(a => (
                            <Link key={a.label} to={a.href} onClick={() => setMobileMenuOpen(false)} className="py-2.5 px-3 rounded-xl hover:bg-[#F4F1EA] text-ink font-label-md flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{background: a.bg}}>{a.emoji}</span>
                              {a.label}
                            </Link>
                          ))}
                        </div>
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
                initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(2px)' }}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_64px_-12px_rgba(30,42,56,0.15),0_0_0_1px_rgba(30,42,56,0.05)] p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 w-[90vw] max-w-[760px] z-[200] origin-top"
              >
                <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" />
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1 ml-2">Shop by Age</p>
                  <div className="flex flex-col gap-2">
                    {item.ages.map((a, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.04 * i }}
                        key={a.label}
                      >
                        <Link to={a.href} onClick={() => setIsHovered(false)} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-[#F4F1EA] transition-all">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm border border-ink/5" style={{ background: a.bg }}>
                            {a.emoji}
                          </div>
                          <div>
                            <strong className="block text-[16px] font-bold text-ink group-hover:text-coral transition-colors">{a.label}</strong>
                            <span className="text-[14px] text-ink/60">{a.sub}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-1 ml-2">Shop by Interest</p>
                  <div className="grid grid-cols-2 gap-3">
                    {item.interests.map((int, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.04 * i }}
                        key={int.label}
                      >
                        <Link to="/collections" onClick={() => setIsHovered(false)} className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F4F1EA] transition-all">
                          <span className="w-12 h-12 rounded-[16px] flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 shadow-sm border border-ink/5" style={{ background: int.color + '20' }}>
                            {int.emoji}
                          </span>
                          <span className="text-[14.5px] font-semibold text-ink/80 group-hover:text-ink transition-colors">{int.label}</span>
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
