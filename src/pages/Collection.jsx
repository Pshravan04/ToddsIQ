import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/shopify/products';
import { ChevronRight, Filter, Frown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLLECTION_MAP = {
  'all':          { title: 'All Toys', sub: 'Explore every toy in the ToddsIQ catalog.', category: null },
  'best-sellers': { title: 'Best Sellers', sub: 'The toys parents (and kids) love most.', category: 'Best Sellers' },
  'toddler':      { title: 'Toddler Play (1-3)', sub: 'Sensory exploration, first strokes, tactile discovery.', category: 'Toddler' },
  'preschool':    { title: 'Preschool & Pre-K (3-5)', sub: 'Guided drawing mentors, early phonics mastery, spatial logic.', category: 'Preschool' },
  'big-kids':     { title: 'Big Kids & Explorers (5+)', sub: 'Multi-level track physics, microscopes, and building sets.', category: 'Big Kids' },
  'toddler-toys-ages-1-3': { title: 'Toddler Play (1-3)', sub: 'Sensory exploration, first strokes, tactile discovery.', category: 'Toddler' },
  'preschool-toys-ages-3-5': { title: 'Preschool & Pre-K (3-5)', sub: 'Guided drawing mentors, early phonics mastery, spatial logic.', category: 'Preschool' },
  'big-kids-ages-5': { title: 'Big Kids & Explorers (5+)', sub: 'Multi-level track physics, microscopes, and building sets.', category: 'Big Kids' },
};

const FILTERS = ['All', 'STEM & Learning', 'Arts & Crafts', 'Building', 'Reading', 'Sensory'];
const SORTS = ['Featured', 'Price: Low–High', 'Price: High–Low', 'Newest'];

export default function Collection() {
  const { id } = useParams();
  const info = COLLECTION_MAP[id] || { title: (id || 'All').replace(/-/g, ' ').toUpperCase(), sub: '', category: null };
  const [activeFilter, setActiveFilter] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts(50);
      setProductsData(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  // Filter by Collection
  let products = [...productsData];
  if (info.category) {
    products = products.filter(p => p.categories && p.categories.includes(info.category));
  } else if (id && !COLLECTION_MAP[id]) {
     // If user passed some arbitrary collection name in URL that isn't mapped, try to match by category anyway
     products = products.filter(p => p.categories && p.categories.some(c => c.toLowerCase().includes(id.toLowerCase())));
  }

  // Sub-filter by Tag
  if (activeFilter !== 'All') {
    products = products.filter(p => p.categories && p.categories.map(c => c.toUpperCase()).includes(activeFilter.toUpperCase()));
  }

  // Sort
  if (sort === 'Price: Low–High') products.sort((a, b) => a.price - b.price);
  if (sort === 'Price: High–Low') products.sort((a, b) => b.price - a.price);

  return (
    <div className="w-full bg-canvas min-h-screen">
      {/* Banner */}
      <div className="w-full bg-white pt-24 pb-16 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-gutter text-center">
          <nav className="flex justify-center items-center gap-2 text-xs font-bold tracking-widest text-ink/60 uppercase mb-6">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <ChevronRight size={14} className="text-ink/30" />
            <span className="text-ink">{info.title}</span>
          </nav>
          <h1 className="font-display text-5xl md:text-6xl text-ink leading-tight mb-4">{info.title}</h1>
          {info.sub && <p className="text-lg text-ink/70 max-w-2xl mx-auto">{info.sub}</p>}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="w-full bg-white border-b border-ink/10 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-gutter py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative flex w-full md:w-auto">
             <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 scrollbar-hide">
               {FILTERS.map(f => (
                 <button 
                   key={f} 
                   onClick={() => setActiveFilter(f)}
                   className={`relative z-10 shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                     activeFilter === f 
                     ? 'text-canvas border-ink shadow-[2px_2px_0px_#1E2A38]' 
                     : 'bg-[#F4F1EA] text-ink border-transparent hover:border-ink'
                   }`}
                 >
                   {activeFilter === f && (
                     <motion.div layoutId="filterPill" className="absolute inset-0 bg-coral rounded-full -z-10 border-2 border-ink" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                   )}
                   {f}
                 </button>
               ))}
             </div>
          </div>
          
          <div className="flex items-center shrink-0 w-full md:w-auto gap-4">
            <span className="text-sm font-bold text-ink/60 hidden md:block whitespace-nowrap">{products.length} products</span>
            <div className="flex items-center border border-ink/10 rounded-full px-4 py-1.5 bg-canvas hover:border-ink/20 transition-colors">
              <Filter size={16} className="text-ink/60 mr-2" />
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="bg-transparent text-sm font-bold text-ink outline-none cursor-pointer appearance-none pr-4"
            >
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-gutter py-16">
        {products.length > 0 ? (
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                 <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-ink/10 shadow-sm max-w-2xl mx-auto mt-10">
            <Frown className="w-16 h-16 text-ink/20 mx-auto mb-4" />
            <p className="font-display text-2xl text-ink mb-2">No products found</p>
            <p className="text-ink/60 mb-6">
              Try removing filters or exploring our full collection.
            </p>
            <Link to="/collections/all" className="inline-flex h-12 items-center justify-center rounded-xl bg-coral/20 text-canvas border-2 border-ink shadow-[4px_4px_0px_#1E2A38] px-8 font-bold hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">Shop All Toys</Link>
          </div>
        )}
      </section>
    </div>
  );
}
