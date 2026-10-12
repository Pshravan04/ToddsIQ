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
            <Link to="/" className="logo flex items-center">
              <Logo className="h-7 md:h-8 w-auto" />
            </Link>

            <ul className="nav-links">
              {NAV.map((item) => (<NavItem key={item.label} item={item} />))}
            </ul>

            <div className="nav-actions">
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
            <Link to="/" className="inline-block">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="font-body-sm text-body-sm text-ink-variant max-w-xs">
              Parent-tested, therapist-approved screen-free toys that grow with your child's developmental milestones.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-label-lg text-label-lg font-bold">Shop</h3>
            <ul className="space-y-2 font-body-sm text-body-sm text-ink-variant">
              <li><Link to="/collections/toddler" className="hover:text-coral transition-colors">Ages 1–3</Link></li>
              <li><Link to="/collections/preschool" className="hover:text-coral transition-colors">Ages 3–5</Link></li>
              <li><Link to="/collections/big-kids" className="hover:text-coral transition-colors">Ages 5+</Link></li>
              <li><Link to="/collections/best-sellers" className="hover:text-coral transition-colors">Best Sellers</Link></li>
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
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                className="absolute top-[calc(100%+10px)] left-0 bg-white rounded-2xl shadow-[0_20px_40px_-8px_rgba(30,42,56,0.22),0_4px_16px_rgba(30,42,56,0.08)] p-3 flex flex-col gap-1 w-[320px] z-[200] origin-top border-2 border-ink"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

                <div className="px-3 py-1.5 border-b border-ink/10 mb-1 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">Shop by Age</p>
                  <span className="text-[10px] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">3 Stages</span>
                </div>

                <div className="flex flex-col gap-1">
                  {item.ages.map((a, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -6 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: 0.02 * i }}
                      key={a.label}
                    >
                      <Link 
                        to={a.href} 
                        onClick={() => setIsHovered(false)} 
                        className="group flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#F4F1EA] transition-all"
                      >
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-110 shadow-xs border border-ink/10 flex-shrink-0" style={{ background: a.bg }}>
                          {a.emoji}
                        </div>
                        <div>
                          <strong className="block text-[15px] font-bold text-ink group-hover:text-coral transition-colors">{a.label}</strong>
                          <span className="text-[12px] text-ink/60 line-clamp-1">{a.sub}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2 mt-1 border-t border-ink/10">
                  <Link
                    to="/collections/best-sellers"
                    onClick={() => setIsHovered(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F1EA] hover:bg-coral/10 text-ink group transition-colors"
                  >
                    <span className="text-xs font-bold group-hover:text-coral transition-colors">🔥 View Best Sellers</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink/40 group-hover:text-coral group-hover:translate-x-0.5 transition-all"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
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
