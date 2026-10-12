import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../services/shopify/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

import VideoCarousel from '../components/VideoCarousel';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [quizAge, setQuizAge] = useState('3-5');
  const [quizGoal, setQuizGoal] = useState('creative');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [activeBestsellerTab, setActiveBestsellerTab] = useState('All Ages');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts(250);
      setProductsData(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const featured = productsData.slice(0, 8);

  const CURATED_BESTSELLERS = {
    'All Ages': [
      'drawing-robot',
      '3dmagictracktrainset',
      'toddsiq-magtrack',
      'toddsiq-nestwood-full-pack',
      'toddsiq-spark'
    ],
    'Ages 1–3': [
      'toddsiq-nestwood-full-pack',
      'toddsiq-pippo',
      'toddsiq-chime',
      'toddsiq-squishblocks',
      'toddsiq-aquadoodle-book'
    ],
    'Ages 3–5': [
      'drawing-robot',
      '3dmagictracktrainset',
      'toddsiq-magtrack',
      'toddsiq-quarry',
      'toddsiq-lingo'
    ],
    'Ages 5+': [
      'toddsiq-spark',
      'toddsiq-microscope-explorer',
      'toddsiq-clash',
      'toddsiq-snaptalk-duo',
      'toddsiq-fracsnap'
    ]
  };

  const filteredBestsellers = productsData.filter(product => {
    if (activeBestsellerTab === 'All Ages') return true;

    const age = product.ageBand || '';
    const tags = product.categories || [];

    if (activeBestsellerTab.includes('1-3') || activeBestsellerTab.includes('1–3')) {
      return age === '1-3' || tags.some(t => t.includes('1-3') || t.toLowerCase().includes('toddler'));
    }
    if (activeBestsellerTab.includes('3-5') || activeBestsellerTab.includes('3–5')) {
      return age === '3-5' || tags.some(t => t.includes('3-5') || t.toLowerCase().includes('preschool'));
    }
    if (activeBestsellerTab.includes('5+')) {
      return age === '5+' || tags.some(t => t.includes('5+') || t.toLowerCase().includes('big kids'));
    }
    return true;
  });

  const tabCurated = CURATED_BESTSELLERS[activeBestsellerTab] || CURATED_BESTSELLERS['All Ages'];
  const sortedBestsellers = [...filteredBestsellers].sort((a, b) => {
    const handleA = (a.handle || a.id || a.slug || '').toLowerCase().replace(/^toddsiq-/, '');
    const handleB = (b.handle || b.id || b.slug || '').toLowerCase().replace(/^toddsiq-/, '');
    const idxA = tabCurated.findIndex(k => k.toLowerCase().replace(/^toddsiq-/, '') === handleA);
    const idxB = tabCurated.findIndex(k => k.toLowerCase().replace(/^toddsiq-/, '') === handleB);
    const rankA = idxA !== -1 ? idxA : 999;
    const rankB = idxB !== -1 ? idxB : 999;
    return rankA - rankB;
  });

  // Exactly 5 products per age group
  const displayBestsellers = sortedBestsellers.slice(0, 5);

  const CURATED_QUIZ_MATCHES = {
    '1-3': {
      creative: ['toddsiq-aquadoodle-book', 'toddsiq-nestwood-full-pack', 'toddsiq-squishblocks'],
      stem: ['toddsiq-count-crew-full-pack', 'toddsiq-blocks-full-pack', 'toddsiq-nestwood-full-pack'],
      focus: ['toddsiq-nestwood-full-pack', 'toddsiq-chime', 'toddsiq-squishblocks'],
      phonics: ['toddsiq-pippo', 'toddsiq-count-crew-full-pack', 'toddsiq-chime']
    },
    '3-5': {
      creative: ['drawing-robot', 'toddsiq-magic-gel', 'toddsiq-sandlab'],
      stem: ['3dmagictracktrainset', 'toddsiq-magtrack', 'toddsiq-buildbox'],
      focus: ['toddsiq-quarry', 'drawing-robot', 'toddsiq-shapecrew'],
      phonics: ['toddsiq-lingo', 'toddsiq-wordplay', 'drawing-robot']
    },
    '5+': {
      creative: ['toddsiq-pixelforge', 'toddsiq-fracsnap', 'toddsiq-microscope-explorer'],
      stem: ['toddsiq-spark', 'toddsiq-microscope-explorer', 'toddsiq-clash'],
      focus: ['toddsiq-microscope-explorer', 'toddsiq-clash', 'toddsiq-spark'],
      phonics: ['toddsiq-fracsnap', 'toddsiq-spell-play-full-pack', 'toddsiq-readladder']
    }
  };

  const GOAL_LABELS = {
    creative: 'Creative Drawing & Fine Motor Control',
    stem: 'Spatial STEM & Building Physics',
    focus: 'Deep Calm Focus (Zero Screen Meltdowns)',
    phonics: 'Early Phonics, Words & Math Numbers'
  };

  const getQuizMatches = () => {
    const curatedKeys = CURATED_QUIZ_MATCHES[quizAge]?.[quizGoal] || CURATED_QUIZ_MATCHES['3-5'].creative;
    const matches = curatedKeys.map(targetKey => {
      const cleanKey = targetKey.replace(/^toddsiq-/, '');
      return productsData.find(p => {
        const handle = (p.handle || p.id || p.slug || '').toLowerCase().replace(/^toddsiq-/, '');
        return handle === cleanKey;
      });
    }).filter(Boolean);

    if (matches.length < 3) {
      const remaining = productsData.filter(p => {
        const pAge = p.ageBand || '';
        const tags = (p.categories || []).map(c => (c || '').toLowerCase());
        const ageMatch = quizAge === '1-3' ? (pAge === '1-3' || tags.some(t => t.includes('1-3') || t.includes('toddler')))
                       : quizAge === '3-5' ? (pAge === '3-5' || tags.some(t => t.includes('3-5') || t.includes('preschool')))
                       : (pAge === '5+' || tags.some(t => t.includes('5+') || t.includes('big kid')));
        return ageMatch && !matches.some(m => m.id === p.id);
      });
      matches.push(...remaining.slice(0, 3 - matches.length));
    }

    return matches.slice(0, 3);
  };

  const quizMatches = getQuizMatches();

  const getCollectionLink = (tab) => {
    if (tab.includes('1-3') || tab.includes('1–3')) return { path: '/collections/toddler', label: 'Explore All Ages 1–3 Toys' };
    if (tab.includes('3-5') || tab.includes('3–5')) return { path: '/collections/preschool', label: 'Explore All Ages 3–5 Toys' };
    if (tab.includes('5+')) return { path: '/collections/big-kids', label: 'Explore All Ages 5+ Toys' };
    return { path: '/collections/best-sellers', label: 'Explore All Best Sellers' };
  };

  const carouselRef = useRef(null);
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    addItem({ ...product, price: product.price }, 1);
  };

  return (
    <>
      <div className="flex flex-col w-full overflow-hidden">

<FadeInUp><section className="relative w-full flex items-center overflow-hidden py-8 lg:py-10">
  {/* Background Image & Gradient Overlays */}
  <div className="absolute inset-0 z-0 bg-[#F4F1EA]">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      poster="/hero-bg.png"
      className="w-full h-full object-cover object-[70%_center] md:object-center opacity-90"
    >
      <source src="https://cdn.shopify.com/videos/c/vp/50d3a54b41a54dc6abda9f55073142ed/50d3a54b41a54dc6abda9f55073142ed.HD-1080p-7.2Mbps-21272719.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-transparent md:w-[70%] lg:w-[60%]"></div>
  </div>

  <div className="max-w-7xl mx-auto w-full px-gutter relative z-10 py-2">
    <div className="max-w-xl flex flex-col gap-3 lg:gap-4">
      

      {/* Kicker Badge */}
      <div className="inline-flex items-center gap-2 self-start bg-transparent border border-[#d1d9e0] px-4 py-1.5 rounded-full text-[#0b3359] font-bold text-sm tracking-wide shadow-sm bg-white/30 backdrop-blur-sm">
        ⭐ Award-Winning Screen-Free STEM Toys
      </div>

      {/* Headline */}
      <h1 className="font-display-hero text-3xl md:text-4xl lg:text-5xl text-[#0b3359] font-black tracking-tight leading-tight">
        Spark Brilliant Minds With <span className="text-[#f58f29] relative inline-block z-10">100% Screen-Free<svg className="absolute -bottom-1 left-0 w-full h-3 text-[#fcd5a0] -z-10" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,15 C50,0 150,0 200,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg></span> Play.
      </h1>

      {/* Description */}
      <p className="font-body-lg text-sm md:text-base text-[#0b3359]/80 max-w-lg leading-snug">
        Help your child develop focus, fine motor skills, and creative confidence. ToddsIQ™ physical drawing robots and tactile building kits turn screen time into hours of independent, joyful learning.
      </p>

      {/* Key Benefit Bullets */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2 font-body-md text-[#0b3359]/90 font-semibold text-sm">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#10B981] text-[18px]">check_circle</span> 
          100% Screen-Free
        </div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#10B981] text-[18px]">check_circle</span> 
          STEM & Montessori
        </div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#10B981] text-[18px]">check_circle</span> 
          150+ Activities
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Link className="px-5 py-2.5 bg-coral text-canvas rounded-xl border-2 border-ink font-label-lg text-sm shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2" to="/collections/best-sellers">
          <span>Shop Now</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
        <Link className="px-5 py-2.5 bg-transparent text-[#0b3359] rounded-xl border-2 border-[#0b3359] font-label-lg text-sm font-bold shadow-sm hover:bg-white/50 backdrop-blur-sm transition-all flex items-center gap-2" to="/collections">
          <span>🧩</span>
          <span>Take the 30s Toy Quiz</span>
        </Link>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex -space-x-3">
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Parent" />
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=5" alt="Parent" />
          <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=9" alt="Parent" />
        </div>
        <div className="font-display-hero text-2xl font-bold text-[#0b3359]">+28k</div>
        <div className="flex flex-col ml-2">
          <div className="flex text-[#f58f29] text-sm">
            ★★★★★
          </div>
          <span className="font-body-sm text-xs text-[#0b3359]/70 mt-0.5">
            4.9/5 rating from verified parents
          </span>
        </div>
      </div>
    </div>
  </div>
</section></FadeInUp>

<FadeInUp><section className="w-full bg-[#F4F1EA]-high border-y-2 border-ink py-space-xl">
  <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-3xl">👁️</span>
      <h3 className="font-display font-bold text-ink">100% Screen-Free</h3>
      <p className="font-body-sm text-sm text-ink-variant">Zero digital eye strain or addictive algorithms</p>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-3xl">🧠</span>
      <h3 className="font-display font-bold text-ink">STEM &amp; Montessori</h3>
      <p className="font-body-sm text-sm text-ink-variant">Builds pincer grasp &amp; spatial reasoning</p>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-3xl">🛡️</span>
      <h3 className="font-display font-bold text-ink">Child-Safe &amp; Non-Toxic</h3>
      <p className="font-body-sm text-sm text-ink-variant">BPA-free, lab-tested, ultra-durable materials</p>
    </div>
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-3xl">📦</span>
      <h3 className="font-display font-bold text-ink">30-Day Risk-Free Trial</h3>
      <p className="font-body-sm text-sm text-ink-variant">Love it or return it for a 100% full refund</p>
    </div>
  </div>
</section></FadeInUp>

<FadeInUp><section id="catalog" className="w-full px-gutter py-space-2xl bg-canvas">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">TAILORED DEVELOPMENTAL STAGES</span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Find the Perfect Match for Your Child's Age</h2>
</div>
<p className="font-body-md text-body-md text-ink-variant max-w-md">
          Every kit is precision-calibrated for growing neural connections, pincer-grasp coordination, and open-ended experimentation.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<div className="group bg-[#F4F1EA]-lowest rounded-3xl p-space-lg border-2 border-ink shadow-[5px_5px_0px_#1E2A38] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1E2A38] transition-all flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold border border-ink">
                Ages 1–3
              </span>
</div>
<div className="h-44 rounded-2xl bg-[#F4F1EA]-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A toddler sitting at a low blonde wood Montessori sensory table grasping pastel wooden nesting blocks and soft textured silicone stacking toys under clean diffused daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdncwwO8LdzpCjcM_8f54wBrSVuoAmdBlSyj7qvd2FTVra_sFR5AqaEr8WaAM5enVg7iyLnYRGQZ1NksEuqSOk2qf_DYkm3VAZY1Yz5jTaqCfm3YF46u1w0clbaCiZem6LA-cUqGgnPTbi-q_kKOblCaUq8EZGpL2zDbjfH3h9_tcKbKJqF1KkpZABJ9W4cQEH8ym-cAV4D_wbVRvcUTIOkN8ATeaDYBPgPmsoRme8KLqhdlho1AS5CA"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-canvas">
<span className="font-label-md text-label-md font-bold block">First Marks &amp; Grasp</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-ink">Toddler Play</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Sensory exploration, first strokes, tactile discovery, grasp &amp; soft nesting geometry.</p>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-[#0b3359] hover:bg-[#0b3359]/90 text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-colors flex items-center justify-center gap-1" to="/collections/toddler">
<span className="">Shop Ages 1–3</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>

<div className="group bg-[#F4F1EA]-lowest rounded-3xl p-space-lg border-2 border-ink shadow-[5px_5px_0px_#1E2A38] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1E2A38] transition-all flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-coral text-canvas font-label-sm text-label-sm font-bold border border-ink">
                Ages 3–5
              </span>
</div>
<div className="h-44 rounded-2xl bg-[#F4F1EA]-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A focused 4-year-old child and smiling mother collaborating with a pastel pink smart drawing machine on a sunlit wooden craft table, tracing lines with washable pens beside illustrated word flashcards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgSoyDMhkUpIS3bFZZWFyz5m9QcC7QYTnNcI184BzgckUZctEFnqyDbwK0nn5u97TX_xrjDbBhoJg0d_CbmNQWmhW10cQrsjYTLEzOonX2RZgLFIiSsvXIHNK8hev9D3Bu3wQYQlbRTvOJ1nOW66FtmaGydIVx0qPtlY-u0u93TJe2QP_5olPfUjI1w9W-SLMYwsul5-DkmhVGwvsbQqRnFmq7xrapCpczxa-icY-U_JC5SnowUlh_dw"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-canvas">
<span className="font-label-md text-label-md font-bold block">Guided Drawing &amp; Phonics</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-ink">Preschool &amp; Pre-K</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Guided drawing mentors, early phonics mastery, spatial logic, and snap track engineering.</p>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-[#0b3359] hover:bg-[#0b3359]/90 text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-colors flex items-center justify-center gap-1" to="/collections/preschool">
<span className="">Shop Ages 3–5</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>

<div className="group bg-[#F4F1EA]-lowest rounded-3xl p-space-lg border-2 border-ink shadow-[5px_5px_0px_#1E2A38] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1E2A38] transition-all flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold border border-ink">
                Ages 5+
              </span>
</div>
<div className="h-44 rounded-2xl bg-[#F4F1EA]-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An older child building an intricate three-dimensional kinetic magnetic track system with climbing cars and suspension loops across a hardwood room floor in warm natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWDLjOZUb6gQTYJmMKEFbQmMYVa2fjTz5qF7LEC_h4kuwdOzozt-eoe2Q6qx5NFNvc6_eQZN5cpa44kMOGVP4CRlAJztommG6sA5FzAC4EzcCyCWvXW4-uzhlOxAiVZC8oUsBjfb80iln4WqF-aR9Dh2XAj3QrbA60i5En8VI-88QW2PARaPyq5mJhNWjca1KPmVXVHPW4YOc7HBq1Rf8afKgcJ8V756tshNvl5dGez4ooS9wMZlGhoA"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-canvas">
<span className="font-label-md text-label-md font-bold block">Complex STEM Physics</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-ink">Big Kids &amp; Explorers</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Multi-level track physics, handheld optical microscopes, and advanced mechanical building sets.</p>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-[#0b3359] hover:bg-[#0b3359]/90 text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-colors flex items-center justify-center gap-1" to="/collections/big-kids">
<span className="">Shop Ages 5+</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-y-2 border-ink">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">PARENT-FAVORITES</span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Award-Winning Bestsellers</h2>
</div>

<div className="flex items-center gap-2.5 flex-nowrap overflow-x-auto scrollbar-hide py-2 px-1">
{[
  { id: 'All Ages', label: 'All Ages', emoji: '🌟' },
  { id: 'Ages 1–3', label: 'Ages 1–3', emoji: '🧸' },
  { id: 'Ages 3–5', label: 'Ages 3–5', emoji: '🎨' },
  { id: 'Ages 5+',  label: 'Ages 5+',  emoji: '🔭' }
].map(tab => {
  const isActive = activeBestsellerTab === tab.id;
  return (
    <button 
      key={tab.id}
      onClick={() => setActiveBestsellerTab(tab.id)}
      type="button"
      className={`group relative shrink-0 px-4 py-2 rounded-full font-label-md text-sm transition-all duration-200 flex items-center gap-2 border-2 select-none cursor-pointer ${
        isActive 
          ? 'bg-coral text-canvas border-ink shadow-[3px_3px_0px_#1E2A38] font-black -translate-y-0.5' 
          : 'bg-[#F4F1EA] hover:bg-white text-ink border-ink/30 hover:border-ink hover:shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 font-bold active:translate-y-0 active:shadow-none'
      }`}
    >
      <span className={`text-base transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-125'}`}>
        {tab.emoji}
      </span>
      <span className="tracking-tight">{tab.label}</span>
      <span className={`text-[11px] px-2 py-0.5 rounded-full font-black transition-all ${
        isActive 
          ? 'bg-white text-coral border border-coral/30 shadow-xs' 
          : 'bg-white text-ink border border-ink/20 group-hover:border-ink group-hover:bg-marigold'
      }`}>
        5
      </span>
    </button>
  );
})}
</div>
</div>

<motion.div 
  key={activeBestsellerTab}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.22, ease: 'easeOut' }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-space-sm"
>
{displayBestsellers.map(product => (
  <ProductCard key={product.id} product={product} />
))}
</motion.div>

{/* Action buttons: Explore Collection */}
<div className="flex items-center justify-center pt-6">
  <Link
    to={getCollectionLink(activeBestsellerTab).path}
    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0b3359] hover:bg-[#0b3359]/90 text-white font-bold text-sm border border-ink shadow-[2px_2px_0px_#1E2A38] transition-all hover:-translate-y-0.5 active:translate-y-0"
  >
    <span>{getCollectionLink(activeBestsellerTab).label}</span>
    <span className="material-symbols-outlined text-sm">arrow_forward</span>
  </Link>
</div>
</div>
</section></FadeInUp>



<FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas" id="toy-quiz">
<div className="max-w-4xl mx-auto rounded-3xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[8px_8px_0px_#1E2A38] p-space-lg lg:p-space-2xl relative overflow-hidden">
<div className="space-y-space-xs text-center max-w-2xl mx-auto">
<span className="px-3.5 py-1 rounded-full bg-coral text-canvas font-label-sm text-label-sm font-bold border border-ink inline-block">
          Interactive Matchmaker
        </span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight">Find Your Child's Exact Match in 45 Seconds</h2>
<p className="font-body-md text-body-md text-ink-variant">
          Overwhelmed by 30+ educational options? Answer 2 quick questions to uncover the exact developmental match for your child's stage.
        </p>
</div>

<div className="mt-space-xl space-y-space-lg" id="toy-quiz-container">

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-ink block font-bold">1. How old is your child?</label>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm" id="quiz-age-group">
  {[
    { id: '1-3', label: 'Ages 1–3' },
    { id: '3-5', label: 'Ages 3–5' },
    { id: '5+', label: 'Ages 5+' }
  ].map(age => (
    <button 
      key={age.id}
      onClick={() => { setQuizAge(age.id); setShowQuizResult(false); }}
      type="button"
      className={`quiz-age-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-center transition-all ${
        quizAge === age.id 
          ? 'active-quiz-chip bg-coral text-canvas border-ink shadow-[3px_3px_0px_#1E2A38] font-bold' 
          : 'bg-[#F4F1EA] border-ink text-ink hover:bg-[#F4F1EA]-high'
      }`}
    >
      {age.label}
    </button>
  ))}
</div>
</div>

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-ink block font-bold">2. What would you like to encourage most?</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="quiz-goal-group">
  {[
    { id: 'creative', icon: 'draw', iconColor: 'text-coral', label: 'Creative Drawing & Fine Motor Control' },
    { id: 'stem', icon: 'precision_manufacturing', iconColor: 'text-tertiary', label: 'Spatial STEM & Building Physics' },
    { id: 'focus', icon: 'self_improvement', iconColor: 'text-coral', label: 'Deep Calm Focus (Zero Screen Meltdowns)' },
    { id: 'phonics', icon: 'spellcheck', iconColor: 'text-secondary', label: 'Early Phonics, Words & Math Numbers' }
  ].map(goal => (
    <button 
      key={goal.id}
      onClick={() => { setQuizGoal(goal.id); setShowQuizResult(false); }}
      type="button"
      className={`quiz-goal-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-left flex items-center gap-3 transition-all ${
        quizGoal === goal.id 
          ? 'active-quiz-chip bg-secondary-fixed text-on-secondary-fixed border-ink shadow-[3px_3px_0px_#1E2A38] font-bold' 
          : 'bg-[#F4F1EA] border-ink text-ink hover:bg-[#F4F1EA]-high'
      }`}
    >
      <span className={`material-symbols-outlined ${goal.iconColor}`}>{goal.icon}</span>
      <span className="font-semibold text-sm sm:text-base">{goal.label}</span>
    </button>
  ))}
</div>
</div>

<div className="pt-space-sm flex flex-col items-center gap-space-xs">
<button 
  onClick={() => {
    setShowQuizResult(true);
    setTimeout(() => {
      document.getElementById('quiz-result-box')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }}
  type="button"
  className="w-full sm:w-auto px-8 py-3.5 bg-coral text-canvas-fixed rounded-xl font-label-lg text-label-lg transition-all flex items-center justify-center gap-2 hover:bg-coral-fixed shadow-[3px_3px_0px_#1E2A38] border-2 border-ink hover:-translate-y-0.5 active:translate-y-0"
>
  <span>Show My 3 Personalized Matches</span>
  <span className="material-symbols-outlined text-base" style={{fontVariationSettings: '"FILL" 1'}}>arrow_forward</span>
</button>
<span className="font-body-sm text-body-sm text-ink-variant flex items-center gap-1 pt-1">
  <span className="material-symbols-outlined text-sm text-coral">lock</span> Instant recommendations • No email required to view
</span>
</div>

{showQuizResult && (
  <div id="quiz-result-box" className="mt-8 pt-6 border-t-2 border-ink space-y-6">
    <div className="bg-white p-5 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-coral/10 border border-coral/30 flex items-center justify-center shrink-0 text-coral">
          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-coral">Personalized Developmental Match</span>
          <h3 className="font-display font-bold text-xl text-ink">
            Top 3 Matches for Ages {quizAge === '5+' ? '5+' : quizAge}
          </h3>
          <p className="text-xs sm:text-sm text-ink-variant mt-0.5">
            Tailored specifically for <strong>{GOAL_LABELS[quizGoal]}</strong> with screen-free confidence.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowQuizResult(false)}
        className="px-4 py-2 bg-canvas hover:bg-white text-ink font-bold text-xs rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-all whitespace-nowrap shrink-0"
      >
        Change Preferences
      </button>
    </div>

    {/* 3 Matches Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quizMatches.map((product, idx) => (
        <div key={product.id} className="flex flex-col h-full">
          <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-marigold text-ink text-xs font-bold border border-ink shadow-sm w-fit">
            <span>{idx === 0 ? '🏆 Match #1: Best Overall' : idx === 1 ? '⭐ Match #2: Skill Builder' : '💡 Match #3: Most Engaging'}</span>
          </div>
          <div className="flex-1">
            <ProductCard product={product} />
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-center pt-2">
      <Link
        to={getCollectionLink(`Ages ${quizAge}`).path}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0b3359] hover:bg-[#0b3359]/90 text-white font-bold text-sm border border-ink shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 active:translate-y-0 transition-all"
      >
        <span>Explore All Ages {quizAge === '5+' ? '5+' : quizAge} Toys</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  </div>
)}
</div>
</div>
</section></FadeInUp>

{/* Video Slider Showcase */}
<FadeInUp>
  <section className="w-full px-gutter py-space-2xl bg-canvas border-t-2 border-ink" id="video-slider">
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-coral animate-ping"></span>
            Real Screen-Free Joy
          </span>
          <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">
            See ToddsIQ™ in Action
          </h2>
        </div>
        <p className="font-body-md text-body-md text-ink-variant max-w-md">
          Zero screens, 100% engagement. Watch how our tactile learning robots and building sets spark hours of joyful independent play.
        </p>
      </div>

      <VideoCarousel />
    </div>
  </section>
</FadeInUp>

</div>
    </>
  );
}
