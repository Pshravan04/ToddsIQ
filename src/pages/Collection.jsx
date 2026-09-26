import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const COLLECTION_MAP = {
  'all':          { title: 'All Toys',         sub: 'Explore every toy in the ToddsIQ catalog.' },
  'new':          { title: 'New Arrivals',      sub: "Fresh off the workshop — what's just landed." },
  'best-sellers': { title: 'Best Sellers',      sub: 'The toys parents (and kids) love most.' },
  'gifts':        { title: 'Gift Sets',         sub: 'Perfectly curated bundles for every occasion.' },
  'sale':         { title: 'Sale 🔥',            sub: 'Great toys at even better prices.' },
  'tiny-tots':    { title: 'Tiny Tots (0–18m)', sub: 'Safe, sensory-rich toys for youngest explorers.' },
  'toddlers':     { title: 'Toddlers',          sub: 'Active, hands-on play for curious toddlers.' },
  'pre-k':        { title: 'Pre-K (3–5)',        sub: 'Building blocks of learning for little minds.' },
  'big-kids':     { title: 'Big Kids (6–12)',    sub: 'STEM, crafts, and adventures for growing kids.' },
};

const FILTERS = ['All', 'ARTS & CRAFTS', 'STEM & SCIENCE', 'BUILDING', 'READING', 'SENSORY'];
const SORTS = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];

export default function Collection() {
  const { id } = useParams();
  const info = COLLECTION_MAP[id] || { title: (id || 'All').replace(/-/g, ' ').toUpperCase(), sub: '' };
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('Featured');

  let products = [...productsData];
  if (activeFilter !== 'All') products = products.filter(p => (p.category || '').toUpperCase() === activeFilter);
  if (sort === 'Price: Low–High') products.sort((a, b) => a.price - b.price);
  if (sort === 'Price: High–Low') products.sort((a, b) => b.price - a.price);

  return (
    <>
      <div className="collection-banner" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <nav style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', gap: '.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink-navy)', fontWeight: 500 }}>{info.title}</span>
          </nav>
          <h1 className="section-title">{info.title}</h1>
          {info.sub && <p className="section-sub" style={{ marginTop: '.5rem' }}>{info.sub}</p>}
          <p style={{ marginTop: '.75rem', fontSize: '.85rem', color: 'var(--text-muted)' }}>{products.length} products</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="container">
          <div className="filter-bar-inner">
            {FILTERS.map(f => (
              <button key={f} className={`filter-chip${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <section className="products-section">
        <div className="container">
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--ink-navy)' }}>No products found</p>
              <p style={{ marginTop: '.5rem' }}>
                Try a different filter or{' '}
                <Link to="/collections/all" style={{ color: 'var(--marker-coral)' }}>view all toys</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
