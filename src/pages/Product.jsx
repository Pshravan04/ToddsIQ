import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

// --- Icons ---
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const ChevronDownIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const TruckIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const RefreshIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>;

export default function Product() {
  const { id, slug } = useParams();
  const { addItem } = useCart();
  const product = productsData.find(p => p.id === id || p.id === slug || p.slug === slug);
  
  const [activeMedia, setActiveMedia] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [showStickyAdd, setShowStickyAdd] = useState(false);
  
  // Ref for intersection observer to toggle sticky bar
  const heroCartRef = useRef(null);

  // Scroll to top on mount/product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, slug]);

  // Intersection Observer for Sticky CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky when the main add to cart button leaves the viewport
        setShowStickyAdd(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    
    if (heroCartRef.current) {
      observer.observe(heroCartRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '12rem 2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-navy)', margin: '1rem 0' }}>Product not found</h2>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );

  // --- Dynamic Data Fallbacks & Enrichment ---
  const images = product.images || [product.thumbnail || product.image].filter(Boolean);
  
  // Combine all media (images + dummy videos for demo)
  const allMedia = [
    ...images.map(img => ({ type: 'image', src: img })),
    // Only inject videos if it's the main drawing robot to simulate rich media
    ...(product.slug === 'thoson-bot' || product.name?.toLowerCase().includes('robot') ? [
      { type: 'video', src: 'https://cdn.shopify.com/videos/c/o/v/6148281144a046c8b9db5e665979eb46.mp4', thumb: images[0] }
    ] : [])
  ];

  const currentMedia = allMedia[activeMedia] || allMedia[0];

  const related = productsData.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  const isDrawingRobot = product.slug === 'thoson-bot' || product.name?.toLowerCase().includes('robot');
  
  const variants = isDrawingRobot ? [
    { id: 1, name: 'Single Robot', subtitle: 'Best for individual play', price: 89.99, compare: 150.00, save: 'SAVE 40%' },
    { id: 2, name: 'Duo Pack', subtitle: 'Perfect for siblings & gifting', price: 149.99, compare: 200.00, save: 'SAVE 16%', badge: 'Most Popular' },
    { id: 3, name: 'Family Pack', subtitle: 'Perfect for families & gifting', price: 199.99, compare: 450.00, save: 'SAVE 55%', badge: 'Best for families' },
    { id: 4, name: 'Classroom Pack', subtitle: 'Maximum savings on 4 robots', price: 239.99, compare: 600.00, save: 'SAVE 60%', badge: 'Best Value' },
  ] : [
    { id: 1, name: 'Standard Edition', subtitle: '', price: product.price, compare: product.compareAtPrice || null, save: null }
  ];

  const currentVariant = variants[selectedVariant];

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: product.id + '-' + currentVariant.id, // unique id for cart
      name: `${product.name} (${currentVariant.name})`,
      price: currentVariant.price,
      image: images[0]
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: showStickyAdd ? '80px' : '0' }}>
      
      {/* 1. PRODUCT HERO */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 5%', display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
        
        {/* Left: Media Gallery */}
        <div style={{ flex: '1 1 500px', minWidth: 0 }}>
          <div style={{ 
            aspectRatio: '1/1', 
            borderRadius: 'var(--r-lg)', 
            overflow: 'hidden', 
            background: 'var(--paper)',
            border: '1px solid var(--border-color)',
            position: 'relative',
            marginBottom: '1rem'
          }}>
            {currentMedia.type === 'video' ? (
              <video 
                src={currentMedia.src} 
                poster={currentMedia.thumb}
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <img 
                src={currentMedia.src} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            )}
          </div>
          
          {/* Thumbnail Navigation */}
          {allMedia.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
              {allMedia.map((media, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  style={{
                    width: '80px',
                    height: '80px',
                    flexShrink: 0,
                    borderRadius: 'var(--r-md)',
                    overflow: 'hidden',
                    border: activeMedia === idx ? '2px solid var(--ink-navy)' : '1px solid var(--border-color)',
                    background: 'var(--paper)',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <img 
                    src={media.type === 'video' ? media.thumb : media.src} 
                    alt="thumbnail" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {media.type === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <PlayIcon />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info Panel */}
        <div style={{ flex: '1 1 400px' }}>
          
          {/* Breadcrumbs & Title */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            {product.category || 'Toys'}
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--ink-navy)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            {product.name}
          </h1>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            {isDrawingRobot ? 'The screen-free drawing companion that brings creativity to life.' : product.description}
          </p>

          {/* Ratings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#ffb400' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '1.2rem' }}>{star}</span>)}
            </div>
            <span style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>4.9 / 5</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>(250+ Reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink-navy)', fontFamily: 'var(--font-display)' }}>
              ${currentVariant.price.toFixed(2)}
            </span>
            {currentVariant.compare && (
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${currentVariant.compare.toFixed(2)}
              </span>
            )}
            {currentVariant.save && (
              <span style={{ background: 'var(--sprout-teal)', color: 'var(--ink-navy)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>
                {currentVariant.save}
              </span>
            )}
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--ink-navy)' }}>Choose Package:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {variants.map((variant, idx) => (
                  <button 
                    key={variant.id}
                    onClick={() => setSelectedVariant(idx)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      background: selectedVariant === idx ? 'rgba(var(--coral-rgb), 0.05)' : 'var(--paper)',
                      border: selectedVariant === idx ? '2px solid var(--coral)' : '1px solid var(--border-color)',
                      borderRadius: 'var(--r-md)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `5px solid ${selectedVariant === idx ? 'var(--coral)' : 'var(--border-color)'}`, background: 'white' }} />
                        <span style={{ fontWeight: 700, color: 'var(--ink-navy)', fontSize: '1.1rem' }}>{variant.name}</span>
                      </div>
                      {variant.subtitle && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '1.6rem', marginTop: '0.25rem' }}>{variant.subtitle}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: 'var(--ink-navy)' }}>${variant.price.toFixed(2)}</div>
                    </div>
                    
                    {variant.badge && (
                      <div style={{ position: 'absolute', top: '-10px', right: '1rem', background: 'var(--sun-yellow)', color: 'var(--ink-navy)', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {variant.badge}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ATC Section */}
          <div ref={heroCartRef} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--r-md)', background: 'var(--paper)', overflow: 'hidden' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '0 1rem', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
              <div style={{ width: '40px', textAlign: 'center', fontWeight: 700 }}>{qty}</div>
              <button onClick={() => setQty(qty + 1)} style={{ padding: '0 1rem', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ flex: 1, padding: '1.2rem', fontSize: '1.1rem' }}
              disabled={added}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', background: 'white', borderRadius: 'var(--r-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--sprout-teal)' }}><TruckIcon /></span> Free Fast Shipping over $50
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--sprout-teal)' }}><RefreshIcon /></span> 30-Day Hassle-Free Returns
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--sprout-teal)' }}><ShieldIcon /></span> 1-Year Quality Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT BENEFITS STRIP */}
      <section style={{ background: 'var(--ink-navy)', color: 'white', padding: '2rem 5%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', width: '100%' }}>
          {[
            { title: 'Screen-Free Learning', desc: 'No tablets, no apps.' },
            { title: 'Child Friendly', desc: 'Safe, durable materials.' },
            { title: 'Develops Motor Skills', desc: 'Encourages fine movement.' },
            { title: 'Portable Design', desc: 'Take it anywhere.' }
          ].map((benefit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px', maxWidth: '250px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sun-yellow)' }}>
                <CheckIcon />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{benefit.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{benefit.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROBLEM -> SOLUTION STORY */}
      <section style={{ padding: '6rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ color: 'var(--coral)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>The Problem</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Too many screens, not enough hands-on creativity.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              In a world full of digital distractions, it is harder than ever to keep children engaged in activities that actively develop their cognitive and fine motor skills. Tablets entertain, but they rarely challenge or inspire true creative problem-solving.
            </p>
          </div>
          <div style={{ flex: '1 1 400px', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src={images[0]} alt="The Problem" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: '1 1 400px', borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src={images[1] || images[0]} alt="The Solution" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ color: 'var(--sprout-teal)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>The Solution</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Meet the smartest screen-free companion.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.name} bridges the gap between technology and tactile play. It engages children with interactive guidance while keeping their eyes on the paper and their hands on the tools.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Builds spatial awareness', 'Encourages independent play', 'Develops pencil grip & control'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--ink-navy)' }}>
                  <span style={{ color: 'var(--coral)' }}><CheckIcon /></span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT DEMONSTRATION VIDEO */}
      {isDrawingRobot && (
        <section style={{ padding: '6rem 5%', background: 'var(--paper)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)', marginBottom: '1rem' }}>See It In Action</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              Watch how the {product.name} turns an ordinary afternoon into a masterclass in creativity and fun.
            </p>
            
            <div style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', background: '#000', aspectRatio: '16/9', position: 'relative' }}>
              <video 
                src="https://cdn.shopify.com/videos/c/o/v/6148281144a046c8b9db5e665979eb46.mp4" 
                controls
                poster={images[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
              {['Easy 1-minute setup', 'Simple button operation', 'No Wi-Fi required'].map((pt, i) => (
                <div key={i} style={{ fontWeight: 700, color: 'var(--ink-navy)', background: 'white', padding: '0.75rem 1.5rem', borderRadius: '100px', border: '1px solid var(--border-color)' }}>
                  {i + 1}. {pt}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. KEY FEATURES */}
      <section style={{ padding: '6rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)' }}>Engineered for Little Minds</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Smart & Simple', desc: 'Intuitive controls designed specifically for small hands.' },
            { title: 'Kid-Tough Design', desc: 'Built to withstand drops, spills, and enthusiastic play.' },
            { title: 'Long Battery Life', desc: 'Up to 6 hours of continuous creative exploration on a single charge.' },
            { title: 'Expandable Content', desc: 'Grows with your child through additional activity cards.' },
            { title: 'Eye-Safe Tech', desc: 'No harsh backlights or blue light emissions.' },
            { title: 'Quiet Operation', desc: 'Designed to inspire focus, not create a noisy environment.' }
          ].map((feature, i) => (
            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--coral)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '1px' }}>FEATURE 0{i+1}</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--ink-navy)', marginBottom: '0.75rem', fontWeight: 800 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW TO USE / HOW IT WORKS */}
      <section style={{ background: 'var(--ink-navy)', color: 'white', padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>How To Use</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginTop: '1rem' }}>It is as easy as 1, 2, 3.</p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {[
              { title: 'Unbox & Charge', desc: 'Ready out of the box with a quick 30-min top-up.' },
              { title: 'Insert a Card', desc: 'Drop in any of the included activity cards to begin.' },
              { title: 'Follow Along', desc: 'Watch and learn as the magic happens right on the paper.' },
              { title: 'Create & Share', desc: 'Add personal touches to complete the masterpiece.' }
            ].map((step, i) => (
              <div key={i} style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>0{i+1}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 800, position: 'relative' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, position: 'relative' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT'S INCLUDED & SPECS */}
      <section style={{ padding: '6rem 5%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ink-navy)', marginBottom: '2rem' }}>What's Included</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { name: 'Main Unit', qty: 1 },
              { name: 'Activity Cards', qty: 50 },
              { name: 'Drawing Markers', qty: 4 },
              { name: 'USB-C Cable', qty: 1 }
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--paper)', padding: '1.5rem', borderRadius: 'var(--r-md)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--coral)', border: '2px solid var(--border-color)' }}>
                  x{item.qty}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--ink-navy)' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ink-navy)', marginBottom: '2rem' }}>Specifications</h2>
          <div style={{ background: 'white', borderRadius: 'var(--r-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            {[
              { label: 'Recommended Age', val: '4 - 8 Years' },
              { label: 'Battery Life', val: '6 Hours Active Use' },
              { label: 'Charging', val: 'USB-C (Cable Included)' },
              { label: 'Material', val: 'BPA-Free ABS Plastic' },
              { label: 'Connectivity', val: 'None required (100% Offline)' },
              { label: 'Warranty', val: '1 Year Full Coverage' }
            ].map((spec, i) => (
              <div key={i} style={{ display: 'flex', padding: '1rem 1.5rem', borderBottom: i === 5 ? 'none' : '1px solid var(--border-color)', background: i % 2 === 0 ? 'transparent' : 'var(--paper)' }}>
                <div style={{ flex: 1, fontWeight: 700, color: 'var(--ink-navy)' }}>{spec.label}</div>
                <div style={{ flex: 1, color: 'var(--text-main)' }}>{spec.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section style={{ padding: '6rem 5%', background: 'var(--paper)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)' }}>Loved by Parents & Kids</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '100px', border: '1px solid var(--border-color)' }}>
              <div style={{ color: '#ffb400', fontSize: '1.2rem', letterSpacing: '2px' }}>★★★★★</div>
              <div style={{ fontWeight: 700, color: 'var(--ink-navy)' }}>4.9/5</div>
              <div style={{ color: 'var(--text-muted)' }}>from 250+ reviews</div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Sarah M.', text: 'Finally a toy that actually holds his attention without a screen. He plays with this for hours.', date: '2 weeks ago' },
              { name: 'David K.', text: 'The quality is fantastic. We bought one for our daughter and immediately ordered another for our nephew.', date: '1 month ago' },
              { name: 'Elena R.', text: 'Best purchase of the year. The setup was instant and she figured out how to use it by herself in 5 minutes.', date: '1 month ago' }
            ].map((review, i) => (
              <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ color: '#ffb400', fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '1rem' }}>★★★★★</div>
                <h4 style={{ fontWeight: 800, color: 'var(--ink-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {review.name}
                  <span style={{ fontSize: '0.7rem', background: 'var(--sprout-teal)', color: 'var(--ink-navy)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>Verified</span>
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{review.date}</div>
                <p style={{ color: 'var(--text-main)', lineHeight: 1.5, fontStyle: 'italic' }}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section style={{ padding: '6rem 5%', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ink-navy)', textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { q: 'What age is this suitable for?', a: 'It is designed for children aged 4 to 8 years old. The activities start simple and grow in complexity as your child develops.' },
            { q: 'Does it require an app or Wi-Fi?', a: 'No! It is 100% screen-free and operates entirely offline. No apps, no Wi-Fi, no Bluetooth required.' },
            { q: 'Is it rechargeable?', a: 'Yes, it comes with a built-in battery and a USB-C charging cable. A full charge takes about 2 hours and lasts for up to 6 hours of continuous use.' },
            { q: 'What happens if a part breaks?', a: 'We offer a 1-year full coverage warranty. If anything stops working under normal use, contact our support team and we will replace it for free.' }
          ].map((faq, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 700, color: 'var(--ink-navy)', fontSize: '1.1rem' }}
              >
                {faq.q}
                <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <ChevronDownIcon />
                </span>
              </button>
              <div style={{ 
                maxHeight: openFaq === i ? '200px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease',
                background: 'var(--paper)'
              }}>
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. RELATED PRODUCTS */}
      {related.length > 0 && (
        <section style={{ padding: '6rem 5%', borderTop: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--ink-navy)', marginBottom: '2rem' }}>You May Also Like</h2>
            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. STICKY MOBILE BOTTOM CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid var(--border-color)',
        padding: '1rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        boxShadow: '0 -10px 20px rgba(0,0,0,0.05)',
        transform: showStickyAdd ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
          <img src={images[0]} alt="" style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }} />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, color: 'var(--ink-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 800 }}>${currentVariant.price.toFixed(2)}</div>
          </div>
        </div>
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn btn-primary"
          style={{ padding: '0.8rem 1.5rem', whiteSpace: 'nowrap' }}
        >
          Select Option
        </button>
      </div>

    </div>
  );
}
