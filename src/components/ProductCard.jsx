import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addItem, setIsCartOpen } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  
  const {
    id, slug, title, name, price, compareAtPrice, images, thumbnail, image,
    badge, rating = 4.8, reviewCount = 128, isNew, ageBand, description, options
  } = product;

  const displayTitle = title || name;
  const img = images?.[0] || thumbnail || image;
  const imgHover = images?.[1] || img;
  const savings = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
  
  const displayBadge = badge || (savings > 0 ? `SAVE ${savings}%` : isNew ? 'NEW' : null);
  const routeParam = slug || id;

  const hasVariants = options && options.length > 0 && options[0].values && options[0].values.length > 1;

  const handleCTA = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasVariants) {
      navigate(`/products/${routeParam}`);
    } else {
      addItem({ id, name: displayTitle, price, image: img });
      setIsCartOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      className="h-full flex flex-col"
    >
      <Link to={`/products/${routeParam}`} className="bg-white rounded-3xl p-4 border border-ink/10 shadow-sm flex flex-col justify-between group hover:-translate-y-1 hover:shadow-card transition-all duration-300 cursor-pointer h-full relative">
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-canvas aspect-square">
            {/* Primary Image */}
            <img className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500 absolute inset-0 z-10" src={img} alt={displayTitle} loading="lazy" />
            {/* Hover Image */}
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0 z-0" src={imgHover} alt={displayTitle} loading="lazy" />
            
            {displayBadge && (
              <span className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full bg-marigold text-ink border border-ink/10 text-xs font-bold tracking-wide uppercase shadow-sm">
                {displayBadge}
              </span>
            )}
            
            {ageBand && (
              <span className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-white text-ink border border-ink/10 text-xs font-bold shadow-sm">
                Ages {ageBand}
              </span>
            )}
            
            {/* Quick action button overlaid on hover */}
            <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
               <button onClick={handleCTA} className="w-[90%] py-2.5 rounded-xl bg-coral hover:bg-coral-fixed text-canvas font-display font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-transform">
                 ADD TO CART
               </button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 pt-1 mb-1">
              <div className="flex text-marigold">
                 <Star size={14} fill="currentColor" strokeWidth={1} />
                 <Star size={14} fill="currentColor" strokeWidth={1} />
                 <Star size={14} fill="currentColor" strokeWidth={1} />
                 <Star size={14} fill="currentColor" strokeWidth={1} />
                 <Star size={14} fill="currentColor" strokeWidth={1} />
              </div>
              <span className="text-xs font-bold text-ink">{Number(rating).toFixed(1)}</span>
              <span className="text-xs text-ink/50">({product.reviews || reviewCount})</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-ink leading-tight">{displayTitle}</h3>
            {hasVariants && (
              <p className="text-xs font-bold text-ink/60 mt-1.5 uppercase tracking-wide">
                + {options[0].values.length} {options[0].name.toLowerCase()}s
              </p>
            )}
            {description && (
               <p className="text-xs text-ink-muted line-clamp-2 mt-2 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-1.5 flex-col shrink-0">
            <span className="font-display text-xl font-bold text-coral leading-none">{formatPrice(price)}</span>
            {compareAtPrice && <span className="text-xs text-ink-muted line-through font-semibold">{formatPrice(compareAtPrice)}</span>}
          </div>
          <button 
            onClick={handleCTA}
            className="px-4 py-2.5 bg-coral text-canvas font-label-md text-sm font-bold rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E2A38] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-center uppercase tracking-wide whitespace-nowrap"
          >
            Buy Now
          </button>
        </div>
      </Link>
    </motion.div>
  );
}