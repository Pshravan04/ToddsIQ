const fs = require('fs');
const oldCode = fs.readFileSync('src/pages/Product.jsx', 'utf-8');

// The file is huge. We want to replace the first section up to `<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">` (which is the WHY THIS MATTERS section).
const splitMarker = `<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">`;

let bottomPart = '';
if (oldCode.includes(splitMarker)) {
  bottomPart = splitMarker + oldCode.split(splitMarker)[1];
} else {
  console.log("Could not find split marker!");
  process.exit(1);
}

const topPart = `import { FadeInUp } from '../components/AnimatedSection';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

export default function Product() {
  const { id, slug } = useParams();
  const { addItem, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  
  const routeParam = slug || id;
  const product = productsData.find(p => p.id === routeParam || (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === routeParam)) || productsData[0];
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const displayImages = product.images?.length > 0 ? product.images : (product.thumbnail ? [product.thumbnail] : ['https://via.placeholder.com/600']);
  const [activeImage, setActiveImage] = useState(displayImages[0]);

  const hasVariants = product.options && product.options.length > 0 && product.options[0].values && product.options[0].values.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(0);

  const finalPrice = product.price;
  const finalCompare = product.compareAtPrice;
  const savings = finalCompare ? Math.round(((finalCompare - finalPrice) / finalCompare) * 100) : 0;

  const ctaRef = useRef(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(displayImages[0]);
    setQty(1);
    setSelectedVariant(0);
  }, [routeParam, product.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    return () => observer.disconnect();
  }, [product.id]);

  const handleAddToCart = () => {
    const variantName = hasVariants ? ' - ' + product.options[0].values[selectedVariant] : '';
    addItem({
      ...product,
      id: hasVariants ? \`\${product.id}-\${selectedVariant}\` : product.id,
      name: product.title + variantName,
      price: finalPrice,
      image: activeImage
    }, qty);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  const handleBuyNow = () => {
     handleAddToCart();
     setTimeout(() => {
       navigate('/checkout');
     }, 300);
  };

  return (
    <div className="flex flex-col w-full bg-canvas relative">
      
      {/* STICKY BUY BAR (Desktop & Mobile) */}
      <div className={\`fixed \${showSticky ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full lg:-translate-y-full opacity-0 pointer-events-none'} transition-all duration-300 z-50 bottom-0 lg:bottom-auto lg:top-0 left-0 w-full bg-white border-t lg:border-b lg:border-t-0 border-ink/10 shadow-lift py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between\`}>
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border border-ink/10 overflow-hidden bg-canvas hidden sm:block">
               <img src={activeImage} className="w-full h-full object-cover" alt={product.title} />
            </div>
            <div>
               <h4 className="font-display font-bold text-ink text-sm lg:text-base line-clamp-1">{product.title}</h4>
               <p className="text-coral font-bold text-sm">$\${Number(finalPrice).toFixed(2)}</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button onClick={handleAddToCart} className="hidden sm:flex px-6 py-2.5 rounded-full bg-coral/10 text-coral font-bold text-sm hover:bg-coral/20 transition-colors">Add to Cart</button>
            <button onClick={handleBuyNow} className="px-6 py-2.5 rounded-full bg-marigold text-ink font-bold text-sm shadow-[2px_2px_0px_#1E2A38] border-2 border-ink hover:translate-y-0.5 hover:shadow-none transition-all">Buy Now</button>
         </div>
      </div>

      <div className="w-full bg-[#F4EFE6] border-b border-ink/5 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-ink-muted">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-teal font-bold bg-teal/10 px-2.5 py-0.5 rounded-full">Ages {product.ageBand || '3-8'}</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-ink font-bold">{product.title}</span>
          </div>
        </div>
      </div>

      <FadeInUp>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: GALLERY */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-white rounded-3xl p-6 sm:p-10 border-2 border-ink shadow-card flex items-center justify-center overflow-hidden">
                {savings > 0 && (
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral text-canvas border-2 border-ink font-bold text-xs shadow-[2px_2px_0px_#1E2A38]">
                      Save {savings}%
                    </span>
                  </div>
                )}
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img alt={product.title} className="max-w-full max-h-full object-contain transition-all duration-300 transform scale-100 hover:scale-105 select-none" src={activeImage}/>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {displayImages.map((imgUrl, idx) => (
                  <button key={idx} onClick={() => setActiveImage(imgUrl)} className={\`gallery-thumb p-1.5 rounded-2xl bg-white border-2 shadow-sm transition-transform hover:-translate-y-1 \${activeImage === imgUrl ? 'border-coral' : 'border-ink/15'}\`}>
                    <div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
                      <img alt={\`\${product.title} thumbnail \${idx}\`} className="w-full h-full object-cover" src={imgUrl}/>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILS */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink shadow-lift flex flex-col gap-6 relative">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-marigold text-base">
                      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                      <span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    </div>
                    <span className="font-display font-bold text-ink text-base">{Number(product.rating || 4.9).toFixed(1)}</span>
                    <span className="text-xs text-ink-muted">({product.reviews || 128} reviews)</span>
                  </div>
                </div>

                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                    {product.title}
                  </h1>
                  <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                    {product.description || "The gentle cognitive tutor that turns playtime into achievable, milestone-driven progression."}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-canvas p-4 rounded-2xl border border-ink/10 flex flex-col gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-3xl sm:text-4xl font-black text-coral">$\${Number(finalPrice).toFixed(2)}</span>
                    {finalCompare && <span className="text-lg text-ink-light line-through font-semibold">$\${Number(finalCompare).toFixed(2)}</span>}
                    {savings > 0 && <span className="bg-marigold text-ink border-2 border-ink font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wide">Save {savings}%</span>}
                  </div>
                </div>

                {/* Variants if any */}
                {hasVariants && (
                  <div className="flex flex-col gap-3">
                    <span className="font-display text-sm font-bold text-ink">{product.options[0].name}:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.options[0].values.map((v, i) => (
                        <button key={i} onClick={() => setSelectedVariant(i)} className={\`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all \${selectedVariant === i ? 'bg-coral/10 border-coral text-coral shadow-sm' : 'bg-white border-ink/10 text-ink hover:border-ink/30'}\`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qty & Add to Cart CTA */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-canvas rounded-2xl border-2 border-ink p-1">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-ink hover:bg-black/5 rounded-xl text-xl">−</button>
                      <span className="w-10 text-center font-display font-bold text-base">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-ink hover:bg-black/5 rounded-xl text-xl">+</button>
                    </div>
                    
                    <button ref={ctaRef} onClick={handleAddToCart} className="flex-1 py-4 px-4 rounded-2xl bg-marigold hover:opacity-90 text-ink font-display text-lg font-bold flex items-center justify-center gap-2 border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                      <span className="material-symbols-outlined text-xl">{added ? 'check' : 'shopping_bag'}</span>
                      <span>{added ? 'Added to Bag!' : 'Add to Cart'}</span>
                    </button>
                  </div>
                  
                  <button onClick={handleBuyNow} className="w-full py-3.5 rounded-2xl bg-coral text-white font-display text-lg font-bold border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                     Buy It Now
                  </button>
                </div>

                {/* Reassurance */}
                <div className="pt-2 border-t border-ink/10 grid grid-cols-3 gap-2 text-center text-xs text-ink-muted font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-teal text-xl">verified_user</span>
                    <span>30-Day Trial</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-coral text-xl">local_shipping</span>
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-periwinkle text-xl">eco</span>
                    <span>Kid Safe</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </FadeInUp>
`;

fs.writeFileSync('src/pages/Product.jsx', topPart + '\\n' + bottomPart);
console.log("Product.jsx rewritten successfully");
