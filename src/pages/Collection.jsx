import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const COLLECTION_MAP = {
  'all':          { title: 'All Toys', sub: 'Explore every toy in the ToddsIQ catalog.', category: null },
  'best-sellers': { title: 'Best Sellers', sub: 'The toys parents (and kids) love most.', category: 'Best Sellers' },
  'toddler':      { title: 'Toddler Play (1-3)', sub: 'Sensory exploration, first strokes, tactile discovery.', category: 'Toddler' },
  'preschool':    { title: 'Preschool & Pre-K (3-5)', sub: 'Guided drawing mentors, early phonics mastery, spatial logic.', category: 'Preschool' },
  'big-kids':     { title: 'Big Kids & Explorers (5+)', sub: 'Multi-level track physics, microscopes, and building sets.', category: 'Big Kids' },
};

const FILTERS = ['All', 'STEM & Learning', 'Arts & Crafts', 'Building', 'Reading', 'Sensory'];
const SORTS = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];

export default function Collection() {
  const { id } = useParams();
  const info = COLLECTION_MAP[id] || { title: (id || 'All').replace(/-/g, ' ').toUpperCase(), sub: '', category: null };
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('Featured');

  // Filter by Collection
  let products = [...productsData];
  if (info.category) {
    products = products.filter(p => p.categories && p.categories.includes(info.category));
  }

  // Sub-filter by Tag
  if (activeFilter !== 'All') {
    products = products.filter(p => p.categories && p.categories.map(c => c.toUpperCase()).includes(activeFilter.toUpperCase()));
  }

  // Sort
  if (sort === 'Price: Low–High') products.sort((a, b) => a.price - b.price);
  if (sort === 'Price: High–Low') products.sort((a, b) => b.price - a.price);

  return (
    <div className="w-full bg-surface min-h-screen">
      {/* Banner */}
      <div className="w-full bg-surface-container-low pt-24 pb-16 border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-gutter text-center">
          <nav className="flex justify-center items-center gap-2 text-sm text-on-surface-variant font-label-md mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[1rem]">chevron_right</span>
            <span className="text-on-surface font-bold">{info.title}</span>
          </nav>
          <h1 className="font-display-hero text-4xl md:text-5xl text-on-surface font-black tracking-tight">{info.title}</h1>
          {info.sub && <p className="font-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">{info.sub}</p>}
          <p className="font-label-md text-primary mt-6">{products.length} products</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="w-full bg-surface border-b border-outline-variant sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-gutter py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
            {FILTERS.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-2 rounded-full font-label-md border transition-all ${
                  activeFilter === f 
                  ? 'bg-on-surface text-surface border-on-surface' 
                  : 'bg-surface text-on-surface-variant border-outline-variant hover:border-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center shrink-0 w-full md:w-auto">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">sort</span>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="bg-surface border border-outline-variant rounded-lg px-4 py-2 text-sm font-label-md text-on-surface outline-none focus:border-primary"
            >
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-gutter py-space-xl">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">search_off</span>
            <p className="font-headline-md text-on-surface mb-2">No products found</p>
            <p className="font-body-md text-on-surface-variant">
              Try a different filter or <Link to="/collections/all" className="text-primary font-bold hover:underline">view all toys</Link>.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
