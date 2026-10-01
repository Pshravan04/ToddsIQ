import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Plus } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addItem, setIsCartOpen } = useCart();
  const {
    id, title, name, price, compareAtPrice, images, thumbnail, image,
    badge, rating = 4.8, reviewCount = 128, isNew, ageBand, description
  } = product;

  // Fallbacks for updated products.json schema
  const displayTitle = title || name;
  const img = images?.[0] || thumbnail || image;
  const savings = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
  
  const displayBadge = badge || (savings > 0 ? `SAVE ${savings}%` : isNew ? 'NEW' : null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name: displayTitle, price, image: img });
    setIsCartOpen(true);
  };

  return (
    <Link to={`/products/${id}`} className="bg-white rounded-3xl p-4 border border-ink/10 shadow-card flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lift transition-all duration-300 cursor-pointer">
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-canvas aspect-square">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={img} alt={displayTitle} loading="lazy" />
          
          {displayBadge && (
            <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-marigold text-ink border-2 border-ink text-xs font-bold tracking-wide uppercase shadow-[2px_2px_0px_#1E2A38]">
              {displayBadge}
            </span>
          )}
          
          {ageBand && (
            <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-ink text-xs font-bold shadow-sm">
              Ages {ageBand}
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5 pt-1 mb-1">
            <div className="flex text-marigold">
               <Star size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-ink">{Number(rating).toFixed(1)}</span>
            <span className="text-xs text-ink/50">({product.reviews || reviewCount})</span>
          </div>
          <h3 className="font-display font-semibold text-xl text-ink leading-tight">{displayTitle}</h3>
          {description && (
             <p className="text-sm text-ink/70 line-clamp-2 mt-2 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className="pt-5 mt-5 border-t border-ink/10 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-coral leading-none">${Number(price).toFixed(2)}</span>
          {compareAtPrice && <span className="text-sm text-ink/40 line-through">${Number(compareAtPrice).toFixed(2)}</span>}
        </div>
        <button className="w-10 h-10 rounded-full bg-marigold text-ink border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center transition-all" onClick={handleAddToCart} title="Quick Add">
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>
    </Link>
  );
}