import { FadeInUp } from '../components/AnimatedSection';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { getProductByHandle } from '../services/shopify/products';
import drawingRobotImg from '../assets/drawing_companion_robot.jpg';
import creativeRobotImg from '../assets/creative_potential_robot.jpg';
import heroToysBannerImg from '../assets/hero_toys_banner.jpg';

// Helper to cleanly parse product descriptions into intro paragraph + compact highlights
function parseProductDescription(html) {
  if (!html) return { introHtml: '', highlightsTitle: '', highlights: [], restHtml: '' };

  // Match "Why parents love it:" or "Key Highlights" or similar patterns
  const pattern = /(?:<p[^>]*>)?<(?:strong|h4|h3|h2|b)[^>]*>(Why parents love it:?|✨ Key Highlights:?|Key Highlights:?|Why Parents Love It:?|Features:?)<\/(?:strong|h4|h3|h2|b)>(?:<\/p>)?/i;
  const match = html.match(pattern);

  if (match) {
    const splitIndex = match.index;
    const introHtml = html.substring(0, splitIndex).trim();
    const afterMatch = html.substring(splitIndex + match[0].length);

    // Look for the <ul> list of points
    const ulMatch = afterMatch.match(/<ul[^>]*>(.*?)<\/ul>/is);
    if (ulMatch) {
      const liMatches = [...ulMatch[1].matchAll(/<li[^>]*>(.*?)<\/li>/gi)]
        .map(m => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);
      const restHtml = afterMatch.substring(ulMatch.index + ulMatch[0].length).trim();
      return {
        introHtml: introHtml || "Build, create, and explore with hands-on, milestone-driven screen-free play.",
        highlightsTitle: match[1].replace(/:$/, '').trim(),
        highlights: liMatches,
        restHtml
      };
    }
  }

  // Fallback 1: check if there's any <ul>
  const ulMatch = html.match(/<ul[^>]*>(.*?)<\/ul>/is);
  if (ulMatch) {
    const introHtml = html.substring(0, ulMatch.index).trim();
    const liMatches = [...ulMatch[1].matchAll(/<li[^>]*>(.*?)<\/li>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);
    const restHtml = html.substring(ulMatch.index + ulMatch[0].length).trim();
    return {
      introHtml: introHtml || html,
      highlightsTitle: 'Why parents love it:',
      highlights: liMatches,
      restHtml
    };
  }

  // Fallback 2: Check for plain text lines containing "Why parents love it"
  if (html.includes('Why parents love it')) {
    const parts = html.split(/Why parents love it:?/i);
    const intro = parts[0].trim();
    const bullets = (parts[1] || '')
      .split(/\n|<br\s*\/?>/)
      .map(s => s.replace(/^[•\-\*✓\s]+/, '').trim())
      .filter(s => s.length > 2);
    return {
      introHtml: intro,
      highlightsTitle: 'Why parents love it:',
      highlights: bullets,
      restHtml: ''
    };
  }

  // Plain single paragraph
  return {
    introHtml: html,
    highlightsTitle: '',
    highlights: [],
    restHtml: ''
  };
}

// Helper to parse option value badges, emojis, and titles
function parseOptionValue(val) {
  if (!val) return { emoji: null, title: '', badge: null };
  
  const emojiRegex = /^(\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83E[\uDD00-\uDFFF]|\u2728|\uD83D\uDC8E|\uD83C\uDFC6|\uD83C\uDF81|\uD83E\uDDE9)\s*/u;
  const match = val.match(emojiRegex);
  const emoji = match ? match[1] : null;
  let cleanText = match ? val.replace(emojiRegex, '').trim() : val.trim();

  let badge = null;
  const parenMatch = cleanText.match(/\((.*?)\)/);
  if (parenMatch) {
    badge = parenMatch[1];
    cleanText = cleanText.replace(/\(.*?\)/, '').trim();
  } else if (cleanText.includes('123 PCS') || cleanText.toLowerCase().includes('master')) {
    badge = 'Best Value';
  } else if (cleanText.includes('81 PCS') || cleanText.toLowerCase().includes('pro')) {
    badge = 'Popular';
  }

  return { emoji, title: cleanText, badge };
}

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
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [recentPurchase, setRecentPurchase] = useState(null);
  const [showPurchaseToast, setShowPurchaseToast] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
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
    setIsDescExpanded(false);
  }, [routeParam]);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        setShowSticky(rect.top < 0 || window.scrollY > 450);
      } else {
        setShowSticky(window.scrollY > 400);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [product?.id]);

  // Social Proof: Live buyer notification after 7-8 seconds
  useEffect(() => {
    if (!product) return;

    const purchases = [
      { name: 'Sarah M.', location: 'Austin, TX', time: '3 mins ago' },
      { name: 'Emily R.', location: 'San Diego, CA', time: '5 mins ago' },
      { name: 'Jessica T.', location: 'Seattle, WA', time: '7 mins ago' },
      { name: 'David K.', location: 'Chicago, IL', time: '11 mins ago' },
      { name: 'Amanda B.', location: 'Denver, CO', time: '14 mins ago' },
      { name: 'Michael L.', location: 'Brooklyn, NY', time: '18 mins ago' },
      { name: 'Rachel C.', location: 'Portland, OR', time: '21 mins ago' }
    ];

    let currentIndex = 0;
    let hideTimer;
    let cycleInterval;

    const showNext = () => {
      setRecentPurchase(purchases[currentIndex % purchases.length]);
      setShowPurchaseToast(true);
      currentIndex++;

      hideTimer = setTimeout(() => {
        setShowPurchaseToast(false);
      }, 5500);
    };

    // First trigger after 7.5 seconds
    const initialTimer = setTimeout(() => {
      showNext();
      // Re-trigger every 15 seconds
      cycleInterval = setInterval(showNext, 15000);
    }, 7500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(cycleInterval);
    };
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
  
  const rawHtml = product.descriptionHtml || product.description || "The gentle cognitive tutor that turns playtime into achievable, milestone-driven progression.";
  const parsedDesc = parseProductDescription(rawHtml);
  const cleanTitle = (product.title || '').split('–')[0].split('-')[0].trim();

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

  const scrollToBuy = () => {
    if (ctaRef.current) {
      ctaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full bg-canvas relative pb-20 sm:pb-24">
      
      {/* RECENT PURCHASE FLOATING TOAST (Triggers after 7-8 sec) */}
      <AnimatePresence>
        {showPurchaseToast && recentPurchase && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`fixed ${showSticky ? 'bottom-20 sm:bottom-22' : 'bottom-5 sm:bottom-6'} left-3 sm:left-6 z-50 bg-white rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] p-3 sm:p-3.5 flex items-center gap-3 max-w-[340px] sm:max-w-sm transition-all duration-300`}
          >
            {/* Pulsing Green Status Dot + Product Thumbnail */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-ink overflow-hidden bg-[#F4F1EA] shrink-0">
              <img src={activeImage || product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
              </span>
            </div>

            {/* Buyer Text */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-ink">
                <span>{recentPurchase.name}</span>
                <span className="text-ink-muted font-normal">• {recentPurchase.location}</span>
              </div>
              <p className="text-xs font-bold text-coral truncate leading-tight mt-0.5">
                Purchased {cleanTitle || 'this item'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-ink-muted font-semibold">
                <span className="material-symbols-outlined text-[13px] text-teal">verified</span>
                <span>Verified buyer</span>
                <span>•</span>
                <span>{recentPurchase.time}</span>
              </div>
            </div>

            {/* Dismiss X */}
            <button
              onClick={() => setShowPurchaseToast(false)}
              className="text-ink/40 hover:text-ink text-sm p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer self-start"
              aria-label="Close"
              type="button"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY BOTTOM BUY BAR (Fixed at bottom on all screens) */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-50 bg-white border-t-2 border-ink shadow-[0px_-4px_20px_rgba(30,42,56,0.15)] py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 flex items-center justify-between transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : 'translate-y-full pointer-events-none'
        }`}
      >
        {/* Left: Thumbnail & Title & Price */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border-2 border-ink overflow-hidden bg-[#F4F1EA] shrink-0">
            <img src={activeImage || product.thumbnail} className="w-full h-full object-cover" alt={product.title} />
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-bold text-ink text-xs sm:text-sm lg:text-base truncate max-w-[150px] xs:max-w-[190px] sm:max-w-xs md:max-w-md">
              {cleanTitle || product.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-coral font-black text-sm sm:text-base leading-none">
                {formatPrice(finalPrice)}
              </span>
              {savings > 0 && (
                <span className="bg-coral/10 text-coral text-[10px] font-black px-1.5 py-0.5 rounded-full border border-coral/30 hidden xs:inline-block">
                  Save {savings}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Live Purchase Ticker (Tablet & Desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1EA] border border-ink/20 text-xs font-bold text-ink shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{recentPurchase ? `${recentPurchase.name} from ${recentPurchase.location} bought ${recentPurchase.time}` : '18 parents ordered this today'}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={handleAddToCart} 
            type="button"
            className="hidden sm:inline-flex px-4 sm:px-5 py-2.5 rounded-xl bg-canvas hover:bg-[#F4F1EA] text-ink font-display font-bold text-xs sm:text-sm border-2 border-ink shadow-[2px_2px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">{added ? 'check' : 'shopping_bag'}</span>
            <span>{added ? 'Added!' : 'Add to Bag'}</span>
          </button>
          
          <button 
            onClick={handleBuyNow} 
            type="button"
            className="px-5 sm:px-7 py-2.5 rounded-xl bg-marigold hover:bg-marigold/90 text-ink font-display font-black text-xs sm:text-sm border-2 border-ink shadow-[3px_3px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buy Now</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
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

                {(() => {
                  const rawHtml = product.descriptionHtml || product.description || "The gentle cognitive tutor that turns playtime into achievable, milestone-driven progression.";
                  const parsedDesc = parseProductDescription(rawHtml);

                  return (
                    <div>
                      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink leading-tight">
                        {product.title}
                      </h1>
                      
                      {/* Description Paragraph with Read More / Read Less Toggle */}
                      <div className="mt-2.5">
                        <div className="relative">
                          <div 
                            className={`text-xs sm:text-sm text-ink-muted leading-relaxed transition-all duration-300 overflow-hidden ${
                              isDescExpanded ? 'max-h-[1200px]' : 'max-h-[58px] sm:max-h-[66px]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: parsedDesc.introHtml }}
                          />
                          {!isDescExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsDescExpanded(!isDescExpanded)}
                          className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-coral hover:text-coral/80 transition-colors py-0.5 focus:outline-none cursor-pointer"
                        >
                          <span>{isDescExpanded ? 'Read Less' : 'Read More'}</span>
                          <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isDescExpanded ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </button>
                      </div>

                      {/* Why parents love it: (Highlights list with compact spacing & icons) */}
                      {parsedDesc.highlights && parsedDesc.highlights.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-ink/5">
                          <div className="text-xs font-bold uppercase tracking-wider text-ink/75 mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-coral text-base" style={{ fontVariationSettings: '"FILL" 1' }}>favorite</span>
                            <span>{parsedDesc.highlightsTitle || 'Why parents love it:'}</span>
                          </div>
                          <ul className="flex flex-col gap-1.5">
                            {parsedDesc.highlights.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink/85 leading-snug">
                                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-teal/15 text-teal flex items-center justify-center text-[10px] font-bold">
                                  ✓
                                </span>
                                <span className="flex-1 font-medium">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Additional Details if expanded */}
                      {isDescExpanded && parsedDesc.restHtml && (
                        <div 
                          className="mt-3 pt-3 border-t border-ink/5 text-xs sm:text-sm text-ink-muted leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: parsedDesc.restHtml }}
                        />
                      )}
                    </div>
                  );
                })()}

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
                  <div className="flex flex-col gap-4">
                    {product.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-display text-sm font-bold text-ink">{opt.name}:</span>
                          </div>
                          <span className="text-[11px] font-bold text-coral bg-coral/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse"></span>
                            {selectedOptions[opt.name] || opt.values[0]}
                          </span>
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
                                 <button 
                                   key={i} 
                                   type="button"
                                   onClick={() => {
                                     setSelectedOptions({...selectedOptions, [opt.name]: v});
                                     if (hypotheticalVariant?.image) {
                                       setActiveImage(hypotheticalVariant.image);
                                     } else if (optIndex === 0 && displayImages[i]) {
                                       setActiveImage(displayImages[i]);
                                     }
                                   }} 
                                   className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden active:scale-[0.99] cursor-pointer ${
                                     isSelected 
                                       ? 'bg-gradient-to-r from-coral/10 via-coral/5 to-white border-coral shadow-[3px_3px_0px_#1E2A38] -translate-y-0.5' 
                                       : 'bg-white border-ink/15 hover:border-ink/40 hover:-translate-y-0.5 hover:shadow-xs'
                                   }`}
                                 >
                                   {opt.badges && opt.badges[i] && (
                                     <div className="absolute top-0 right-0 bg-marigold text-ink text-[10px] font-bold px-3 py-0.5 rounded-bl-xl border-b-2 border-l-2 border-ink shadow-xs">
                                       {opt.badges[i]}
                                     </div>
                                   )}
                                   <div className="flex items-start justify-between gap-4 w-full">
                                     <div className="flex flex-col gap-1">
                                       <span className="font-display font-bold text-base text-ink flex items-center gap-1.5">
                                         {opt.icons && opt.icons[i]} {v}
                                       </span>
                                       <span className="text-xs text-ink-muted pr-12">{opt.subtitles[i]}</span>
                                     </div>
                                     <div className="flex flex-col items-end text-right min-w-[70px]">
                                       {price != null && <span className={`font-display font-bold text-lg ${isSelected ? 'text-coral' : 'text-ink'}`}>${price.toFixed(2)}</span>}
                                       {compPrice != null && <span className="text-xs text-ink-light line-through font-semibold">${compPrice.toFixed(2)}</span>}
                                     </div>
                                   </div>
                                 </button>
                               );
                            })}
                          </div>
                        ) : (
                          <div className={`grid ${
                            opt.values.length === 3 
                              ? 'grid-cols-3' 
                              : opt.values.length === 2 
                                ? 'grid-cols-1 sm:grid-cols-2' 
                                : 'grid-cols-2 sm:grid-cols-3'
                          } gap-2.5`}>
                            {opt.values.map((v, i) => {
                              const isSelected = selectedOptions[opt.name] === v;
                              const parsed = parseOptionValue(v);
                              
                              const hypotheticalVariant = product.variants?.find(variant => 
                                variant.selectedOptions.every(so => 
                                  so.name === opt.name ? so.value === v : so.value === selectedOptions[so.name]
                                )
                              );

                              const price = hypotheticalVariant?.price;
                              const compPrice = hypotheticalVariant?.compareAtPrice;
                              
                              return (
                                <button 
                                  key={i} 
                                  type="button"
                                  onClick={() => {
                                    setSelectedOptions({...selectedOptions, [opt.name]: v});
                                    if (hypotheticalVariant?.image) {
                                      setActiveImage(hypotheticalVariant.image);
                                    } else if (optIndex === 0 && displayImages[i]) {
                                      setActiveImage(displayImages[i]);
                                    }
                                  }} 
                                  className={`group relative flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden text-center active:scale-[0.97] ${
                                    isSelected 
                                      ? 'bg-gradient-to-b from-coral/10 via-coral/5 to-white border-coral shadow-[3px_3px_0px_#1E2A38] -translate-y-0.5 ring-2 ring-coral/20' 
                                      : 'bg-white border-ink/15 hover:border-ink/40 hover:bg-canvas/40 hover:-translate-y-0.5 hover:shadow-xs text-ink'
                                  }`}
                                >
                                  {/* Top-right active check badge or empty radio */}
                                  <div className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                                    isSelected 
                                      ? 'bg-coral text-white scale-100 shadow-xs' 
                                      : 'border border-ink/20 bg-white/90 group-hover:border-ink/40'
                                  }`}>
                                    {isSelected ? (
                                      <span className="material-symbols-outlined text-[11px] font-black leading-none">check</span>
                                    ) : null}
                                  </div>

                                  {/* Badge (e.g. Popular, Best Value, 40% OFF) */}
                                  {parsed.badge && (
                                    <span className={`inline-block text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full mb-1.5 border shadow-2xs ${
                                      isSelected 
                                        ? 'bg-coral text-white border-coral' 
                                        : 'bg-marigold/20 text-ink border-marigold/40'
                                    }`}>
                                      {parsed.badge}
                                    </span>
                                  )}

                                  {/* Emoji / Icon */}
                                  {parsed.emoji && (
                                    <span className="text-xl sm:text-2xl mb-1 transform group-hover:scale-110 transition-transform">
                                      {parsed.emoji}
                                    </span>
                                  )}

                                  {/* Title */}
                                  <span className={`font-display font-extrabold text-xs sm:text-sm leading-tight transition-colors ${
                                    isSelected ? 'text-coral' : 'text-ink'
                                  }`}>
                                    {parsed.title}
                                  </span>

                                  {/* Pricing info if available */}
                                  {price != null && (
                                    <div className="flex items-center gap-1 mt-1 text-[11px]">
                                      <span className={`font-bold ${isSelected ? 'text-coral' : 'text-ink'}`}>${price.toFixed(2)}</span>
                                      {compPrice != null && <span className="line-through text-ink-light text-[10px]">${compPrice.toFixed(2)}</span>}
                                    </div>
                                  )}
                                </button>
                              );
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

      {/* ========================================================================= */}
      {/* 1. PRODUCT OVERVIEW (Description points + image + CTA) */}
      {/* ========================================================================= */}
      <FadeInUp>
        <section className="w-full py-14 sm:py-20 bg-white border-b-2 border-ink" id="product-overview">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="font-hand text-2xl text-coral block mb-1">Discover The Magic</span>
              <span className="text-teal font-display font-bold text-xs uppercase tracking-widest bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 inline-block mb-3">
                Product Overview
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                Everything You Need For Immersive, Screen-Free Play
              </h2>
              <p className="text-sm sm:text-base text-ink/80 mt-3 max-w-2xl mx-auto leading-relaxed">
                Engineered to turn restless energy into purposeful, focused discovery without digital noise, blue light, or dopamine fatigue.
              </p>
            </div>

            {/* Content Grid: Description Points & Showcase Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Description Summary, Key Points & CTA */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Intro Card */}
                <div className="bg-[#F4F1EA] p-6 sm:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
                  <h3 className="font-display text-xl sm:text-2xl font-black text-ink mb-3">
                    Built For Curious Hands & Growing Minds
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-ink/85 leading-relaxed">
                    {parsedDesc.introHtml ? parsedDesc.introHtml.replace(/<[^>]+>/g, '') : product.description}
                  </p>
                </div>

                {/* Key Description Points */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-coral text-base">check_circle</span>
                    <span>Key Features & Highlights</span>
                  </span>

                  {parsedDesc.highlights && parsedDesc.highlights.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {parsedDesc.highlights.map((point, idx) => (
                        <div 
                          key={idx}
                          className="bg-white p-4 rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-start gap-3 hover:-translate-y-0.5 transition-all"
                        >
                          <div className="w-8 h-8 rounded-xl bg-teal/10 border border-teal/30 text-teal flex items-center justify-center shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-base">star</span>
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-ink leading-snug">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="bg-white p-4 rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-start gap-3 hover:-translate-y-0.5 transition-all">
                        <div className="w-8 h-8 rounded-xl bg-coral/10 border border-coral/30 text-coral flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-base">palette</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-ink text-sm">Tactile Exploration</h4>
                          <p className="text-xs text-ink-muted mt-0.5">Authentic hands-on manipulation that develops true motor coordination.</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-start gap-3 hover:-translate-y-0.5 transition-all">
                        <div className="w-8 h-8 rounded-xl bg-teal/10 border border-teal/30 text-teal flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-base">phonelink_off</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-ink text-sm">100% Screen-Free Focus</h4>
                          <p className="text-xs text-ink-muted mt-0.5">Zero Wi-Fi, apps, or blue light. Respects natural childhood attention spans.</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center gap-3 hover:-translate-y-0.5 transition-all">
                        <div className="w-8 h-8 rounded-xl bg-marigold/20 border border-marigold/40 text-ink flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-base">psychology</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-ink text-sm">Milestone Progression</h4>
                          <p className="text-xs text-ink-muted mt-0.5">Calibrated alongside early childhood milestones for ages {product.ageBand || '3-8'}.</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center gap-3 hover:-translate-y-0.5 transition-all">
                        <div className="w-8 h-8 rounded-xl bg-periwinkle/15 border border-periwinkle/30 text-periwinkle flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-base">verified</span>
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-ink text-sm">Heirloom Quality</h4>
                          <p className="text-xs text-ink-muted mt-0.5">Non-toxic, BPA-free food-grade build engineered for lively toddler rooms.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Call To Action Box */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={scrollToBuy}
                    type="button"
                    className="px-8 py-4 bg-coral hover:bg-coral/95 text-canvas font-display text-base sm:text-lg font-black rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get {cleanTitle || 'This Toy'} Today</span>
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-ink-muted">
                    <span className="material-symbols-outlined text-teal text-base">verified_user</span>
                    <span>30-Day Living Room Guarantee • Free Shipping</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Showcase Image with Floating Badges */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative rounded-3xl overflow-hidden border-2 border-ink shadow-[6px_6px_0px_#1E2A38] bg-canvas aspect-[4/3] sm:aspect-square">
                  <img 
                    src={displayImages[1 % displayImages.length] || displayImages[0]} 
                    alt={`${product.title} showcase in action`}
                    className="w-full h-full object-cover select-none"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border-2 border-ink px-3 py-1.5 rounded-full shadow-[2px_2px_0px_#1E2A38] flex items-center gap-1.5 text-xs font-black text-ink">
                    <span>🌟</span>
                    <span>100% Screen-Free</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-marigold border-2 border-ink px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_#1E2A38] flex items-center gap-1.5 text-xs font-black text-ink">
                    <span>Ages {product.ageBand || '3-8'}</span>
                  </div>
                </div>

                {/* Sub-strip Trust Badges */}
                <div className="grid grid-cols-3 gap-2 text-center py-2.5 px-2 bg-[#F4F1EA] rounded-2xl border border-ink/20">
                  <div className="flex flex-col items-center">
                    <span className="font-display font-black text-coral text-sm">ASTM</span>
                    <span className="text-[10px] text-ink-muted font-bold">Tested & Certified</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-ink/15">
                    <span className="font-display font-black text-teal text-sm">BPA-Free</span>
                    <span className="text-[10px] text-ink-muted font-bold">Food-Grade ABS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-display font-black text-periwinkle text-sm">0 Radios</span>
                    <span className="text-[10px] text-ink-muted font-bold">100% Offline</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeInUp>

      {/* ========================================================================= */}
      {/* 2. REAL-WORLD USE CASES */}
      {/* ========================================================================= */}
      <FadeInUp>
        <section className="w-full py-14 sm:py-20 bg-[#F4EFE6] border-b-2 border-ink" id="use-cases">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="font-hand text-2xl text-coral block mb-1">Everyday Moments, Lifelong Skills</span>
              <span className="text-marigold-deep font-display font-bold text-xs uppercase tracking-widest bg-marigold/20 px-3.5 py-1.5 rounded-full border border-marigold/40 inline-block mb-3">
                Real-World Use Cases
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                How Families & Little Learners Use It Every Day
              </h2>
              <p className="text-sm sm:text-base text-ink/80 mt-3 max-w-2xl mx-auto leading-relaxed">
                From calm morning routines to cooperative weekend afternoons, explore how it seamlessly fits into daily life.
              </p>
            </div>

            {/* 4 Use Case Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  emoji: '🌅',
                  tag: 'Independent Play',
                  iconBg: 'bg-marigold/20',
                  tagBg: 'bg-marigold/20',
                  tagText: 'text-ink',
                  title: 'Peaceful Morning Routine',
                  description: 'Gives parents 45+ minutes of quiet morning coffee while your child is happily absorbed in tactile, screen-free discovery without asking for phone cartoons.',
                  benefitSnippet: 'Promotes self-directed focus'
                },
                {
                  emoji: '🤝',
                  tag: 'Family Bonding',
                  iconBg: 'bg-coral/15',
                  tagBg: 'bg-coral/15',
                  tagText: 'text-coral',
                  title: 'Sibling & Family Collaboration',
                  description: 'Designed for hands of different ages to explore side-by-side. Encourages sharing, constructive problem-solving, and celebrating creative breakthroughs together.',
                  benefitSnippet: 'Zero sibling rivalry'
                },
                {
                  emoji: '🚗',
                  tag: 'On-The-Go',
                  iconBg: 'bg-teal/15',
                  tagBg: 'bg-teal/15',
                  tagText: 'text-teal',
                  title: 'Travel & Restaurant Companion',
                  description: 'No messy cords, no Wi-Fi required, and rugged drop-tested construction. Keeps little hands happily occupied on road trips, flights, and restaurant dining tables.',
                  benefitSnippet: '100% compact & portable'
                },
                {
                  emoji: '🌙',
                  tag: 'Sensory Balance',
                  iconBg: 'bg-periwinkle/15',
                  tagBg: 'bg-periwinkle/15',
                  tagText: 'text-periwinkle',
                  title: 'Calming Evening Wind-Down',
                  description: 'Replaces overstimulating digital screens with soothing, tactile offline focus that gently decompresses little nervous systems and eases bedtime routines.',
                  benefitSnippet: 'Protects natural sleep cycles'
                }
              ].map((uc, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E2A38] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${uc.iconBg} border-2 border-ink flex items-center justify-center text-2xl shadow-xs`}>
                        {uc.emoji}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border border-ink/20 ${uc.tagBg} ${uc.tagText}`}>
                        {uc.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                      {uc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted mt-2.5 leading-relaxed">
                      {uc.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-ink/10 flex items-center gap-1.5 text-xs font-bold text-coral">
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span>{uc.benefitSnippet}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </FadeInUp>

      {/* ========================================================================= */}
      {/* 3. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ========================================================================= */}
      <FadeInUp>
        <section className="w-full py-14 sm:py-20 bg-white" id="faq-section">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12">
              <span className="font-hand text-2xl text-coral block mb-1">Common Questions</span>
              <span className="text-teal font-display font-bold text-xs uppercase tracking-widest bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 inline-block mb-3">
                Frequently Asked Questions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                Clear Answers For Curious Parents
              </h2>
              <p className="text-sm sm:text-base text-ink/80 mt-2 max-w-lg mx-auto">
                Everything you need to know about safety, age appropriateness, materials, and ordering.
              </p>
            </div>

            {/* Interactive Accordion */}
            <div className="flex flex-col gap-4">
              {[
                {
                  question: 'Does this toy require Wi-Fi, Bluetooth, or an accompanying app?',
                  answer: 'Absolutely not. ToddsIQ™ is 100% offline, private, and screen-free. There are zero radio signals, Bluetooth transmitters, internal microphones, or required cloud accounts. It works instantly straight out of the box without any technical setup.'
                },
                {
                  question: `What age group is ${cleanTitle || 'this toy'} best suited for?`,
                  answer: `This toy is engineered specifically for children ages ${product.ageBand || '3-8'}. Younger children enjoy foundational tactile exploration and physical grasp, while older kids build confidence through deeper STEM problem-solving and open-ended creativity.`
                },
                {
                  question: 'Are the materials non-toxic, BPA-free, and safe if dropped?',
                  answer: 'Yes! Certified compliant with US ASTM F963 and European EN71 children safety standards. Made with heavy-duty, food-grade ABS resin with rounded edges that resist chipping, cracking, and impacts from standard toddler play tables onto hardwood floors.'
                },
                {
                  question: 'How does the 30-Day Living Room Guarantee work?',
                  answer: 'Unbox it, let your child explore, build, and play. If after 30 days you do not observe increased focus, happy independent play, or if you are not 100% thrilled, simply email our support team for a prepaid return label and an immediate, no-questions-asked refund.'
                },
                {
                  question: 'How long does shipping take and how do I track my order?',
                  answer: 'All orders are dispatched from our warehouse within 24 to 48 hours. Standard domestic delivery typically takes 3 to 5 business days. You will receive an immediate confirmation email with live tracking as soon as your package ships.'
                }
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className={`bg-white rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] transition-all overflow-hidden ${
                      isOpen ? 'ring-2 ring-coral/20' : ''
                    }`}
                  >
                    <button 
                      type="button"
                      onClick={() => setOpenFaq(prev => prev === idx ? null : idx)}
                      className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-display font-bold text-base sm:text-lg text-ink gap-4 select-none cursor-pointer hover:bg-black/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-coral/10 text-coral font-black text-xs flex items-center justify-center shrink-0 border border-coral/30">
                          Q
                        </span>
                        <span>{faq.question}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-coral text-white border-coral' : 'bg-[#F4F1EA] text-ink'}`}>
                        <span className="material-symbols-outlined text-lg">expand_more</span>
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-ink/80 leading-relaxed border-t border-ink/10 bg-[#FBF9F5]">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reassurance Footer Banner */}
            <div className="mt-12 p-6 sm:p-8 bg-white rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-display font-black text-ink text-base sm:text-lg">Still have questions before ordering?</h4>
                <p className="text-xs sm:text-sm text-ink-muted mt-1">Our parent support team is here to help 7 days a week.</p>
              </div>
              <Link 
                to="/contact" 
                className="px-6 py-2.5 rounded-xl bg-[#F4F1EA] hover:bg-white border-2 border-ink font-display font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 transition-all text-ink shrink-0"
              >
                Contact Support
              </Link>
            </div>

          </div>
        </section>
      </FadeInUp>

    </div>
  );
}
