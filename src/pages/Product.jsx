import React, { useState, useEffect } from 'react';import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
export default function Product() {
  const { id, slug } = useParams();
  const { addItem, setIsCartOpen } = useCart();
  
  const product = productsData.find(p => p.id === id || p.id === slug || (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)) || productsData[0];
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');  const variants = [
    { id: 0, name: "Starter Pack", price: 109.00, compare: 169.00 },
    { id: 1, name: "Deluxe Atelier Studio", price: 159.00, compare: 229.00 },
    { id: 2, name: "Classroom & Sibling Duo", price: 209.00, compare: 289.00 }
  ];
  const selectedVariantObj = variants[selectedVariant];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, slug]);

  const handleAddToCart = () => {
    addItem({
      ...product,
      id: product.id + '-' + selectedVariant,
      name: product.title + ' - ' + selectedVariantObj.name,
      price: selectedVariantObj.price,
      image: product.images?.[0] || product.thumbnail
    }, qty);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col w-full bg-canvas">
      
{/* BREADCRUMB STRIP & WORKSHOP STATUS */}
<div className="w-full bg-[#F4EFE6] border-b border-ink/5 py-2.5 px-4 sm:px-6 lg:px-8">
<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-ink-muted">
<div className="flex items-center gap-1.5 flex-wrap">
<a className="hover:text-coral transition-colors" href="#">Home</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<a className="hover:text-coral transition-colors" href="#">Screen-Free STEM</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-teal font-bold bg-teal/10 px-2.5 py-0.5 rounded-full">Ages 3–8</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-ink font-bold">Smart Drawing Robot Discovery Pack</span>
</div>
<div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-ink/10 shadow-xs">
<span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
<span className="text-ink font-semibold">Oregon Atelier: Batch #418 In Stock &amp; Testing Passed</span>
</div>
</div>
</div>
{/* HERO PRODUCT SECTION (GALLERY + STICKY BUY BOX) */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
{/* LEFT COLUMN: INTERACTIVE GALLERY (7 cols) */}
<div className="lg:col-span-7 flex flex-col gap-4">
{/* Main Display Frame with Badges & Interactive Stage */}
<div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-white rounded-3xl p-6 sm:p-10 border-2 border-ink shadow-card flex items-center justify-center overflow-hidden">
{/* Top Floating Feature Badges */}
<div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-container text-canvas border-2 border-ink font-bold text-xs shadow-[2px_2px_0px_#1E2A38]">
<span className="material-symbols-outlined text-sm">psychology</span>
                Ages 3–8 • Pediatric OT Approved
              </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-ink border border-ink/10 text-xs font-semibold shadow-sm">
<span className="material-symbols-outlined text-xs text-coral">phonelink_off</span>
                100% Screen-Free &amp; Private
              </span>
</div>
{/* 360 Turntable Pill / Studio Stage Switcher */}
<div className="absolute top-4 right-4 z-20">
<button className="flex items-center gap-1.5 bg-white hover:bg-canvas px-3.5 py-1.5 rounded-full border-2 border-ink shadow-pop-sm text-xs font-bold text-ink transition-transform active:translate-y-0.5" id="turntable-btn" >
<span className="material-symbols-outlined text-sm text-coral">360</span>
<span id="turntable-label">Studio Stage</span>
</button>
</div>
{/* Primary Image Canvas Viewport */}
<div className="relative w-full h-full flex items-center justify-center p-2">
<img alt="ToddsIQ Smart Drawing Robot with companion flashcards and washable markers" className="max-w-full max-h-full object-contain transition-all duration-300 transform scale-100 hover:scale-105 select-none" id="main-hero-image" src="https://lh3.googleusercontent.com/aida/AEtjO1WfTbnziE3cGZBqqWmm3zAIm5hiDcwh6FfOYoRvA4mbf74nEJkjH8sS7DFd_kq6TSabBUMQE_hW3v3HOrUt5l_uPexYeDR7CLNXc-oOFurvU2yy3IUcvdLkzbOZx0dBdEz4g4Dwm-j_9yRAFmJNx3UsGNnFmsIU6nHW6k0XBMP7jv8cjivQKHG7a5Pxcg80M4OpTMQOD0a-7vvecxe2jkXB-5E7ZYCROI5k0g4kdbwAPMccph2SJF8BzxU"/>
</div>
{/* Handwritten Quality Annotation Stamp */}
<div className="absolute bottom-4 left-4 z-20 font-hand text-xl text-ink font-bold bg-[#FFDEAD] px-3 py-1 rounded-lg rotate-[-2deg] border border-ink/20 shadow-xs">
              ★ Zero screen glare • Pure muscle memory
            </div>
{/* Save Badge Overlay */}
<div className="absolute bottom-4 right-4 z-20 bg-coral-container text-canvas border-2 border-ink font-display text-sm font-bold px-3.5 py-1 rounded-xl shadow-[2px_2px_0px_#1E2A38] uppercase tracking-wider">
              Save 31% Today
            </div>
</div>
{/* Thumbnails Strip (Featuring Dataset Images) */}
<div className="grid grid-cols-5 gap-3">
<button className="gallery-thumb active-thumb p-1.5 rounded-2xl bg-white border-2 border-coral shadow-sm transition-transform hover:-translate-y-1" >
<div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
<img alt="Hero Robot Studio" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WfTbnziE3cGZBqqWmm3zAIm5hiDcwh6FfOYoRvA4mbf74nEJkjH8sS7DFd_kq6TSabBUMQE_hW3v3HOrUt5l_uPexYeDR7CLNXc-oOFurvU2yy3IUcvdLkzbOZx0dBdEz4g4Dwm-j_9yRAFmJNx3UsGNnFmsIU6nHW6k0XBMP7jv8cjivQKHG7a5Pxcg80M4OpTMQOD0a-7vvecxe2jkXB-5E7ZYCROI5k0g4kdbwAPMccph2SJF8BzxU"/>
</div>
<span className="block text-center font-display text-xs font-bold text-ink mt-1 truncate">Hero Bot</span>
</button>
<button className="gallery-thumb p-1.5 rounded-2xl bg-white border border-ink/15 shadow-sm transition-transform hover:-translate-y-1" >
<div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
<img alt="Parent and toddler drawing together" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UCzMoOim2ITsDpRd7SvoV4eIPLdZjKYyzVOb9xONKMLbnvTGFFPHsV0iyhN65FZ-2jLRuvlw7eSGONlrS6QOMJ8XHB4de0qLUZp1mSp2Ep4_gMEII_IRcApl99XbzGI0w4AfQUhtkqRSphrS5eGD1OPOULfr1Zfg95gpC7_4SW1FmsKkCkjoe-gGZo2hyXN6AT1-0lZSA52A5dn8j2ZYry9f58Xpt760GKVVLEQP9d8w-BNKXiw5FnNrk"/>
</div>
<span className="block text-center font-display text-xs font-semibold text-ink mt-1 truncate">In-Home Play</span>
</button>
<button className="gallery-thumb p-1.5 rounded-2xl bg-white border border-ink/15 shadow-sm transition-transform hover:-translate-y-1" >
<div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
<img alt="Feeding flashcard into optical eye" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1WNWLD5TKSBWd36gE3UWPRC3km4zz0wGJNegbN9JCEWVxJjqCY-j-jWZ3LMZOD1J4Fypq1DJAfPrd0k-6M_Rq52l2rcTz-17xiaAzNrfyAKpHHqUQgUhCCEjbUolOQD0T6D7fLjf7FqwzdwEsNu6PHk_rrjgeE1FbwZI4NnAW2v8w-XYbm3kHIGYj3m52tft6CwBAhsaovCQ4juPzfNjU-CTMbEBsxUYcRoBvxfioTL4liDJODt7IT7jLN1"/>
</div>
<span className="block text-center font-display text-xs font-semibold text-ink mt-1 truncate">Optical Scan</span>
</button>
<button className="gallery-thumb p-1.5 rounded-2xl bg-white border border-ink/15 shadow-sm transition-transform hover:-translate-y-1" >
<div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
<img alt="Deluxe Atelier setup with colors and flashcards" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VjcNZp39VRe-4WAZ_TG93Jc57VeLExMo8BT5EPxw0GWIjItz4b1r8BVJwn0Cz4nDOPHlHqikZpksuTb3b4bEsHn_seG8HAiyo2a0xUT0SThl6Qo6OWWbKLwYQz6CY1byHHoTLlD_4AujVEkhOzzXgFvn7AmHFMtyR59t1X19Wtkz41fzaBVx4Afx5iWLgayGfKlpxh4EJY25O_C12NBxkOHIhrkC5HvihwWDZfJ3FPJh3nCdC-Lxqc7V8S"/>
</div>
<span className="block text-center font-display text-xs font-semibold text-ink mt-1 truncate">Deluxe Studio</span>
</button>
<button className="gallery-thumb p-1.5 rounded-2xl bg-white border border-ink/15 shadow-sm transition-transform hover:-translate-y-1" >
<div className="aspect-square rounded-xl bg-canvas flex items-center justify-center overflow-hidden">
<img alt="Classroom shared learning environment" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UUMa2KaTDiVRRqy0TN6Lb8QvQFDY0zUZYjsk0rCPRrzxz1-QtlboDxuw-0jdCObpDcFStZkcy5EXWuuv6DzNxCeHh8eXPRH8TkLB3KmHakyL8vuzBpHz4V1cCMK8aXDmQx-l5LqXW54mLQK3D8jsc2S0IAt9Olr97w3VI4wZWPZfFzGYOYryIjZpD2OCZF4361R1f-walVi5vrPJ440MWNXUpiTUgzmbxBE2s9DJpwMKlwW7wBl1euNZo"/>
</div>
<span className="block text-center font-display text-xs font-semibold text-ink mt-1 truncate">Classroom Duo</span>
</button>
</div>
{/* As Featured In Chips */}
<div className="mt-2 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-ink-muted">
<span className="font-display font-bold text-ink uppercase tracking-wider">Clinical Endorsements:</span>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 rounded-full bg-white border border-ink/15 shadow-xs">Parenting Today</span>
<span className="px-3 py-1 rounded-full bg-white border border-ink/15 shadow-xs">Montessori Life</span>
<span className="px-3 py-1 rounded-full bg-white border border-ink/15 shadow-xs">Early Childhood OT</span>
<span className="px-3 py-1 rounded-full bg-white border border-ink/15 shadow-xs">Wired Family</span>
</div>
</div>
</div>
{/* RIGHT COLUMN: STICKY BUY BOX (5 cols) */}
<div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-5">
<div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink shadow-lift flex flex-col gap-6 relative">
{/* Rating & Trust Header */}
<div className="flex items-center justify-between flex-wrap gap-2">
<a className="flex items-center gap-2 group cursor-pointer" href="#reviews-section">
<div className="flex text-marigold text-base">
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: `"FILL" 1`}}>star</span>
</div>
<span className="font-display font-bold text-ink text-base">4.9</span>
<span className="text-xs text-ink-muted underline group-hover:text-coral transition-colors">(5,480+ verified OT &amp; parent reviews)</span>
</a>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal/10 text-teal text-xs font-bold border border-teal/20">
<span className="material-symbols-outlined text-xs">verified</span> Certified Safe
              </span>
</div>
{/* Title & Value Hook */}
<div>
<h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                ToddsIQ™ Smart Drawing Robot
              </h1>
<p className="font-semibold text-sm text-coral mt-1">Complete Discovery Pack • Screen-Free Cognitive Tutor</p>
<p className="text-sm text-ink-muted mt-2 leading-relaxed">
                The gentle robotic tutor that turns drawing into achievable, stroke-by-stroke milestones on real sketch paper. Builds genuine pincer strength, hand-eye coordination, and confidence.
              </p>
</div>
{/* Live Pricing & Stock Urgency */}
<div className="bg-canvas p-4 rounded-2xl border border-ink/10 flex items-center justify-between flex-wrap gap-3">
<div>
<div className="flex items-baseline gap-2.5">
<span className="font-display text-3xl sm:text-4xl font-black text-coral" id="price-display">$109.00</span>
<span className="text-lg text-ink-light line-through font-semibold" id="was-price-display">$169.00</span>
<span className="bg-coral-container text-canvas border-2 border-ink font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wide">Save 31%</span>
</div>
<p className="text-xs text-ink-muted mt-0.5">Taxes included • Free 2-3 Day Express Shipping</p>
</div>
<div className="flex items-center gap-1.5 bg-[#FFDAD6] text-[#93000A] px-3 py-1.5 rounded-xl text-xs font-bold">
<span className="material-symbols-outlined text-sm animate-bounce">bolt</span>
<span>Only 14 left in Batch #418</span>
</div>
</div>
{/* Color Swatch Finishes */}
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between text-xs font-semibold">
<span>Chassis Finish: <strong className="text-coral" id="color-label">Soft Cream &amp; Sage</strong></span>
<span className="text-ink-muted">Matte anti-fingerprint</span>
</div>
<div className="flex items-center gap-3" id="swatch-container">
<button aria-label="Soft Cream" className="color-swatch-btn w-9 h-9 rounded-full bg-[#E8F2EE] border-2 border-coral shadow-pop-sm flex items-center justify-center transition-transform hover:scale-110" >
<span className="w-6 h-6 rounded-full bg-[#F4EFE6] border border-ink/20"></span>
</button>
<button aria-label="Rose Quartz" className="color-swatch-btn w-9 h-9 rounded-full bg-[#FFE5E8] border-2 border-transparent shadow-sm flex items-center justify-center transition-transform hover:scale-110" >
<span className="w-6 h-6 rounded-full bg-[#FF8A9E] border border-ink/20"></span>
</button>
<button aria-label="Sky Aqua" className="color-swatch-btn w-9 h-9 rounded-full bg-[#E0F2FE] border-2 border-transparent shadow-sm flex items-center justify-center transition-transform hover:scale-110" >
<span className="w-6 h-6 rounded-full bg-[#38BDF8] border border-ink/20"></span>
</button>
<button aria-label="Lilac Mist" className="color-swatch-btn w-9 h-9 rounded-full bg-[#F3E8FF] border-2 border-transparent shadow-sm flex items-center justify-center transition-transform hover:scale-110" >
<span className="w-6 h-6 rounded-full bg-[#C084FC] border border-ink/20"></span>
</button>
</div>
</div>
{/* BUNDLE EDITIONS MATRIX (With Specific Tier Images) */}
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between text-xs font-semibold">
<span className="font-display text-sm font-bold text-ink">Choose Discovery Edition:</span>
<span className="text-teal font-bold flex items-center gap-1"><span className="material-symbols-outlined text-xs">verified</span> Guaranteed</span>
</div>
{/* Tier 1: Starter Pack ($89) - uses IMAGE_18 */}
<div onClick={() => setSelectedVariant(0)} className={`tier-card cursor-pointer p-3.5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-card flex items-center gap-3 ${selectedVariant === 0 ? 'border-coral bg-coral/5 shadow-lift -translate-y-1' : 'border-ink/15 bg-white'}`} >
<input className="accent-coral w-4 h-4" name="tier_choice" type="radio" value="89"/>
<div className="w-12 h-12 rounded-xl bg-canvas border border-ink/10 flex items-center justify-center overflow-hidden shrink-0">
<img alt="Starter Pack" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WfTbnziE3cGZBqqWmm3zAIm5hiDcwh6FfOYoRvA4mbf74nEJkjH8sS7DFd_kq6TSabBUMQE_hW3v3HOrUt5l_uPexYeDR7CLNXc-oOFurvU2yy3IUcvdLkzbOZx0dBdEz4g4Dwm-j_9yRAFmJNx3UsGNnFmsIU6nHW6k0XBMP7jv8cjivQKHG7a5Pxcg80M4OpTMQOD0a-7vvecxe2jkXB-5E7ZYCROI5k0g4kdbwAPMccph2SJF8BzxU"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-display font-bold text-sm text-ink">Starter Discovery Pack</span>
<span className="font-display font-bold text-sm text-coral">$89.00</span>
</div>
<p className="text-xs text-ink-muted">Bot + 150 Hardbound Cards + 2 Triangular Washable Markers</p>
</div>
</div>
{/* Tier 2: Deluxe Atelier Studio ($109 - Selected by Default) - uses IMAGE_35 */}
<div onClick={() => setSelectedVariant(1)} className={`tier-card cursor-pointer p-3.5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-card relative flex items-center gap-3 ${selectedVariant === 1 ? 'border-coral bg-coral/5 shadow-lift -translate-y-1' : 'border-ink/15 bg-white'}`} >
{/* Most Popular Ribbon with Marigold */}
<span className="absolute -top-3 right-4 bg-marigold text-ink font-display text-xs font-bold px-3 py-0.5 rounded-full shadow-md border border-ink/10 flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{fontVariationSettings: `"FILL" 1`}}>star</span> MOST POPULAR • 74% Pick
                </span>
<input checked="" className="accent-coral w-4 h-4" name="tier_choice" type="radio" value="109"/>
<div className="w-12 h-12 rounded-xl bg-white border border-ink/10 flex items-center justify-center overflow-hidden shrink-0">
<img alt="Deluxe Atelier" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VjcNZp39VRe-4WAZ_TG93Jc57VeLExMo8BT5EPxw0GWIjItz4b1r8BVJwn0Cz4nDOPHlHqikZpksuTb3b4bEsHn_seG8HAiyo2a0xUT0SThl6Qo6OWWbKLwYQz6CY1byHHoTLlD_4AujVEkhOzzXgFvn7AmHFMtyR59t1X19Wtkz41fzaBVx4Afx5iWLgayGfKlpxh4EJY25O_C12NBxkOHIhrkC5HvihwWDZfJ3FPJh3nCdC-Lxqc7V8S"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-display font-bold text-sm text-ink">Deluxe Atelier Studio</span>
<span className="font-display font-bold text-sm text-coral">$109.00</span>
</div>
<p className="text-xs text-ink-muted">Starter + 12-Color Studio Palette + Canvas Atelier Bag + 50 Wonder Decks</p>
</div>
</div>
{/* Tier 3: Classroom & Sibling Duo ($169) - uses IMAGE_36 */}
<div onClick={() => setSelectedVariant(0)} className={`tier-card cursor-pointer p-3.5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-card flex items-center gap-3 ${selectedVariant === 0 ? 'border-coral bg-coral/5 shadow-lift -translate-y-1' : 'border-ink/15 bg-white'}`} >
<input className="accent-coral w-4 h-4" name="tier_choice" type="radio" value="169"/>
<div className="w-12 h-12 rounded-xl bg-canvas border border-ink/10 flex items-center justify-center overflow-hidden shrink-0">
<img alt="Classroom Duo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UUMa2KaTDiVRRqy0TN6Lb8QvQFDY0zUZYjsk0rCPRrzxz1-QtlboDxuw-0jdCObpDcFStZkcy5EXWuuv6DzNxCeHh8eXPRH8TkLB3KmHakyL8vuzBpHz4V1cCMK8aXDmQx-l5LqXW54mLQK3D8jsc2S0IAt9Olr97w3VI4wZWPZfFzGYOYryIjZpD2OCZF4361R1f-walVi5vrPJ440MWNXUpiTUgzmbxBE2s9DJpwMKlwW7wBl1euNZo"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-center">
<span className="font-display font-bold text-sm text-ink">Classroom &amp; Sibling Duo</span>
<span className="font-display font-bold text-sm text-coral">$169.00</span>
</div>
<p className="text-xs text-ink-muted">2x Complete Robots + 300 Cards + Double 12-Marker Sets + OT Lesson Guide</p>
</div>
</div>
</div>
{/* QTY & ADD TO BAG ACTION BUTTONS */}
<div className="flex flex-col gap-3 pt-2">
<div className="flex items-center gap-3">
{/* Stepper */}
<div className="flex items-center bg-canvas rounded-2xl border-2 border-ink p-1">
<button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="w-9 h-9 flex items-center justify-center font-bold text-ink hover:bg-black/5 rounded-xl transition-colors text-lg" type="button">−</button>
<span className="w-9 text-center font-display font-bold text-base text-ink" id="cart-quantity">{qty}</span>
<button onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="w-9 h-9 flex items-center justify-center font-bold text-ink hover:bg-black/5 rounded-xl transition-colors text-lg" type="button">+</button>
</div>
{/* Main Add to Cart CTA */}
<button onClick={handleAddToCart} className="flex-1 py-4 px-6 rounded-2xl bg-marigold hover:opacity-90 text-ink font-display text-lg font-bold flex items-center justify-center gap-2 border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all" type="button">
<span className="material-symbols-outlined text-xl">{added ? 'check' : 'shopping_bag'}</span>
<span id="cta-button-text">{added ? 'Added to Bag!' : `Add to Toy Bag — ${selectedVariantObj.price.toFixed(2)}`}</span>
</button>
</div>
{/* Quick Express Pay buttons */}
<div className="grid grid-cols-2 gap-2">
<button className="py-2.5 px-3 bg-[#F4F1EA]-highest hover:bg-[#F4F1EA]-highest/80 text-ink border-2 border-ink rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-sm">electric_bolt</span> Apple Pay
                </button>
<button className="py-2.5 px-3 bg-[#E5E7EB] hover:bg-[#D1D5DB] text-ink rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors" type="button">
<span className="material-symbols-outlined text-sm">credit_card</span> Google Pay
                </button>
</div>
</div>
{/* 3 Reassurance Value Props */}
<div className="pt-2 border-t border-ink/10 grid grid-cols-3 gap-2 text-center text-xs text-ink-muted font-medium">
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-teal text-xl">verified_user</span>
<span>30-Day Home Trial</span>
</div>
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-coral text-xl">local_shipping</span>
<span>Dispatched in 24h</span>
</div>
<div className="flex flex-col items-center gap-1">
<span className="material-symbols-outlined text-periwinkle text-xl">eco</span>
<span>CE &amp; ASTM Safe</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* 4-ACCENT BENEFIT TILES ("WHY THIS MATTERS") */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
</section>
{/* INTERACTIVE SLIDING PILL TABS SECTION */}
<section className="w-full py-12 bg-white border-y border-ink/10" id="tabs-section">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Tab Navigation Bar with Sliding Background Pill */}
<div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
<div className="relative bg-canvas p-1.5 rounded-full border-2 border-ink flex items-center shadow-sm" id="pill-tab-container">
{/* Sliding Indicator Pill */}
<button onClick={() => setActiveTab('overview')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'overview' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Overview</button>
<button onClick={() => setActiveTab('included')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'included' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>What's Included</button>
<button onClick={() => setActiveTab('how-to-use')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'how-to-use' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>How to Use</button>
<button onClick={() => setActiveTab('clinical')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'clinical' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Clinical Benefits</button>
<button onClick={() => setActiveTab('safety')} className={`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors ${activeTab === 'safety' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}`}>Age &amp; Safety</button>
</div>
</div>
{/* Tab 1: Overview Panel */}
<div className={`tab-panel grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${activeTab === 'overview' ? '' : 'hidden'}`} id="tab-overview">
<div className="lg:col-span-6 flex flex-col gap-4">
<span className="font-hand text-2xl text-coral">Step-by-step unhurried learning</span>
<h3 className="font-display text-3xl font-extrabold text-ink leading-tight">
              A Patient Companion That Teaches Drawing Stroke by Stroke
            </h3>
<p className="text-sm text-ink-muted leading-relaxed">
              When young children are handed blank paper, cognitive overwhelm is natural. ToddsIQ deconstructs real-world objects into fundamental shapes—circles, arcs, triangles, and dashes. The robot draws one line, verbally explains its trajectory, and then pauses patiently for your child to copy it right next to them.
            </p>
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
</div>
<div className="lg:col-span-6 rounded-3xl overflow-hidden border-2 border-ink shadow-card">
<img alt="Mother and toddler interacting with drawing bot" className="w-full h-80 lg:h-96 object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UCzMoOim2ITsDpRd7SvoV4eIPLdZjKYyzVOb9xONKMLbnvTGFFPHsV0iyhN65FZ-2jLRuvlw7eSGONlrS6QOMJ8XHB4de0qLUZp1mSp2Ep4_gMEII_IRcApl99XbzGI0w4AfQUhtkqRSphrS5eGD1OPOULfr1Zfg95gpC7_4SW1FmsKkCkjoe-gGZo2hyXN6AT1-0lZSA52A5dn8j2ZYry9f58Xpt760GKVVLEQP9d8w-BNKXiw5FnNrk"/>
</div>
</div>
{/* Tab 2: What's Included Panel */}
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
{/* Tab 3: How to Use Panel */}
<div className={`tab-panel grid grid-cols-1 md:grid-cols-3 gap-6 ${activeTab === 'how-to-use' ? '' : 'hidden'}`} id="tab-how">
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
{/* Tab 4: Clinical Benefits Panel */}
<div className={`tab-panel bg-canvas p-8 rounded-3xl border-2 border-ink ${activeTab === 'clinical' ? '' : 'hidden'}`} id="tab-benefits">
<div className="max-w-3xl mx-auto flex flex-col gap-4">
<span className="text-teal font-display font-bold text-sm uppercase tracking-wider">Occupational Therapy Assessment</span>
<h3 className="font-display text-2xl font-extrabold text-ink">Why Physical Marker Resistance Beats Glass Tablets</h3>
<p className="text-sm text-ink-muted leading-relaxed">
              Touchscreens provide zero proprioceptive feedback. A finger gliding across slick glass does not develop the lumbrical muscles in the hand necessary to stabilize a pencil in kindergarten. ToddsIQ pairs authentic fiber nib resistance on real toothy sketch paper with patient audio pacing.
            </p>
</div>
</div>
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
</section>

{/* INTERACTIVE VIDEO-REVIEW CAROUSEL & TESTIMONIALS */}
<section className="w-full py-16 bg-[#F4EFE6] border-y border-ink/10" id="reviews-section">
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
<img alt="Leo drawing video diary" className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida/AEtjO1UCzMoOim2ITsDpRd7SvoV4eIPLdZjKYyzVOb9xONKMLbnvTGFFPHsV0iyhN65FZ-2jLRuvlw7eSGONlrS6QOMJ8XHB4de0qLUZp1mSp2Ep4_gMEII_IRcApl99XbzGI0w4AfQUhtkqRSphrS5eGD1OPOULfr1Zfg95gpC7_4SW1FmsKkCkjoe-gGZo2hyXN6AT1-0lZSA52A5dn8j2ZYry9f58Xpt760GKVVLEQP9d8w-BNKXiw5FnNrk"/>
<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
<div className="w-10 h-10 rounded-full bg-coral-container text-canvas border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex items-center justify-center">
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
<img alt="Sibling collaboration session" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UUMa2KaTDiVRRqy0TN6Lb8QvQFDY0zUZYjsk0rCPRrzxz1-QtlboDxuw-0jdCObpDcFStZkcy5EXWuuv6DzNxCeHh8eXPRH8TkLB3KmHakyL8vuzBpHz4V1cCMK8aXDmQx-l5LqXW54mLQK3D8jsc2S0IAt9Olr97w3VI4wZWPZfFzGYOYryIjZpD2OCZF4361R1f-walVi5vrPJ440MWNXUpiTUgzmbxBE2s9DJpwMKlwW7wBl1euNZo"/>
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
</section>
{/* EXPLODED INVENTORY: WHAT'S IN THE BOX */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
</section>
{/* TECHNICAL & PEDIATRIC SPECIFICATIONS TABLE */}
<section className="w-full py-16 bg-white border-y border-ink/10">
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
</section>
{/* EDITION COMPARISON MATRIX */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="compare-editions">
<div className="text-center max-w-2xl mx-auto mb-12">
<span className="font-hand text-2xl text-coral">Choose the Right Tier</span>
<h2 className="font-display text-3xl font-extrabold text-ink mt-1">Edition Comparison Matrix</h2>
</div>
<div className="overflow-x-auto pb-4">
<div className="min-w-[680px] bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink shadow-lift">
<div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-ink/10 items-end">
<div className="font-display font-bold text-xs uppercase tracking-wider text-ink-muted">Core Features</div>
<div className="text-center">
<h5 className="font-display font-bold text-base text-ink">Starter Pack</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">$89.00</p>
</div>
<div className="text-center p-3 rounded-2xl bg-coral/10 border-2 border-coral relative">
<span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-marigold text-ink text-[10px] font-display font-black px-2 py-0.5 rounded-full border border-ink/10">MOST POPULAR</span>
<h5 className="font-display font-bold text-base text-ink">Deluxe Atelier</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">$109.00</p>
</div>
<div className="text-center">
<h5 className="font-display font-bold text-base text-ink">Classroom Duo</h5>
<p className="font-display text-xl font-bold text-coral mt-0.5">$169.00</p>
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
</section>
{/* CONSUMABLES & ATELIER CROSS-SELL STRIP */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-ink/10">
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
<span className="font-display font-bold text-base text-coral">$9.99</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">12-Color Triangular Marker Set</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Ultra-washable natural dye formula with ergonomic triangular barrels fitting the bot collar.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ($9.99)
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
<span className="font-display font-bold text-base text-coral">$19.00</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">150 Space &amp; Architecture Cards</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Solar system planets, rockets, ancient pyramids, and world monuments for advanced learners.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ($19.00)
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
<span className="font-display font-bold text-base text-coral">$69.00</span>
</div>
<h4 className="font-display font-bold text-base text-ink mt-1">MagTrack™ 3D Flexible Train Track</h4>
<p className="text-xs text-ink-muted mt-1 leading-relaxed">Modular magnetic track system that connects directly with your toddler's hand-drawn roadmaps.</p>
</div>
<button className="mt-4 w-full py-2.5 px-4 bg-canvas hover:bg-[#eae4d8] text-ink font-display font-bold text-xs rounded-xl border border-ink shadow-pop-sm flex items-center justify-center gap-1.5 transition-all"  type="button">
<span className="material-symbols-outlined text-base">add</span> Quick Add ($69.00)
          </button>
</div>
</div>
</section>
{/* FAQ ACCORDION */}
<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="faq-section">
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
</section>

    </div>
  );
}
