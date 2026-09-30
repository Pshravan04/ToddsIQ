import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Play, Check, Shield, Truck, Star, ChevronDown, Plus, Minus, Info } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

export default function Product() {
  const { id, slug } = useParams();
  const { addItem } = useCart();
  
  // Find product by id or slug/handle
  const product = productsData.find(p => p.id === id || p.id === slug || (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug));
  
  const [activeMedia, setActiveMedia] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('benefits');
  const [openFaq, setOpenFaq] = useState(null);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, slug]);

  if (!product) return (
    <div className="text-center py-24 bg-surface min-h-screen">
      <h2 className="font-display-hero text-4xl text-on-surface mb-4">Product not found</h2>
      <Link to="/" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-label-lg text-on-primary">Return Home</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.thumbnail].filter(Boolean);
  
  // Build media array including the video if present
  const allMedia = [
    ...images.map(img => ({ type: 'image', src: img })),
  ];
  if (product.video) {
    allMedia.splice(1, 0, { type: 'video', src: product.video, thumb: images[0] });
  }

  const currentMedia = allMedia[activeMedia] || allMedia[0];
  
  // Build variants
  const hasOptions = product.options && product.options.length > 0 && product.options[0].values;
  const variants = hasOptions ? product.options[0].values.map((v, idx) => ({
    id: idx,
    name: v,
    subtitle: '',
    price: product.price, // in reality, map this to real variant prices if available
    compare: product.compareAtPrice,
    save: product.compareAtPrice ? `SAVE $${(product.compareAtPrice - product.price).toFixed(2)}` : null
  })) : [
    { id: 0, name: 'Standard Edition', subtitle: '', price: product.price, compare: product.compareAtPrice || null, save: null }
  ];

  // For the drawing bot or other specific items, override with specific data if needed, but we keep it dynamic here.
  const currentVariant = variants[selectedVariant];

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: product.id + '-' + currentVariant.id,
      name: hasOptions ? `${product.title} (${currentVariant.name})` : product.title,
      price: currentVariant.price,
      image: images[0]
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const tabs = [
    { id: 'benefits', label: 'Benefits' },
    { id: 'how-to', label: 'How to Use' },
    { id: 'whats-in-box', label: "What's in the Box" },
    { id: 'age-safety', label: 'Age & Safety' }
  ];

  const rating = product.rating || 4.9;
  const reviewsCount = product.reviews || Math.floor(Math.random() * 500) + 50;

  const videoReviews = [
    { id: 1, video: 'https://cdn.shopify.com/videos/c/o/v/6148281144a046c8b9db5e665979eb46.mp4', thumb: images[0], name: '@creativemom', text: product.testimony || "My child hasn't stopped playing since we got this!" },
    { id: 2, video: 'https://cdn.shopify.com/videos/c/o/v/6148281144a046c8b9db5e665979eb46.mp4', thumb: images[1] || images[0], name: '@teacher_sarah', text: "Perfect for fine motor skills development." },
    { id: 3, video: 'https://cdn.shopify.com/videos/c/o/v/6148281144a046c8b9db5e665979eb46.mp4', thumb: images[2] || images[0], name: '@dadofthree', text: "Finally, a toy that actually holds their attention." },
  ];

  const reviews = [
    { id: 1, author: 'Sarah M.', rating: 5, date: 'Oct 12, 2025', text: product.testimony || 'My child loves this! It keeps them engaged for hours.' },
    { id: 2, author: 'David T.', rating: 5, date: 'Oct 05, 2025', text: 'Great alternative to screen time. Very durable and premium quality.' },
    { id: 3, author: 'Emily R.', rating: 4, date: 'Sep 28, 2025', text: 'Fun product, exactly as described on the website.' },
  ];

  const isDrawingRobot = product.title.toLowerCase().includes('bot') || product.title.toLowerCase().includes('robot');

  return (
    <div className="flex flex-col w-full bg-surface">
      
      {/* Breadcrumbs */}
      <section className="w-full bg-surface-container-low px-gutter py-space-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
          <nav className="flex items-center gap-2">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span className="text-outline">/</span>
            <Link className="hover:text-primary transition-colors" to="/collections/all">Catalog</Link>
            <span className="text-outline">/</span>
            <span className="text-on-surface font-bold truncate max-w-[200px]">{product.title}</span>
          </nav>
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Awarded 2025 Creative Child Magazine Product of the Year</span>
          </div>
        </div>
      </section>

      {/* Main Hero & Buy Box */}
      <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-2xl">
          {/* Left: Gallery */}
          <div className="flex-1 w-full flex flex-col gap-space-md">
            <div className="relative w-full aspect-square rounded-3xl bg-surface-container-high overflow-hidden shadow-sm">
               {currentMedia.type === 'video' ? (
                currentMedia.src.includes('youtube.com') || currentMedia.src.includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full object-cover" 
                    src={currentMedia.src.replace('watch?v=', 'embed/')} 
                    title="Product Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                ) : (
                  <video 
                    src={currentMedia.src} 
                    poster={currentMedia.thumb}
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <img 
                  src={currentMedia.src} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Thumbnails */}
            {allMedia.length > 1 && (
              <div className="flex gap-space-sm overflow-x-auto pb-2 snap-x scrollbar-hide">
                {allMedia.map((media, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveMedia(idx)}
                    className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 snap-start ${activeMedia === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img 
                      src={media.type === 'video' ? media.thumb : media.src} 
                      alt="thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                        <Play size={24} fill="currentColor" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Buy Box */}
          <div className="flex-1 w-full flex flex-col">
            <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-surface mb-space-sm">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="flex text-tertiary-container">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="font-label-lg text-on-surface">{rating.toFixed(1)}</span>
              <span className="font-body-md text-on-surface-variant underline cursor-pointer">({reviewsCount} Reviews)</span>
            </div>

            <p className="font-body-lg text-on-surface-variant mb-space-lg line-clamp-4">
              {product.description}
            </p>

            <div className="flex items-baseline gap-space-sm mb-space-lg">
              <span className="font-headline-lg text-on-surface">${currentVariant.price.toFixed(2)}</span>
              {currentVariant.compare && (
                <span className="font-body-lg text-outline line-through">${currentVariant.compare.toFixed(2)}</span>
              )}
            </div>

            {/* Variants */}
            {variants.length > 1 && (
              <div className="flex flex-col gap-space-sm mb-space-xl">
                <h3 className="font-label-lg text-on-surface">Select Option:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {variants.map((v, i) => (
                    <button 
                      key={v.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`relative flex flex-col items-start p-space-md rounded-2xl border-2 text-left transition-all ${selectedVariant === i ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface'}`}
                    >
                      {i === 1 && (
                        <span className="absolute -top-3 left-4 px-2 py-0.5 bg-primary-container text-on-primary font-label-sm rounded-full">
                          Most Popular
                        </span>
                      )}
                      <span className="font-label-lg text-on-surface">{v.name}</span>
                      {v.subtitle && <span className="font-body-sm text-on-surface-variant mt-1">{v.subtitle}</span>}
                      <div className="flex items-center gap-2 mt-2 w-full justify-between">
                        <span className="font-label-md text-on-surface">${v.price}</span>
                        {v.save && <span className="font-label-sm text-primary">{v.save}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-space-md mb-space-lg mt-auto">
              <div className="flex items-center justify-between border-2 border-outline-variant rounded-full h-14 px-space-md sm:w-32">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-on-surface-variant hover:text-on-surface">
                  <Minus size={20} />
                </button>
                <span className="font-label-lg text-on-surface">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-on-surface-variant hover:text-on-surface">
                  <Plus size={20} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-full bg-primary text-on-primary font-label-lg flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors"
              >
                {added ? (
                  <><Check size={20} /> Added to Cart</>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-space-md py-space-md border-t border-outline-variant">
              <div className="flex items-center gap-2 font-label-sm text-on-surface-variant">
                <Truck size={20} className="text-tertiary-container" />
                Free Shipping over $50
              </div>
              <div className="flex items-center gap-2 font-label-sm text-on-surface-variant">
                <Shield size={20} className="text-tertiary-container" />
                30-Day Guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Slider Section */}
      {images.length >= 2 && (
        <section className="w-full py-space-2xl bg-surface-container-lowest">
          <div className="max-w-5xl mx-auto px-gutter flex flex-col md:flex-row items-center gap-space-2xl">
            <div className="flex-1 w-full">
              <h2 className="font-headline-lg text-on-surface mb-space-sm">See the Transformation</h2>
              <p className="font-body-lg text-on-surface-variant mb-space-lg">
                Discover the ToddsIQ difference. Experience premium design and engaging play patterns that captivate instantly.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-container text-on-primary rounded-full flex items-center justify-center font-bold">1</div>
                <p className="font-body-md text-on-surface-variant">Drag the slider to compare.</p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <BeforeAfterSlider beforeImage={images[1]} afterImage={images[0]} />
            </div>
          </div>
        </section>
      )}

      {/* Tabs Section */}
      <section className="w-full border-t border-outline-variant bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-outline-variant">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-space-lg py-space-md font-label-lg whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="py-space-xl min-h-[300px]">
            {activeTab === 'benefits' && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-space-lg">
                <div className="bg-surface p-space-lg rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-primary-container text-on-primary rounded-xl flex items-center justify-center mb-4">
                    <Star size={24} />
                  </div>
                  <h3 className="font-title-md text-on-surface mb-2">Screen-Free Learning</h3>
                  <p className="font-body-md text-on-surface-variant">Keeps kids engaged without relying on digital screens, promoting healthier play habits.</p>
                </div>
                <div className="bg-surface p-space-lg rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center mb-4">
                    <Check size={24} />
                  </div>
                  <h3 className="font-title-md text-on-surface mb-2">Fine Motor Skills</h3>
                  <p className="font-body-md text-on-surface-variant">Tactile interactions help develop crucial pre-writing and coordination skills.</p>
                </div>
                <div className="bg-surface p-space-lg rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center mb-4">
                    <Shield size={24} />
                  </div>
                  <h3 className="font-title-md text-on-surface mb-2">Builds Confidence</h3>
                  <p className="font-body-md text-on-surface-variant">Step-by-step challenges ensure kids feel successful with every milestone.</p>
                </div>
              </div>
            )}
            {activeTab === 'how-to' && (
              <div className="max-w-3xl font-body-lg text-on-surface-variant space-y-4">
                <h3 className="font-headline-sm text-on-surface mb-4">Simple, Intuitive Play</h3>
                <p className="font-body-md">{product.description}</p>
                <div className="mt-8 p-space-md bg-secondary-container text-on-secondary-container rounded-xl flex gap-4">
                  <Info className="shrink-0" />
                  <p className="font-body-md">Tip: Play alongside your child for the first few sessions to guide their discovery process.</p>
                </div>
              </div>
            )}
            {activeTab === 'whats-in-box' && (
              <ul className="grid sm:grid-cols-2 gap-space-md max-w-3xl">
                <li className="flex items-center gap-3 p-space-sm bg-surface rounded-lg font-body-md text-on-surface shadow-sm"><Check className="text-primary"/> Premium ToddsIQ Base Unit</li>
                <li className="flex items-center gap-3 p-space-sm bg-surface rounded-lg font-body-md text-on-surface shadow-sm"><Check className="text-primary"/> Interactive Learning Accessories</li>
                <li className="flex items-center gap-3 p-space-sm bg-surface rounded-lg font-body-md text-on-surface shadow-sm"><Check className="text-primary"/> Durable Storage Solution</li>
                <li className="flex items-center gap-3 p-space-sm bg-surface rounded-lg font-body-md text-on-surface shadow-sm"><Check className="text-primary"/> Quick Start Guide</li>
              </ul>
            )}
            {activeTab === 'age-safety' && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center font-display-hero text-2xl text-on-surface">{product.ageBand || '3+'}</div>
                  <div>
                    <h4 className="font-label-lg text-on-surface">Recommended Age</h4>
                    <p className="font-body-md text-on-surface-variant">Perfect for children ages {product.ageBand || '3 and up'}.</p>
                  </div>
                </div>
                <p className="font-body-md text-on-surface-variant mb-4">
                  <strong>Safety First:</strong> Made from BPA-free, non-toxic materials. All edges are rounded for safe play. 
                </p>
                <p className="font-body-md text-on-surface-variant">
                  Meets or exceeds all ASTM F963 and CPSIA toy safety standards.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Reviews / UGC Carousel */}
      <section className="w-full py-space-3xl bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto px-gutter mb-space-xl text-center">
          <h2 className="font-headline-lg text-on-surface mb-space-sm">See It In Action</h2>
          <p className="font-body-lg text-on-surface-variant">Real families, real fun.</p>
        </div>
        <div className="flex gap-space-md overflow-x-auto px-gutter pb-8 snap-x scrollbar-hide">
          {videoReviews.map(review => (
            <div key={review.id} className="relative w-72 h-[480px] shrink-0 rounded-3xl overflow-hidden snap-center group">
              <video 
                src={review.video} 
                poster={review.thumb}
                muted loop playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-space-lg text-white">
                <div className="flex items-center gap-2 mb-2 text-tertiary-fixed">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-label-md mb-1 opacity-90">{review.name}</p>
                <p className="font-body-sm line-clamp-3">"{review.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews & Ratings */}
      <section className="w-full py-space-3xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <h2 className="font-headline-lg text-on-surface mb-space-xl text-center">Customer Reviews</h2>
          <div className="grid md:grid-cols-[300px_1fr] gap-space-2xl">
            {/* Aggregate Score */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display-hero text-6xl text-on-surface">{rating.toFixed(1)}</span>
                <span className="font-headline-sm text-on-surface-variant">/ 5</span>
              </div>
              <div className="flex text-tertiary-container mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="font-body-md text-on-surface-variant mb-6">Based on {reviewsCount} reviews</p>
              <button className="w-full h-12 rounded-full border-2 border-primary text-primary font-label-lg hover:bg-primary/5 transition-colors">
                Write a Review
              </button>
            </div>
            {/* Review List */}
            <div className="flex flex-col gap-space-lg">
              {reviews.map(review => (
                <div key={review.id} className="p-space-lg bg-surface-container-lowest rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-label-lg text-on-surface">
                        {review.author[0]}
                      </div>
                      <div>
                        <h4 className="font-label-lg text-on-surface">{review.author}</h4>
                        <div className="flex text-tertiary-container mt-1">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                           ))}
                        </div>
                      </div>
                    </div>
                    <span className="font-body-sm text-on-surface-variant">{review.date}</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-gutter">
          <h2 className="font-headline-lg text-on-surface mb-space-xl text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: 'What age is this suitable for?', a: `We recommend this for ages ${product.ageBand || '3 and up'}. The components are safe and durable for young children.` },
              { q: 'What materials are used?', a: 'All our products are manufactured with child-safe, non-toxic materials meeting global safety standards.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you or your child are not completely satisfied, simply return it.' },
            ].map((faq, i) => (
              <div key={i} className="bg-surface rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-space-lg flex justify-between items-center text-left"
                >
                  <span className="font-title-md text-on-surface">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-space-lg pb-space-lg font-body-md text-on-surface-variant">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};
