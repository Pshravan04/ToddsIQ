import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

/* ── Inline SVG icons (avoids emoji encoding issues) ── */
const IconShield   = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconTruck    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IconRefresh  = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IconAward    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
const IconLeaf     = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 22c1.95-1.97 5.14-4 8.18-4 1.5 0 2.98.29 4.17.95C21 16 21 9 17 8z"/></svg>;
const IconHeart    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const IconStar     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconSparkle  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconArrow    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconGift     = () => <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
const IconDraw     = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6154" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const IconTrophy   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F9D8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4"/><path d="M17 4h3a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4"/><rect x="7" y="2" width="10" height="11" rx="1"/></svg>;
const IconBrain    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/></svg>;
const IconPhone    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconSprout   = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 1 3.3 1.8 7 7 0 0 1 1.6 3.3c-2.3.4-4-.2-5.3-.9-1.3-.7-2.4-2.3-3-4.3 1.3-.3 2.6-.2 3.4.1z"/></svg>;
const IconTarget   = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;

/* ── Data ── */
const TRUST = [
  { Icon: IconShield,  label: 'Safety First',   sub: 'All toys rigorously tested',  color: '#FF6154', bg: '#FFF1F0' },
  { Icon: IconTruck,   label: 'Free Shipping',  sub: 'On all orders over $50',      color: '#1F9D8A', bg: '#E8F8F5' },
  { Icon: IconRefresh, label: '30-Day Returns', sub: 'Hassle-free, no questions',   color: '#6C8EF5', bg: '#EEF1FD' },
  { Icon: IconAward,   label: 'Expert Curated', sub: 'Vetted by child dev experts', color: '#FFB627', bg: '#FFF8E7' },
  { Icon: IconLeaf,    label: 'Eco Packaging',  sub: '100% recyclable materials',   color: '#66BB6A', bg: '#F0FAF1' },
  { Icon: IconHeart,   label: '10K+ Families',  sub: 'Loved by parents worldwide',  color: '#F06292', bg: '#FEF0F4' },
];

const AGE_CARDS = [
  { label: 'Tiny Tots',  sub: '0-18 months', desc: '18 toys', pill: '0-18 mo',  pillBg: 'rgba(255,97,84,.8)',   href: '/collections/tiny-tots',    bgClass: 'age-toddler-bg',   Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5"><path d="M3 9h18v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9z"/><path d="M3 9a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3"/><line x1="12" y1="6" x2="12" y2="3"/></svg> },
  { label: 'Toddlers',   sub: '18 mo-3 yrs', desc: '24 toys', pill: '18 mo-3', pillBg: 'rgba(108,142,245,.8)', href: '/collections/toddlers',     bgClass: 'age-preschool-bg', Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { label: 'Big Kids',   sub: '6-12 years',  desc: '31 toys', pill: '6-12 yrs', pillBg: 'rgba(255,182,39,.8)',  href: '/collections/big-kids',     bgClass: 'age-bigkids-bg',   Icon: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
];

const BENTO = [
  { label: 'STEM & Science', count: '42 toys', bg: '#EEF1FD', color: '#6C8EF5', wide: false, tall: true,  Icon: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6C8EF5" strokeWidth="2" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg> },
  { label: 'Arts & Crafts',  count: '28 toys', bg: '#FEF0F4', color: '#F06292', wide: false, tall: false, Icon: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F06292" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { label: 'Building',       count: '19 toys', bg: '#FFF8E7', color: '#FFB627', wide: true,  tall: false, Icon: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFB627" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { label: 'Math & Logic',   count: '15 toys', bg: '#FFF1F0', color: '#FF6154', wide: false, tall: false, Icon: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF6154" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { label: 'Sensory Play',   count: '22 toys', bg: '#F0FAF1', color: '#66BB6A', wide: false, tall: false, Icon: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
];

const TESTIMONIALS = [
  { text: 'My 4-year-old has been using the Drawing Robot for 3 months and her artistic confidence has skyrocketed! She used to get frustrated — now she draws every single day.', name: 'Sarah M.', role: 'Mom of 2, California', rating: 5 },
  { text: "We've bought from a lot of toy brands but ToddsIQ genuinely stands out. The quality is premium, shipping was lightning-fast, and my son absolutely loves his STEM kit.", name: 'James K.', role: 'Dad of 3, Texas', rating: 5 },
  { text: "The perfect gift for my niece's birthday! She's been obsessed ever since. So much better than yet another screen-based toy. Worth every penny.", name: 'Emily R.', role: 'Aunt & teacher, New York', rating: 5 },
];

const BENEFITS = [
  { Icon: IconBrain,  title: 'Brain-Building Play',  desc: 'Every toy is designed to develop critical thinking, creativity, and problem-solving skills through hands-on exploration.', color: '#6C8EF5', bg: '#EEF1FD' },
  { Icon: IconPhone,  title: 'Screen-Free Fun',      desc: 'We believe the best memories are made away from screens. Our toys engage imagination in the real, physical world.', color: '#1F9D8A', bg: '#E8F8F5' },
  { Icon: IconSprout, title: 'Grow With Them',       desc: 'Age-appropriate designs that challenge kids just enough - building confidence with every new skill mastered.',      color: '#66BB6A', bg: '#F0FAF1' },
  { Icon: IconTarget, title: 'Expert Chosen',        desc: 'Curated by child development specialists, educators, and parents - only the best makes it into our catalog.',        color: '#FFB627', bg: '#FFF8E7' },
];

/* ── Footer ── */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-orb footer-orb-1" />
      <div className="footer-orb footer-orb-2" />
      <div className="container">
        <div className="footer-inner">
          <div>
            <span className="footer-logo">Todds<span>IQ</span>™</span>
            <p className="footer-tagline">Screen-free toys that grow your child's brain — one creative adventure at a time.</p>
            <div className="footer-social">
              {['IG','TW','FB','YT','PT'].map(s => (
                <a key={s} href="#" className="social-btn" aria-label={s}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-title">Shop</p>
            <div className="footer-links">
              {['New Arrivals','Best Sellers','Shop by Age','STEM & Science','Arts & Crafts','Gift Sets','Sale'].map(l => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-title">Help</p>
            <div className="footer-links">
              {['FAQ','Shipping & Returns','Track Order','Contact Us','Wholesale'].map(l => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-col-title">Stay in the Loop</p>
            <p className="footer-nl-label">Get new toy drops, parenting tips, and exclusive discounts — straight to your inbox.</p>
            <div className="footer-input-row">
              <input className="footer-email" type="email" placeholder="your@email.com" />
              <button className="btn btn-primary btn-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 ToddsIQ™. All rights reserved. Made with love for curious kids everywhere.</p>
          <div className="footer-bottom-links">
            {['Privacy Policy','Terms of Service','Accessibility'].map(l => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Hero image: first product from data ── */
const HERO_IMG = (products[0]?.images?.[0]) || (products[0]?.thumbnail);
const HERO_IMG_2 = (products[3]?.images?.[0]) || (products[3]?.thumbnail);

/* ── Home Page ── */
export default function Home() {
  const featured = products.slice(0, 8);
  const bestsellers = products.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className="hero-kicker">
                <IconStar />
                Trusted by 10,000+ families worldwide
              </div>
              <h1 className="hero-title">
                Toys That Spark<br />
                <span className="coral">Curiosity</span>, Build<br />
                <span className="teal">Confidence</span>
              </h1>
              <p className="hero-desc">
                Screen-free, brain-building toys designed by child development experts — from wobbling first steps to big-kid STEM adventures.
              </p>
              <div className="hero-actions">
                <Link to="/collections/all" className="btn btn-primary btn-lg">
                  Shop All Toys &rarr;
                </Link>
                <Link to="/collections/new" className="btn btn-outline btn-lg">
                  New Arrivals
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <strong>10K+</strong>
                  <span>Happy Families</span>
                </div>
                <div className="stat-item">
                  <strong>4.9 Stars</strong>
                  <span>Average Rating</span>
                </div>
                <div className="stat-item">
                  <strong>120+</strong>
                  <span>Unique Toys</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-blob" />
              <img
                className="hero-img"
                src={HERO_IMG}
                alt="ToddsIQ brain-building toys for curious kids"
                onError={e => { e.target.onerror = null; e.target.style.background = 'linear-gradient(135deg,#FFD97D,#FF6154)'; }}
              />
              <div className="hero-float top">
                <div className="float-icon" style={{ background: '#FFF8E7' }}>
                  <IconDraw />
                </div>
                <div className="float-text">
                  <strong>New Drop!</strong>
                  <span>Art &amp; STEM Bundle</span>
                </div>
              </div>
              <div className="hero-float bot">
                <div className="float-icon" style={{ background: '#E8F8F5' }}>
                  <IconTrophy />
                </div>
                <div className="float-text">
                  <strong>Best Seller</strong>
                  <span>Drawing Robot &mdash; 4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(3)].flatMap((_, ri) => TRUST.map((t, i) => (
            <span key={ri + '-' + i} className="marquee-chip">
              <IconSparkle />
              {t.label}
            </span>
          )))}
        </div>
      </div>

      {/* TRUST BADGES */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            {TRUST.map(({ Icon, label, sub, color, bg }) => (
              <div key={label} className="trust-badge">
                <div className="trust-icon-bg" style={{ background: bg, color }}>
                  <Icon />
                </div>
                <p className="trust-label">{label}</p>
                <p className="trust-sub">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY AGE */}
      <section className="age-section">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Find the perfect fit</span>
            <h2 className="section-title">Shop by <span className="coral">Age</span></h2>
            <p className="section-sub" style={{ margin: '1rem auto 0' }}>Every toy matched to your child's developmental stage — so they're always perfectly challenged.</p>
          </div>
          <div className="age-grid">
            {AGE_CARDS.map(card => (
              <Link key={card.label} to={card.href} className="age-card">
                <div className={'age-card-bg ' + card.bgClass} />
                <div className="age-card-overlay" />
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 3 }}>
                  <card.Icon />
                </div>
                <div className="age-card-body">
                  <span className="age-pill" style={{ background: card.pillBg }}>{card.pill}</span>
                  <h3 className="age-card-title">{card.label}</h3>
                  <p className="age-card-sub">{card.sub} &middot; {card.desc}</p>
                  <span className="age-card-arrow">Explore collection &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <div>
              <span className="section-eyebrow">Handpicked for you</span>
              <h2 className="section-title">Featured <span className="teal">Toys</span></h2>
            </div>
            <Link to="/collections/all" className="btn btn-outline">View All &rarr;</Link>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* BENTO INTEREST GRID */}
      <section className="interest-section">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Something for every spark</span>
            <h2 className="section-title">Shop by <span className="coral">Interest</span></h2>
          </div>
          <div className="bento-grid">
            {BENTO.map(tile => (
              <a
                key={tile.label}
                href="#"
                className={'bento-tile' + (tile.wide ? ' wide' : '') + (tile.tall ? ' tall' : '')}
                style={{ background: tile.bg }}
              >
                <div style={{ color: tile.color, marginBottom: '.875rem' }}>
                  <tile.Icon />
                </div>
                <div>
                  <p className="bento-title">{tile.label}</p>
                  <p className="bento-count">{tile.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits-section">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Why ToddsIQ™</span>
            <h2 className="section-title">Play That <span className="coral">Actually Matters</span></h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map(b => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-icon-box" style={{ background: b.bg, color: b.color }}>
                  <b.Icon />
                </div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="products-section" style={{ background: 'var(--bg-subtle)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="products-header">
            <div>
              <span className="section-eyebrow">Parent favourites</span>
              <h2 className="section-title">Best <span className="teal">Sellers</span></h2>
            </div>
            <Link to="/collections/best-sellers" className="btn btn-outline">See All &rarr;</Link>
          </div>
          <div className="product-grid">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="t-bg-orb t-bg-orb-1" />
        <div className="t-bg-orb t-bg-orb-2" />
        <div className="container">
          <h2 className="testimonials-title">10,000+ families can&apos;t be wrong</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="t-card">
                <div className="t-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="t-text">&ldquo;{t.text}&rdquo;</p>
                <div className="t-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT BANNER */}
      <section className="gift-section">
        <div className="container">
          <div className="gift-inner">
            <div>
              <span className="gift-eyebrow">The perfect present</span>
              <h2 className="gift-title">Not sure what to buy?<br />We&apos;ve got you covered.</h2>
              <p className="gift-sub">Take our 60-second quiz and we'll match your child with their perfect toy — guaranteed to delight.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <a href="#" className="btn btn-light btn-lg">Take the Gift Quiz &rarr;</a>
                <a href="#" className="btn" style={{ background: 'rgba(255,255,255,.15)', color: 'white', border: '2px solid rgba(255,255,255,.3)' }}>Browse Gift Sets</a>
              </div>
            </div>
            <div style={{ flexShrink: 0, zIndex: 1 }}>
              <IconGift />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <span className="section-eyebrow">Join the ToddsIQ family</span>
            <h2 className="section-title">Get <span className="coral">10% Off</span> Your First Order</h2>
            <p style={{ marginTop: '.75rem', color: 'var(--text-secondary)', fontSize: '.9375rem' }}>
              Plus early access to new arrivals, expert parenting tips, and exclusive member discounts.
            </p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input className="newsletter-input" type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn btn-primary">Subscribe &rarr;</button>
            </form>
            <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
