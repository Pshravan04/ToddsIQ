import { FadeInUp } from '../components/AnimatedSection';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductByHandle } from '../services/shopify/products';
import drawingRobotImg from '../assets/drawing_companion_robot.jpg';
import creativeRobotImg from '../assets/creative_potential_robot.jpg';
import heroToysBannerImg from '../assets/hero_toys_banner.jpg';

export default function Product() {
  const { id, slug } = useParams();
  const { addItem, setIsCartOpen, checkoutUrl } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  
  const routeParam = slug || id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState('');
  
  // Track selected options as { [optionName]: optionValue }
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const data = await getProductByHandle(routeParam);
      setProduct(data);
      if (data) {
        const displayImages = data.images?.length > 0 ? data.images : (data.thumbnail ? [data.thumbnail] : ['https://via.placeholder.com/600']);
        setActiveImage(displayImages[0]);
        
        // Initialize selected options with the first available variant's options, or just the first variant
        const defaultVariant = data.variants?.find(v => v.availableForSale) || data.variants?.[0];
        if (defaultVariant && defaultVariant.selectedOptions) {
          const initialOptions = {};
          defaultVariant.selectedOptions.forEach(opt => {
             initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      }
      setLoading(false);
    }
    fetchProduct();
    window.scrollTo(0, 0);
    setQty(1);
    setSelectedOptions({});
  }, [routeParam]);

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
  }, [product?.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading product...</p></div>;
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <span className="material-symbols-outlined text-6xl text-ink-muted mb-4">inventory_2</span>
        <h2 className="text-3xl font-display font-extrabold text-ink mb-2">Product Not Found</h2>
        <p className="text-ink-muted mb-8 max-w-sm text-center">
          The product you are looking for may have been removed or the link is incorrect.
        </p>
        <Link to="/" className="px-8 py-3 rounded-full bg-coral text-white font-bold hover:bg-coral-fixed transition-colors shadow-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  const displayImages = product.images?.length > 0 ? product.images : (product.thumbnail ? [product.thumbnail] : ['https://via.placeholder.com/600']);
  const hasVariants = product.options && product.options.length > 0 && product.options[0].values && product.options[0].values.length > 0;
  
  // Find the actual Shopify variant that matches current selected options
  const selectedVariant = product.variants?.find(v => {
    return v.selectedOptions.every(so => selectedOptions[so.name] === so.value);
  }) || product.variants?.[0];

  const finalPrice = selectedVariant?.price ?? product.price;
  const finalCompare = selectedVariant?.compareAtPrice ?? product.compareAtPrice;
  const savings = finalCompare && finalCompare > finalPrice ? Math.round(((finalCompare - finalPrice) / finalCompare) * 100) : 0;
  
  // Update image if variant has its own image in the selection handler instead

  const handleAddToCart = async () => {
    const variantId = selectedVariant?.id || product.id;
    await addItem(product, qty, variantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  const handleBuyNow = async () => {
     await handleAddToCart();
     if (checkoutUrl) {
       window.location.href = checkoutUrl;
     } else {
       setIsCartOpen(true);
     }
  };

  return (
    <div className="flex flex-col w-full bg-canvas relative">
      
      {/* STICKY BUY BAR (Desktop & Mobile) */}
      <div className={`fixed ${showSticky ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full lg:-translate-y-full opacity-0 pointer-events-none'} transition-all duration-300 z-50 bottom-0 lg:bottom-auto lg:top-0 left-0 w-full bg-white border-t lg:border-b lg:border-t-0 border-ink/10 shadow-lift py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between`}>
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg border border-ink/10 overflow-hidden bg-canvas hidden sm:block">
               <img src={activeImage} className="w-full h-full object-cover" alt={product.title} />
            </div>
            <div>
               <h4 className="font-display font-bold text-ink text-sm lg:text-base line-clamp-1">{product.title}</h4>
               <p className="text-coral font-bold text-sm">{formatPrice(finalPrice)}</p>
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
                  <button key={idx} onClick={() => setActiveImage(imgUrl)} className={`gallery-thumb p-1.5 rounded-2xl bg-white border-2 shadow-sm transition-transform hover:-translate-y-1 ${activeImage === imgUrl ? 'border-coral' : 'border-ink/15'}`}>
                    <div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
                      <img alt={`${product.title} thumbnail ${idx}`} className="w-full h-full object-cover" src={imgUrl}/>
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
                  <div className="text-sm text-ink-muted mt-3 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description || "The gentle cognitive tutor that turns playtime into achievable, milestone-driven progression." }} />
                </div>

                {/* Price */}
                <div className="bg-canvas p-4 rounded-2xl border border-ink/10 flex flex-col gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-display text-3xl sm:text-4xl font-black text-coral">{formatPrice(finalPrice)}</span>
                    {finalCompare && <span className="text-lg text-ink-light line-through font-semibold">{formatPrice(finalCompare)}</span>}
                    {savings > 0 && <span className="bg-marigold text-ink border-2 border-ink font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wide">Save {savings}%</span>}
                  </div>
                </div>

                {/* Variants if any */}
                {hasVariants && (
                  <div className="flex flex-col gap-5">
                    {product.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-bold text-ink">{opt.name}:</span>
                          {opt.name.includes("STEM Set") && <span className="text-xs font-bold text-coral uppercase tracking-wide bg-coral/10 px-2 py-0.5 rounded-md">Flash sale ends 14:45</span>}
                        </div>
                        
                        {opt.subtitles ? (
                          <div className="flex flex-col gap-2.5">
                            {opt.values.map((v, i) => {
                               const isSelected = selectedOptions[opt.name] === v;
                               
                               const hypotheticalVariant = product.variants?.find(variant => 
                                 variant.selectedOptions.every(so => 
                                   so.name === opt.name ? so.value === v : so.value === selectedOptions[so.name]
                                 )
                               );
                               
                               const price = hypotheticalVariant?.price ?? (opt.prices ? opt.prices[i] : null);
                               const compPrice = hypotheticalVariant?.compareAtPrice ?? (opt.compareAtPrices ? opt.compareAtPrices[i] : null);
                               
                               return (
                                 <button key={i} onClick={() => {
                                   setSelectedOptions({...selectedOptions, [opt.name]: v});
                                   if (hypotheticalVariant?.image) {
                                     setActiveImage(hypotheticalVariant.image);
                                   } else if (optIndex === 0 && displayImages[i]) {
                                     setActiveImage(displayImages[i]);
                                   }
                                 }} className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${isSelected ? 'bg-coral/5 border-coral shadow-[2px_2px_0px_#1E2A38]' : 'bg-white border-ink/10 hover:border-ink/30 hover:shadow-sm'}`}>
                                   {opt.badges && opt.badges[i] && (
                                     <div className="absolute top-0 right-0 bg-marigold text-ink text-[10px] font-bold px-3 py-1 rounded-bl-xl border-b-2 border-l-2 border-ink">{opt.badges[i]}</div>
                                   )}
                                   <div className="flex items-start justify-between gap-4 w-full">
                                     <div className="flex flex-col gap-1">
                                       <span className="font-display font-bold text-base text-ink flex items-center gap-1.5">{opt.icons && opt.icons[i]} {v}</span>
                                       <span className="text-xs text-ink-muted pr-12">{opt.subtitles[i]}</span>
                                     </div>
                                     <div className="flex flex-col items-end text-right min-w-[70px]">
                                       {price != null && <span className={`font-display font-bold text-lg ${isSelected ? 'text-coral' : 'text-ink'}`}>${price.toFixed(2)}</span>}
                                       {compPrice != null && <span className="text-xs text-ink-light line-through font-semibold">${compPrice.toFixed(2)}</span>}
                                     </div>
                                   </div>
                                 </button>
                               )
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {opt.values.map((v, i) => {
                              const isSelected = selectedOptions[opt.name] === v;
                              
                              const hypotheticalVariant = product.variants?.find(variant => 
                                variant.selectedOptions.every(so => 
                                  so.name === opt.name ? so.value === v : so.value === selectedOptions[so.name]
                                )
                              );
                              
                              return (
                                <button key={i} onClick={() => {
                                   setSelectedOptions({...selectedOptions, [opt.name]: v});
                                   if (hypotheticalVariant?.image) {
                                     setActiveImage(hypotheticalVariant.image);
                                   } else if (optIndex === 0 && displayImages[i]) {
                                     setActiveImage(displayImages[i]);
                                   }
                                 }} className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${isSelected ? 'bg-coral/10 border-coral text-coral shadow-sm' : 'bg-white border-ink/10 text-ink hover:border-ink/30'}`}>
                                  {v}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
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

<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
<div className="text-center max-w-2xl mx-auto mb-8">
<span className="text-teal font-display font-bold text-xs uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full">Developmental Benchmark</span>
<h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink mt-2">
          Engineered for Real Physical Milestone Progression
        </h2>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Tile 1: Periwinkle */}
<div className="bg-[#6C8EF5]/10 border-2 border-[#6C8EF5]/30 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-card transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-white border-2 border-periwinkle flex items-center justify-center mb-4 shadow-sm">
<span className="material-symbols-outlined text-2xl text-periwinkle">front_hand</span>
</div>
<h3 className="font-display text-lg font-bold text-ink">Pincer-Grasp Stability</h3>
<p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Ergonomic triangular markers guide thumb, index, and middle finger placement into the tripod grip required for primary grade handwriting.
            </p>
</div>
<span className="text-xs font-bold text-periwinkle mt-4 inline-flex items-center gap-1">OT Guideline 2.4 <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
</div>
{/* Tile 2: Marigold */}
<div className="bg-[#FFB627]/10 border-2 border-[#FFB627]/30 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-card transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-white border-2 border-marigold flex items-center justify-center mb-4 shadow-sm">
<span className="material-symbols-outlined text-2xl text-marigold">palette</span>
</div>
<h3 className="font-display text-lg font-bold text-ink">Mess-Free Stroke Guidance</h3>
<p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Water-based vegetable dye ink rinses effortlessly from skin, cotton clothes, and table surfaces with warm tap water. Zero stress cleanup.
            </p>
</div>
<span className="text-xs font-bold text-marigold mt-4 inline-flex items-center gap-1">Ultra-Washable <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
</div>
{/* Tile 3: Teal */}
<div className="bg-[#1F9D8A]/10 border-2 border-[#1F9D8A]/30 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-card transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-white border-2 border-teal flex items-center justify-center mb-4 shadow-sm">
<span className="material-symbols-outlined text-2xl text-teal">phonelink_off</span>
</div>
<h3 className="font-display text-lg font-bold text-ink">100% Screen-Free Focus</h3>
<p className="text-xs text-ink-muted mt-2 leading-relaxed">
              No blue light, no algorithmic loops, no microphone or cloud accounts. Gentle speech synthesis cues child patience and tactile persistence.
            </p>
</div>
<span className="text-xs font-bold text-teal mt-4 inline-flex items-center gap-1">Zero Digital Clutter <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
</div>
{/* Tile 4: Coral */}
<div className="bg-[#FF6154]/10 border-2 border-[#FF6154]/30 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-card transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-white border-2 border-coral flex items-center justify-center mb-4 shadow-sm">
<span className="material-symbols-outlined text-2xl text-coral">menu_book</span>
</div>
<h3 className="font-display text-lg font-bold text-ink">150 Offline Progressive Lessons</h3>
<p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Systematic curriculum spanning animals, letters, phonics sound-maps, and geometry that grow gracefully from toddlerhood to early elementary.
            </p>
</div>
<span className="text-xs font-bold text-coral mt-4 inline-flex items-center gap-1">Pre-K to Grade 2 <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
</div>
</div>
</section></FadeInUp>
{/* INTERACTIVE SLIDING PILL TABS SECTION */}
<FadeInUp><section className="w-full py-12 bg-white border-y border-ink/10" id="tabs-section">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Tab Navigation Bar (Responsive: Dropdown on Mobile, Pills on Desktop) */}
<div className="w-full flex justify-center mb-10 px-4 md:px-0">
  {/* Mobile Dropdown */}
  <div className="w-full md:hidden relative">
    <select 
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value)}
      className="w-full appearance-none bg-canvas border-2 border-ink text-ink font-display font-bold text-sm rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1E2A38] focus:outline-none"
    >
      <option value="overview">Overview</option>
      <option value="included">What's Included</option>
      <option value="steps">Steps</option>
      <option value="clinical">Clinical Benefits</option>
      <option value="safety">Age &amp; Safety</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
      <span className="material-symbols-outlined">expand_more</span>
    </div>
  </div>

  {/* Desktop Pill Tabs */}
  <div className="hidden md:flex justify-center overflow-x-auto pb-2 scrollbar-hide">
    <div className="relative bg-canvas p-1.5 rounded-full border-2 border-ink flex items-center shadow-sm" id="pill-tab-container">
      {/* Sliding Indicator Pill */}
      <button onClick={() => setActiveTab('overview')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'overview' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Overview</button>
      <button onClick={() => setActiveTab('included')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'included' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>What's Included</button>
      <button onClick={() => setActiveTab('steps')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'steps' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Steps</button>
      <button onClick={() => setActiveTab('clinical')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'clinical' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Clinical Benefits</button>
      <button onClick={() => setActiveTab('safety')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'safety' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Age &amp; Safety</button>
    </div>
  </div>
</div>
{/* Tab 1: Overview Panel */}
<div className={`tab-panel grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${activeTab === 'overview' ? '' : 'hidden'}`} id="tab-overview">
<div className="lg:col-span-6 flex flex-col gap-4">
<span className="font-hand text-2xl text-coral">Discover the Magic</span>
<h3 className="font-display text-3xl font-extrabold text-ink leading-tight">
  {product.title}
</h3>
<p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
  {product.description}
</p>
{product.title.includes('Bot') && (
<div className="grid grid-cols-2 gap-4 mt-2">
<div className="p-4 rounded-2xl bg-canvas border border-ink/10">
<span className="font-display text-2xl font-bold text-teal">0.2s</span>
<p className="text-xs text-ink-muted mt-1">Instant Vector Card Recognition with ambient scanner eye</p>
</div>
<div className="p-4 rounded-2xl bg-canvas border border-ink/10">
<span className="font-display text-2xl font-bold text-coral">&lt; 36 dB</span>
<p className="text-xs text-ink-muted mt-1">Whisper stepper motors engineered for sensory calm</p>
</div>
</div>
)}
</div>
<div className="lg:col-span-6 rounded-3xl overflow-hidden border-2 border-ink shadow-card">
<img alt="Mother and toddler interacting with drawing bot" className="w-full h-80 lg:h-96 object-cover" src={displayImages[1 % displayImages.length]}/>
</div>
</div>
{/* Tab 2: What's Included Panel */}
{product.title.includes('Bot') ? (
<div className={`tab-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${activeTab === 'included' ? '' : 'hidden'}`} id="tab-included">
<div className="p-5 rounded-3xl bg-canvas border-2 border-ink/10 flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl text-coral mb-2">smart_toy</span>
<h4 className="font-display font-bold text-base text-ink">Smart Drawing Bot</h4>
<p className="text-xs text-ink-muted mt-1">1x Precision optical robot with whisper micro-steppers.</p>
</div>
<div className="p-5 rounded-3xl bg-canvas border-2 border-ink/10 flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl text-marigold mb-2">style</span>
<h4 className="font-display font-bold text-base text-ink">150 Hardbound Cards</h4>
<p className="text-xs text-ink-muted mt-1">Animals, Alphabet, Numbers, &amp; Phonics illustrated decks.</p>
</div>
<div className="p-5 rounded-3xl bg-canvas border-2 border-ink/10 flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl text-periwinkle mb-2">draw</span>
<h4 className="font-display font-bold text-base text-ink">Washable Markers</h4>
<p className="text-xs text-ink-muted mt-1">2x Ergonomic triangular grasp non-toxic water-soluble markers.</p>
</div>
<div className="p-5 rounded-3xl bg-canvas border-2 border-ink/10 flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl text-teal mb-2">cable</span>
<h4 className="font-display font-bold text-base text-ink">Braided USB-C Cable</h4>
<p className="text-xs text-ink-muted mt-1">Tangle-proof braided fast charging cord (5.5 hrs battery).</p>
</div>
<div className="p-5 rounded-3xl bg-canvas border-2 border-ink/10 flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl text-ink mb-2">menu_book</span>
<h4 className="font-display font-bold text-base text-ink">Pediatric Playbook</h4>
<p className="text-xs text-ink-muted mt-1">30 Occupational therapist developmental milestone guides.</p>
</div>
</div>
) : (
<div className={`tab-panel ${activeTab === 'included' ? '' : 'hidden'}`} id="tab-included">
<div className="p-12 rounded-3xl bg-canvas border-2 border-ink flex flex-col items-center text-center">
<span className="material-symbols-outlined text-5xl text-marigold mb-4">inventory_2</span>
<h4 className="font-display font-bold text-2xl text-ink">Everything you need to get started</h4>
<p className="text-base text-ink-muted mt-2 max-w-md mx-auto">Includes the {product.title} and all standard accessories required for immediate play right out of the box.</p>
</div>
</div>
)}
{/* Tab 3: Steps Panel */}
{((product?.title || '') + (product?.name || '')).includes('Bot') ? (
<div className={`tab-panel grid grid-cols-1 md:grid-cols-3 gap-6 ${activeTab === 'steps' ? '' : 'hidden'}`} id="tab-how">
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-coral-fixed text-canvas-fixed border-2 border-ink font-display font-bold flex items-center justify-center text-sm mb-3">1</span>
<h4 className="font-display font-bold text-lg text-ink">Insert Hardbound Card</h4>
<p className="text-xs text-ink-muted mt-2">Slide any illustrated card into the scanner eye. The robot greets the object aloud and introduces the drawing.</p>
</div>
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-marigold text-ink font-display font-bold flex items-center justify-center text-sm mb-3">2</span>
<h4 className="font-display font-bold text-lg text-ink">Watch Stroke 1</h4>
<p className="text-xs text-ink-muted mt-2">The robot smoothly creates the foundation line on paper and pauses, encouraging your child: "Now your turn!"</p>
</div>
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-coral-fixed text-canvas-fixed border-2 border-ink font-display font-bold flex items-center justify-center text-sm mb-3">3</span>
<h4 className="font-display font-bold text-lg text-ink">Press Top Button to Continue</h4>
<p className="text-xs text-ink-muted mt-2">When ready, child taps the oversized tactile dome button to proceed to the next progressive geometric stroke.</p>
</div>
</div>
) : (
<div className={`tab-panel grid grid-cols-1 md:grid-cols-3 gap-6 ${activeTab === 'steps' ? '' : 'hidden'}`} id="tab-how">
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-coral-fixed text-canvas-fixed border-2 border-ink font-display font-bold flex items-center justify-center text-sm mb-3">1</span>
<h4 className="font-display font-bold text-lg text-ink">Unbox & Discover</h4>
<p className="text-xs text-ink-muted mt-2">Let your child independently open and explore the pieces. This unstructured time builds curiosity and ownership.</p>
</div>
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-marigold text-ink font-display font-bold flex items-center justify-center text-sm mb-3">2</span>
<h4 className="font-display font-bold text-lg text-ink">Engage & Play</h4>
<p className="text-xs text-ink-muted mt-2">Introduce the core concept—whether building, reading, or sorting—and watch them take the lead in their learning journey.</p>
</div>
<div className="p-6 rounded-3xl bg-canvas border-2 border-ink/10">
<span className="w-8 h-8 rounded-full bg-coral-fixed text-canvas-fixed border-2 border-ink font-display font-bold flex items-center justify-center text-sm mb-3">3</span>
<h4 className="font-display font-bold text-lg text-ink">Grow & Challenge</h4>
<p className="text-xs text-ink-muted mt-2">As they master the basics, gently introduce more advanced configurations or challenges to continue their cognitive development.</p>
</div>
</div>
)}
{/* Tab 4: Clinical Benefits Panel */}
{product.title.includes('Bot') ? (
<div className={`tab-panel bg-canvas p-8 rounded-3xl border-2 border-ink ${activeTab === 'clinical' ? '' : 'hidden'}`} id="tab-benefits">
<div className="max-w-3xl mx-auto flex flex-col gap-4">
<span className="text-teal font-display font-bold text-sm uppercase tracking-wider">Occupational Therapy Assessment</span>
<h3 className="font-display text-2xl font-extrabold text-ink">Why Physical Marker Resistance Beats Glass Tablets</h3>
<p className="text-sm text-ink-muted leading-relaxed">
              Touchscreens provide zero proprioceptive feedback. A finger gliding across slick glass does not develop the lumbrical muscles in the hand necessary to stabilize a pencil in kindergarten. ToddsIQ pairs authentic fiber nib resistance on real toothy sketch paper with patient audio pacing.
            </p>
</div>
</div>
) : (
<div className={`tab-panel bg-canvas p-12 rounded-3xl border-2 border-ink ${activeTab === 'clinical' ? '' : 'hidden'}`} id="tab-benefits">
<div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
<span className="material-symbols-outlined text-5xl text-periwinkle mb-2">psychology</span>
<span className="text-teal font-display font-bold text-sm uppercase tracking-wider">Developmental Milestones</span>
<h3 className="font-display text-3xl font-extrabold text-ink">Cognitive & Motor Skill Growth</h3>
<p className="text-base text-ink-muted leading-relaxed max-w-2xl">
              Every ToddsIQ product is designed to support core developmental milestones. The {product.title} encourages independent exploration, builds confidence, and fosters fine motor and cognitive skills without the need for screens.
            </p>
</div>
</div>
)}
{/* Tab 5: Age & Safety Panel */}
<div className={`tab-panel bg-[#1F9D8A]/10 border-2 border-teal p-8 rounded-3xl ${activeTab === 'safety' ? '' : 'hidden'}`} id="tab-safety">
<div className="max-w-3xl mx-auto flex flex-col gap-4">
<span className="text-teal font-display font-bold text-sm uppercase tracking-wider">Non-Toxic &amp; Heirloom Calibrated</span>
<h3 className="font-display text-2xl font-extrabold text-ink">BPA-Free, Lead-Free, 1.2m Drop Shock Tested</h3>
<p className="text-sm text-ink-muted leading-relaxed">
              Certified compliant with ASTM F963 (US) and EN71 (EU) children toy safety standards. Heavy rounded food-grade ABS housing withstands drops from toddler play tables onto hardwood floor.
            </p>
</div>
</div>
</div>
</section></FadeInUp>

{/* INTERACTIVE VIDEO-REVIEW CAROUSEL & TESTIMONIALS */}
{product.title.includes('Bot') && (
<FadeInUp><section className="w-full py-16 bg-[#F4EFE6] border-y border-ink/10" id="reviews-section">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Animated Count-Up Rating Header */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border-2 border-ink shadow-card mb-12">
<div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-1">
<span className="font-hand text-2xl text-coral">Parent &amp; Clinical Consensus</span>
<div className="flex items-baseline gap-3">
<span className="font-display text-5xl sm:text-6xl font-black text-ink leading-none" id="rating-counter">4.9</span>
<span className="text-ink-muted text-base font-bold">/ 5.0 Rating</span>
</div>
<div className="flex text-marigold text-2xl mt-1">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="text-xs text-ink-muted mt-1">Over <strong className="text-ink font-bold" id="review-counter">5,480</strong> verified parent &amp; clinical therapist reviews</span>
<span className="mt-2 text-xs font-bold text-teal bg-teal/10 px-3 py-1 rounded-full border border-teal/20 inline-flex items-center gap-1">
<span className="material-symbols-outlined text-xs">verified</span> 99.2% Recommend to Fellow Parents
            </span>
</div>
{/* Rating Distribution Bars with Dynamic Gradients */}
<div className="lg:col-span-7 flex flex-col gap-3 w-full">
<div className="flex items-center gap-3">
<span className="w-12 text-xs font-bold text-ink">5 Stars</span>
<div className="flex-1 h-3.5 bg-canvas rounded-full overflow-hidden border border-ink/10">
<div className="h-full bg-gradient-to-r from-marigold to-coral rounded-full bar-fill" style={{width: '94%'}}></div>
</div>
<span className="w-10 text-right text-xs font-bold text-ink">94%</span>
</div>
<div className="flex items-center gap-3">
<span className="w-12 text-xs font-bold text-ink">4 Stars</span>
<div className="flex-1 h-3.5 bg-canvas rounded-full overflow-hidden border border-ink/10">
<div className="h-full bg-gradient-to-r from-marigold to-coral rounded-full bar-fill" style={{width: '5%'}}></div>
</div>
<span className="w-10 text-right text-xs font-bold text-ink">5%</span>
</div>
<div className="flex items-center gap-3">
<span className="w-12 text-xs font-bold text-ink">3 Stars</span>
<div className="flex-1 h-3.5 bg-canvas rounded-full overflow-hidden border border-ink/10">
<div className="h-full bg-gradient-to-r from-marigold to-coral rounded-full bar-fill" style={{width: '1%'}}></div>
</div>
<span className="w-10 text-right text-xs font-bold text-ink">1%</span>
</div>
</div>
</div>
{/* Carousel Title & Navigation Arrows */}
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
<div>
<span className="font-hand text-2xl text-coral">Real Moments at Home</span>
<h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
              Parent Video Diaries &amp; Occupational Therapist Quotes
            </h3>
</div>
<div className="flex items-center gap-2">
<button aria-label="Previous Reviews" className="w-10 h-10 rounded-full bg-white border-2 border-ink shadow-pop-sm flex items-center justify-center hover:bg-canvas transition-colors" >
<span className="material-symbols-outlined text-lg">chevron_left</span>
</button>
<button aria-label="Next Reviews" className="w-10 h-10 rounded-full bg-white border-2 border-ink shadow-pop-sm flex items-center justify-center hover:bg-canvas transition-colors" >
<span className="material-symbols-outlined text-lg">chevron_right</span>
</button>
</div>
</div>
{/* Video & Photo Carousel Cards Container */}
<div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x" id="review-carousel">
{/* Card 1: Clinical OT Review */}
<div className="min-w-[300px] sm:min-w-[360px] max-w-[360px] bg-white rounded-3xl p-6 border-2 border-teal shadow-card flex flex-col justify-between shrink-0 snap-start">
<div className="flex flex-col gap-3">
<div className="flex justify-between items-center">
<div className="flex text-marigold text-sm">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-teal text-xs font-bold">Clinical OT</span>
</div>
<h4 className="font-display font-bold text-base text-ink">"Replaced iPad drawing apps instantly in my pediatric practice."</h4>
<p className="text-xs text-ink-muted leading-relaxed">
                "Children with low pencil muscle tone freeze when given blank sketch pads. This robot deconstructs motor planning stroke by stroke. They develop true bilateral coordination without sensory dopamine burnout."
              </p>
</div>
<div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between">
<div>
<p className="font-display font-bold text-sm text-ink">Dr. Elena Vance, OTD</p>
<p className="text-xs text-ink-muted">Pediatric OT • Austin, TX</p>
</div>
<span className="material-symbols-outlined text-teal text-xl">verified</span>
</div>
</div>
{/* Card 2: Parent with Photo Play preview */}
<div className="min-w-[300px] sm:min-w-[360px] max-w-[360px] bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col justify-between shrink-0 snap-start">
<div className="flex flex-col gap-3">
<div className="relative w-full h-36 rounded-2xl overflow-hidden mb-1 group cursor-pointer" >
<img alt="Leo drawing video diary" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={displayImages[2 % displayImages.length]}/>
<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-coral text-canvas border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex items-center justify-center">
<span className="material-symbols-outlined text-xl">play_arrow</span>
</div>
</div>
<span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">0:45 Video</span>
</div>
<div className="flex justify-between items-center">
<div className="flex text-marigold text-sm">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-coral/10 text-coral text-xs font-bold">Verified Buyer</span>
</div>
<h4 className="font-display font-bold text-base text-ink">"45 minutes of quiet, independent morning focus."</h4>
<p className="text-xs text-ink-muted leading-relaxed">
                "Leo (3.5yo) used to beg for phone cartoons every Saturday at 7am. Now he sits down at his little wooden desk, feeds cards into the bot, and happily sketches animals."
              </p>
</div>
<div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between">
<div>
<p className="font-display font-bold text-sm text-ink">Marcus &amp; Chloe H.</p>
<p className="text-xs text-ink-muted">Parents of Leo (3.5) • Portland, OR</p>
</div>
<span className="material-symbols-outlined text-coral text-xl">verified</span>
</div>
</div>
{/* Card 3: Montessori Guide Review */}
<div className="min-w-[300px] sm:min-w-[360px] max-w-[360px] bg-white rounded-3xl p-6 border-2 border-teal shadow-card flex flex-col justify-between shrink-0 snap-start">
<div className="flex flex-col gap-3">
<div className="flex justify-between items-center">
<div className="flex text-marigold text-sm">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-marigold/20 text-ink text-xs font-bold">Montessori Guide</span>
</div>
<h4 className="font-display font-bold text-base text-ink">"Surpassed every loud battery toy we tested."</h4>
<p className="text-xs text-ink-muted leading-relaxed">
                "The whisper stepper motors are peaceful and respectful. It doesn't screech or play loud circus music. It gives clear tactile cadence that our 4-year-old classroom cohort adores."
              </p>
</div>
<div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between">
<div>
<p className="font-display font-bold text-sm text-ink">Sarah Chen-Bauer</p>
<p className="text-xs text-ink-muted">Early Educator • Seattle, WA</p>
</div>
<span className="material-symbols-outlined text-teal text-xl">verified</span>
</div>
</div>
{/* Card 4: Sibling Review with Image 36 */}
<div className="min-w-[300px] sm:min-w-[360px] max-w-[360px] bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col justify-between shrink-0 snap-start">
<div className="flex flex-col gap-3">
<div className="relative w-full h-36 rounded-2xl overflow-hidden mb-1">
<img alt="Sibling collaboration session" className="w-full h-full object-cover" src={displayImages[3 % displayImages.length]}/>
</div>
<div className="flex justify-between items-center">
<div className="flex text-marigold text-sm">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="px-2.5 py-0.5 rounded-full bg-periwinkle/10 text-periwinkle text-xs font-bold">Sibling Pack</span>
</div>
<h4 className="font-display font-bold text-base text-ink">"Zero fighting between our 4 and 6 year olds."</h4>
<p className="text-xs text-ink-muted leading-relaxed">
                "Got the Classroom Duo so both kids could draw simultaneously at our art table. They trade cards like currency and color each other's drawings!"
              </p>
</div>
<div className="pt-4 mt-4 border-t border-ink/10 flex items-center justify-between">
<div>
<p className="font-display font-bold text-sm text-ink">Dave &amp; Priya M.</p>
<p className="text-xs text-ink-muted">Denver, CO</p>
</div>
<span className="material-symbols-outlined text-teal text-xl">verified</span>
</div>
</div>
</div>
</div>
</section></FadeInUp>
)}
{/* EXPLODED INVENTORY: WHAT'S IN THE BOX */}
{product.title.includes('Bot') && (
<>
<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
<div className="text-center max-w-2xl mx-auto mb-12">
<span className="font-hand text-2xl text-coral">Unboxing Transparency</span>
<h2 className="font-display text-3xl font-extrabold text-ink mt-1">What's in Your Discovery Pack</h2>
<p className="text-xs sm:text-sm text-ink-muted mt-2">Every component is non-toxic, child-safe, and fully recyclable packaging.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
<div className="bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col items-center text-center hover:-translate-y-1 transition-all">
<div className="w-16 h-16 rounded-2xl bg-coral/10 border-2 border-coral flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-coral">smart_toy</span>
</div>
<span className="font-display font-bold text-xs text-coral uppercase tracking-wider">1x Robotic Unit</span>
<h4 className="font-display font-bold text-base text-ink mt-1">Smart Drawing Bot</h4>
<p className="text-xs text-ink-muted mt-2">Whisper-quiet dual motor chassis with precision optical eye camera.</p>
</div>
<div className="bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col items-center text-center hover:-translate-y-1 transition-all">
<div className="w-16 h-16 rounded-2xl bg-marigold/10 border-2 border-marigold flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-marigold">style</span>
</div>
<span className="font-display font-bold text-xs text-marigold uppercase tracking-wider">150x Physical Cards</span>
<h4 className="font-display font-bold text-base text-ink mt-1">Hardbound Cards</h4>
<p className="text-xs text-ink-muted mt-2">Tear-proof multi-ply flashcards: Animals, Alphabet, Numbers, Vehicles.</p>
</div>
<div className="bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col items-center text-center hover:-translate-y-1 transition-all">
<div className="w-16 h-16 rounded-2xl bg-periwinkle/10 border-2 border-periwinkle flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-periwinkle">edit</span>
</div>
<span className="font-display font-bold text-xs text-periwinkle uppercase tracking-wider">2x Grasp Markers</span>
<h4 className="font-display font-bold text-base text-ink mt-1">Triangular Markers</h4>
<p className="text-xs text-ink-muted mt-2">Washable vegetable ink designed specifically for proper tripod finger alignment.</p>
</div>
<div className="bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col items-center text-center hover:-translate-y-1 transition-all">
<div className="w-16 h-16 rounded-2xl bg-teal/10 border-2 border-teal flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-teal">cable</span>
</div>
<span className="font-display font-bold text-xs text-teal uppercase tracking-wider">1x Power Cable</span>
<h4 className="font-display font-bold text-base text-ink mt-1">Braided USB-C</h4>
<p className="text-xs text-ink-muted mt-2">Durable cloth braided cord providing 5.5 hours of continuous battery play.</p>
</div>
<div className="bg-white rounded-3xl p-6 border-2 border-ink shadow-card flex flex-col items-center text-center hover:-translate-y-1 transition-all">
<div className="w-16 h-16 rounded-2xl bg-ink/10 border-2 border-ink flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-ink">menu_book</span>
</div>
<span className="font-display font-bold text-xs text-ink uppercase tracking-wider">1x OT Curriculum</span>
<h4 className="font-display font-bold text-base text-ink mt-1">Parent Playbook</h4>
<p className="text-xs text-ink-muted mt-2">Occupational therapist exercises and progressive developmental benchmarks.</p>
</div>
</div>
</section></FadeInUp>
{/* TECHNICAL & PEDIATRIC SPECIFICATIONS TABLE */}
<FadeInUp><section className="w-full py-16 bg-white border-y border-ink/10">
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-10">
<span className="text-teal font-display font-bold text-xs uppercase tracking-widest bg-teal/10 px-3 py-1 rounded-full">Engineering Rigor</span>
<h2 className="font-display text-3xl font-extrabold text-ink mt-2">Pediatric Calibration Standards</h2>
</div>
<div className="bg-canvas rounded-3xl p-6 sm:p-8 border-2 border-ink shadow-card divide-y divide-ink/10">
<div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-coral text-2xl">visibility</span>
<span className="font-display font-bold text-ink text-base">Optical Recognition Sensor</span>
</div>
<div className="sm:text-right">
<p className="font-display font-bold text-sm text-ink">0.2s Instant Vector Engine</p>
<p className="text-xs text-ink-muted">Works under natural sunlight, warm lamps, or play tables</p>
</div>
</div>
<div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-marigold text-2xl">volume_down</span>
<span className="font-display font-bold text-ink text-base">Motor Acoustic Volume</span>
</div>
<div className="sm:text-right">
<p className="font-display font-bold text-sm text-ink">&lt; 36 dB Gentle Micro-Stepper</p>
<p className="text-xs text-ink-muted">Calm frequency tuned for neurodiverse and sensory-sensitive kids</p>
</div>
</div>
<div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-teal text-2xl">battery_charging_full</span>
<span className="font-display font-bold text-ink text-base">Internal Battery Cell</span>
</div>
<div className="sm:text-right">
<p className="font-display font-bold text-sm text-ink">2,400 mAh Li-ion (5.5 hrs active draw)</p>
<p className="text-xs text-ink-muted">Auto-sleep after 5 mins of pause • USB-C fast charging</p>
</div>
</div>
<div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-periwinkle text-2xl">brush</span>
<span className="font-display font-bold text-ink text-base">Marker Arm Collar Grip</span>
</div>
<div className="sm:text-right">
<p className="font-display font-bold text-sm text-ink">Universal Tension Lock (9–13mm)</p>
<p className="text-xs text-ink-muted">Compatible with Crayola, Crayola Pip-Squeaks, colored pencils</p>
</div>
</div>
<div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-ink text-2xl">shield</span>
<span className="font-display font-bold text-ink text-base">Drop &amp; Material Testing</span>
</div>
<div className="sm:text-right">
<p className="font-display font-bold text-sm text-ink">1.2m Oak Floor Drop Certified</p>
<p className="text-xs text-ink-muted">ASTM F963, CE, EN71, Lead-Free &amp; BPA-Free</p>
</div>
</div>
</div>
</div>
</section></FadeInUp>
</>
)}
{/* EDITION COMPARISON MATRIX */}
{product.title.includes('Bot') && (
<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="compare-editions">
<div className="text-center max-w-2xl mx-auto mb-12">
<span className="font-hand text-2xl text-coral">Choose the Right Tier</span>
<h2 className="font-display text-3xl font-extrabold text-ink mt-1">Edition Comparison Matrix</h2>
</div>
<div className="bg-white rounded-3xl border-2 border-ink shadow-lift overflow-hidden mb-4">
<div className="overflow-x-auto w-full pb-4 scrollbar-hide">
<div className="min-w-[680px] p-6 sm:p-8">
<div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-ink/10 items-end">
<div className="font-display font-bold text-xs uppercase tracking-wider text-ink-muted">Core Features</div>
<div className="text-center">
<h5 className="font-display font-bold text-base text-ink">Starter Pack</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">{formatPrice(89)}</p>
</div>
<div className="text-center p-3 rounded-2xl bg-coral/10 border-2 border-coral relative">
<span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-marigold text-ink text-[10px] font-display font-black px-2 py-0.5 rounded-full border border-ink/10">MOST POPULAR</span>
<h5 className="font-display font-bold text-base text-ink">Deluxe Atelier</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">{formatPrice(109)}</p>
</div>
<div className="text-center">
<h5 className="font-display font-bold text-base text-ink">Classroom Duo</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">{formatPrice(169)}</p>
</div>
</div>
<div className="divide-y divide-ink/10 text-xs sm:text-sm text-ink">
<div className="grid grid-cols-4 gap-4 py-3.5 items-center">
<span className="font-bold text-ink">Robotic Units</span>
<span className="text-center text-ink-muted">1 Robot</span>
<span className="text-center font-bold text-coral">1 Robot</span>
<span className="text-center font-bold text-ink">2 Robots</span>
</div>
<div className="grid grid-cols-4 gap-4 py-3.5 items-center">
<span className="font-bold text-ink">Flashcard Decks</span>
<span className="text-center text-ink-muted">150 Decks</span>
<span className="text-center font-bold text-coral">200 Decks (+Wonder)</span>
<span className="text-center font-bold text-ink">300 Decks (Full Suite)</span>
</div>
<div className="grid grid-cols-4 gap-4 py-3.5 items-center">
<span className="font-bold text-ink">Washable Marker Kit</span>
<span className="text-center text-ink-muted">2x Starter Markers</span>
<span className="text-center font-bold text-coral">12-Color Studio Palette</span>
<span className="text-center font-bold text-ink">2x 12-Color Palettes (24 total)</span>
</div>
<div className="grid grid-cols-4 gap-4 py-3.5 items-center">
<span className="font-bold text-ink">Canvas Atelier Storage Bag</span>
<span className="text-center text-ink-light">—</span>
<span className="text-center font-bold text-teal">✓ Heavyweight Canvas</span>
<span className="text-center font-bold text-teal">✓ 2x Canvas Bags</span>
</div>
<div className="grid grid-cols-4 gap-4 py-3.5 items-center">
<span className="font-bold text-ink">OT Curriculum Playbook</span>
<span className="text-center text-ink-muted">Basic Handbook</span>
<span className="text-center font-bold text-coral">Complete 30-Lesson Guide</span>
<span className="text-center font-bold text-ink">Classroom Sibling Curriculum</span>
</div>
</div>
</div>
</div>
</div>
</section></FadeInUp>
)}
{/* CONSUMABLES & ATELIER CROSS-SELL STRIP */}
<FadeInUp><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-ink/10">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
<div>
<span className="font-hand text-2xl text-coral">Keep Creating</span>
<h2 className="font-display text-3xl font-extrabold text-ink">Complete the Atelier</h2>
</div>
<a className="font-display font-bold text-sm text-coral hover:underline inline-flex items-center gap-1" href="#">
          Explore all STEM add-ons <span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Item 1: Markers Refill */}
<div className="bg-white rounded-3xl p-5 border-2 border-ink shadow-card flex flex-col justify-between hover:-translate-y-1 transition-all">
<div>
<div className="aspect-[4/3] rounded-2xl bg-canvas overflow-hidden mb-4 border border-ink/10 flex items-center justify-center p-3">
<span className="material-symbols-outlined text-6xl text-coral">palette</span>
</div>
<div className="flex justify-between items-baseline">
<span className="font-display font-bold text-xs text-coral uppercase">Studio Refill</span>
<span className="font-display font-bold text-base text-coral">{formatPrice(9.99)}</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">12-Color Triangular Marker Set</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Ultra-washable natural dye formula with ergonomic triangular barrels fitting the bot collar.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ({formatPrice(9.99)})
          </button>
</div>
{/* Item 2: Space / Architecture Cards */}
<div className="bg-white rounded-3xl p-5 border-2 border-ink shadow-card flex flex-col justify-between hover:-translate-y-1 transition-all">
<div>
<div className="aspect-[4/3] rounded-2xl bg-canvas overflow-hidden mb-4 border border-ink/10 flex items-center justify-center p-3">
<span className="material-symbols-outlined text-6xl text-marigold">rocket_launch</span>
</div>
<div className="flex justify-between items-baseline">
<span className="font-display font-bold text-xs text-marigold uppercase">Deck Expansion</span>
<span className="font-display font-bold text-base text-coral">{formatPrice(19)}</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">150 Space &amp; Architecture Cards</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Solar system planets, rockets, ancient pyramids, and world monuments for advanced learners.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ({formatPrice(19)})
          </button>
</div>
{/* Item 3: MagTrack Flexible Train */}
<div className="bg-white rounded-3xl p-5 border-2 border-ink shadow-card flex flex-col justify-between hover:-translate-y-1 transition-all">
<div>
<div className="aspect-[4/3] rounded-2xl bg-canvas overflow-hidden mb-4 border border-ink/10 flex items-center justify-center p-3">
<span className="material-symbols-outlined text-6xl text-periwinkle">train</span>
</div>
<div className="flex justify-between items-baseline">
<span className="font-display font-bold text-xs text-periwinkle uppercase">STEM Companion</span>
<span className="font-display font-bold text-base text-coral">{formatPrice(69)}</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">MagTrack™ 3D Flexible Train Track</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Modular magnetic track system that connects directly with your toddler's hand-drawn roadmaps.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ({formatPrice(69)})
          </button>
</div>
</div>
</section></FadeInUp>
{/* FAQ ACCORDION */}
<FadeInUp><section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="faq-section">
<div className="text-center mb-10">
<span className="font-hand text-2xl text-coral">Common Questions</span>
<h2 className="font-display text-3xl font-extrabold text-ink mt-1">Frequently Asked Questions</h2>
</div>
<div className="flex flex-col gap-4" id="faq-container">
{/* FAQ 1 */}
<div className="bg-white rounded-2xl p-5 border-2 border-ink shadow-card">
<button className="w-full flex items-center justify-between text-left font-display font-bold text-base text-ink"  type="button">
<span>Does it require Wi-Fi, Bluetooth, or an accompanying smartphone app?</span>
<span className="material-symbols-outlined text-coral transition-transform">expand_more</span>
</button>
<div className="faq-answer hidden pt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
<p><strong>Absolutely not.</strong> ToddsIQ™ is 100% offline and screen-free. There are zero radio signals, Bluetooth connections, internal surveillance microphones, or cloud profiles. The built-in optical sensor scans flashcard vectors locally in 0.2 seconds without transmitting any personal data.</p>
</div>
</div>
{/* FAQ 2 */}
<div className="bg-white rounded-2xl p-5 border-2 border-ink shadow-card">
<button className="w-full flex items-center justify-between text-left font-display font-bold text-base text-ink"  type="button">
<span>What happens if a flashcard gets bent, chewed, or lost?</span>
<span className="material-symbols-outlined text-coral transition-transform">expand_more</span>
</button>
<div className="faq-answer hidden pt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
<p>Our cards are crafted with 400gsm heavyweight multi-ply art board coated with a water-resistant matte lamination. If a card ever gets lost or ruined, our <strong>Heirloom Lifetime Promise</strong> covers it: simply email our Oregon workshop and we'll ship replacements free of charge.</p>
</div>
</div>
{/* FAQ 3 */}
<div className="bg-white rounded-2xl p-5 border-2 border-ink shadow-card">
<button className="w-full flex items-center justify-between text-left font-display font-bold text-base text-ink"  type="button">
<span>Can we use our own household markers or crayons?</span>
<span className="material-symbols-outlined text-coral transition-transform">expand_more</span>
</button>
<div className="faq-answer hidden pt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
<p>Yes! The automated marker holder features an internal silicone tension clamp that accommodates standard cylindrical or triangular markers with a diameter between 9mm and 13mm. This includes standard Crayola broad-line markers, Pip-Squeaks, and colored pencils.</p>
</div>
</div>
{/* FAQ 4 */}
<div className="bg-white rounded-2xl p-5 border-2 border-ink shadow-card">
<button className="w-full flex items-center justify-between text-left font-display font-bold text-base text-ink"  type="button">
<span>How does the 30-Day Living Room Guarantee work?</span>
<span className="material-symbols-outlined text-coral transition-transform">expand_more</span>
</button>
<div className="faq-answer hidden pt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
<p>Unbox it, let your child explore and draw. If after 30 days you don't observe increased focus, improved pencil grip, or peaceful independent play, download our prepaid return label for a 100% immediate refund—no questions asked.</p>
</div>
</div>
</div>
</section></FadeInUp>

    </div>
  );
}
