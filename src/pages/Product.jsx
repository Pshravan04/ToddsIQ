import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Product() {
  const { id, slug } = useParams();
  const { addItem } = useCart();
  const product = productsData.find(p => p.id === id || p.id === slug || p.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <p style={{ fontSize: '3rem' }}>🧸</p>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-navy)', margin: '1rem 0' }}>Product not found</h2>
      <Link to="/collections/all" className="btn btn-primary">Browse all toys</Link>
    </div>
  );

  const images = product.images || [product.thumbnail || product.image].filter(Boolean);
  const savings = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  const related = productsData.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, image: images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const TABS = ['description', 'features', 'whats-included', 'specs'];

  return (
    <>
      <div className="container">
        <nav style={{ fontSize: '.8rem', color: 'var(--text-muted)', padding: '1.5rem 0 0', display: 'flex', gap: '.5rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          <span>/</span>
          <Link to="/collections/all" style={{ color: 'var(--text-muted)' }}>All Toys</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink-navy)', fontWeight: 500 }}>{product.name}</span>
        </nav>

        <div className="pdp-wrap">
          {/* Gallery */}
          <div className="pdp-gallery">
            <img
              className="pdp-main-img"
              src={images[activeImg]}
              alt={product.name}
              onError={e => { e.target.onerror = null; e.target.style.background = 'linear-gradient(135deg,#FFD97D,#FF9F7F)'; e.target.src = ''; }}
            />
            {images.length > 1 && (
              <div className="pdp-thumbs">
                {images.slice(0, 5).map((img, i) => (
                  <div key={i} className={`pdp-thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`view ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buy Panel */}
          <div className="pdp-buy">
            {product.category && (
              <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--marker-coral)' }}>
                {product.category}
              </span>
            )}
            <h1 className="pdp-title">{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{ display: 'flex', gap: '.1rem', color: 'var(--crayon-marigold)' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>4.9 (128 reviews)</span>
            </div>

            <div className="pdp-price-row">
              <span className="pdp-price">${Number(product.price).toFixed(2)}</span>
              {product.compareAtPrice && <span className="pdp-was">${Number(product.compareAtPrice).toFixed(2)}</span>}
              {savings > 0 && <span className="pdp-save">Save {savings}%</span>}
            </div>

            {product.shortDescription && (
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '.9375rem' }}>{product.shortDescription}</p>
            )}

            <div>
              <p style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Quantity</p>
              <div className="pdp-add-row">
                <div className="qty-stepper">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
                <button className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }} onClick={handleAdd}>
                  {added ? '✓ Added to Bag!' : 'Add to Bag'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem', padding: '1.25rem', background: 'var(--bg-subtle)', borderRadius: 'var(--r-lg)' }}>
              {[
                { icon: '🛡️', text: 'Safety certified' },
                { icon: '🚚', text: 'Free shipping $50+' },
                { icon: '↩️', text: '30-day returns' },
                { icon: '🎁', text: 'Gift wrapping' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.8rem', color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: '1rem' }}>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>

            <div className="pdp-tabs">
              <div className="tab-nav">
                {TABS.map(tab => (
                  <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab === 'whats-included' ? "What's Included" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {activeTab === 'description' && (
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '.9375rem' }}>
                  {product.description || product.shortDescription || 'A wonderful toy for curious kids.'}
                </div>
              )}
              {activeTab === 'features' && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {(product.features || ['Screen-free interactive play', 'Builds critical thinking', 'Safe and durable']).map((f, i) => (
                    <li key={i} style={{ display: 'flex', gap: '.75rem', color: 'var(--text-secondary)', fontSize: '.9375rem' }}>
                      <span style={{ color: 'var(--sprout-teal)', fontWeight: 700 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'whats-included' && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                  {(product.whatsIncluded || ['Main product', 'Instruction guide']).map((w, i) => (
                    <li key={i} style={{ display: 'flex', gap: '.75rem', color: 'var(--text-secondary)', fontSize: '.9375rem' }}>
                      <span style={{ color: 'var(--sky-periwinkle)' }}>•</span>{w}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'specs' && product.specifications && (
                <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '.5rem 2rem' }}>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} style={{ display: 'contents' }}>
                      <dt style={{ fontWeight: 600, color: 'var(--ink-navy)', fontSize: '.875rem' }}>{k}</dt>
                      <dd style={{ color: 'var(--text-secondary)', fontSize: '.875rem' }}>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="products-section" style={{ background: 'var(--bg-subtle)', paddingTop: '4rem' }}>
          <div className="container">
            <div className="products-header">
              <div>
                <span className="section-eyebrow">You might also love</span>
                <h2 className="section-title">Related <span className="teal">Toys</span></h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
