import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [quizAge, setQuizAge] = useState('3-4');
  const [quizGoal, setQuizGoal] = useState('focus');
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [activeBestsellerTab, setActiveBestsellerTab] = useState('All Ages');

  const { addItem } = useCart();
  const featured = productsData.slice(0, 8);
  const displayBestsellers = productsData.filter(product => {
    if (activeBestsellerTab === 'All Ages') return true;
    if (activeBestsellerTab === 'Ages 1–3') return product.ageBand === '1-3';
    if (activeBestsellerTab === 'Ages 3–5') return product.ageBand === '3-5' || product.ageBand === '3-8';
    if (activeBestsellerTab === 'Ages 5+') return product.ageBand === '5+' || product.ageBand === '3-8';
    return true;
  }).slice(0, 4);

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
      
      {/* Logo inside Hero */}
      <div className="mb-2">
        <span className="font-display-hero text-4xl text-[#0b3359] font-black tracking-tight">
          Todds<span className="text-[#f58f29]">IQ</span><span className="text-sm align-super ml-1">™</span>
        </span>
      </div>

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
          <span>SHOP BESTSELLERS — FROM $49</span>
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
<span className="font-body-sm text-body-sm text-ink-variant">8 Curated Kits</span>
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

<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">NestWood Full Pack</span><span className="font-bold text-coral">$49</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">AquaDoodle Book</span><span className="font-bold text-coral">$25</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">SquishBlocks Tactile Set</span><span className="font-bold text-coral">$49</span>
</div>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-[#0b3359] hover:bg-[#0b3359]/90 text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-colors flex items-center justify-center gap-1" to="/collections/toddler">
<span className="">Shop Ages 1–3</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>

<div className="group bg-[#F4F1EA]-lowest rounded-3xl p-space-lg border-2 border-ink shadow-[6px_6px_0px_#ff6154] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ff6154] transition-all flex flex-col justify-between relative">
<div className="absolute -top-3 right-6 bg-coral text-canvas font-label-sm text-label-sm uppercase tracking-wider px-3 py-0.5 rounded-full border border-ink">
            Most Popular Stage
          </div>
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-coral text-canvas font-label-sm text-label-sm font-bold border border-ink">
                Ages 3–5
              </span>
<span className="font-body-sm text-body-sm text-ink-variant">14 Curated Kits</span>
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
<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">ToddsIQ Bot Full Pack</span><span className="font-bold text-coral">$89</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">TurboMonster Track</span><span className="font-bold text-coral">$39</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">Count Crew Number Blocks</span><span className="font-bold text-coral">$49</span>
</div>
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
<span className="font-body-sm text-body-sm text-ink-variant">11 Curated Kits</span>
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
<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">MagTrack 3D Master Set</span><span className="font-bold text-coral">$69</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">SpiderRacer Duo Set</span><span className="font-bold text-coral">$39</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-ink">
<span className="">Spell &amp; Play Master Lab</span><span className="font-bold text-coral">$49</span>
</div>
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
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Award-Winning Bestsellers Built for Little Hands</h2>
</div>

<div className="flex items-center gap-2 flex-wrap">
{['All Ages', 'Ages 1–3', 'Ages 3–5', 'Ages 5+'].map(tab => (
  <button 
    key={tab}
    onClick={() => setActiveBestsellerTab(tab)}
    className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
      activeBestsellerTab === tab 
        ? 'bg-white text-ink border-2 border-ink shadow-[2px_2px_0px_#1E2A38] font-bold' 
        : 'bg-canvas hover:bg-white text-ink-variant border border-outline'
    }`}
  >
    {tab}
  </button>
))}
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg pt-space-sm">
{displayBestsellers.map(product => (
  <ProductCard key={product.id} product={product} />
))}
</div>
</div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="text-center max-w-3xl mx-auto space-y-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">The Screen-Free Difference</span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight">Why Tactile Play Shapes Developing Minds</h2>
<p className="font-body-lg text-body-lg text-ink-variant">
          Tablets offer passive visual simulation. ToddsIQ builds three-dimensional neural wiring through resistance, weight, and tangible agency.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-coral flex items-center justify-center border border-ink shadow-sm text-canvas">
<span className="material-symbols-outlined text-2xl">texture</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink">Mess-Free Friction</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-2">
              Real paper resistance, tactile ink friction, and snap-fit physical components ground sensory attention without tablet glaze.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center border border-ink shadow-sm text-on-tertiary-fixed">
<span className="material-symbols-outlined text-2xl">hardware</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink">Fine-Motor Precision</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-2">
              Replaces the "blank page freeze" with rhythmic, guided stroke-by-stroke confidence that transitions straight to classroom handwriting.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center border border-ink shadow-sm text-on-secondary-fixed">
<span className="material-symbols-outlined text-2xl">bedtime</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink">Zero Blue Light</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-2">
              Preserves melatonin production and ends post-screen dysregulation. Calms household evenings before bedtime stories.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center border border-ink shadow-sm text-canvas">
<span className="material-symbols-outlined text-2xl">accessibility_new</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink">Self-Directed Agency</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-2">
              Engineered for independent 3-year-olds to operate from start to finish without hovering parents needing to configure passwords or apps.
            </p>
</div>
</div>
</div>
</div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-t-2 border-ink">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">Curated Pathways</span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Shop by Creative Interest</h2>
</div>
<Link className="font-label-md text-label-md text-ink hover:text-coral transition-colors flex items-center gap-1" data-path="shop-catalog" to="/collections">
<span className="">View All 7 Categories</span>
<span className="material-symbols-outlined text-base">east</span>
</Link>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">

<Link className="md:col-span-7 group relative bg-secondary-fixed/50 hover:bg-secondary-fixed rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[260px]" data-path="stem-science" to="/collections">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA]-lowest rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🔬 STEM Core</span>
<h3 className="font-headline-md text-headline-md text-ink pt-2">STEM &amp; Science</h3>
<p className="font-body-md text-body-md text-ink-variant max-w-sm">Mechanical track circuits, gravity roller coaster kits, pocket microscopes &amp; engineering gear.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-ink group-hover:text-coral transition-colors">
<span className="">Explore STEM Kits</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-ink/10 select-none pointer-events-none group-hover:scale-110 transition-transform">biotech</span>
</Link>

<Link className="md:col-span-5 group relative bg-tertiary-fixed/40 hover:bg-tertiary-fixed/60 rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[260px]" data-path="building-construction" to="/collections">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA]-lowest rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🧱 Engineering</span>
<h3 className="font-headline-md text-headline-md text-ink pt-2">Building &amp; Construction</h3>
<p className="font-body-sm text-body-sm text-ink-variant">Snap-fit magnetic geometry, structural trusses &amp; dynamic architecture.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-ink group-hover:text-coral transition-colors">
<span className="">Build Now</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-ink/10 select-none pointer-events-none group-hover:scale-110 transition-transform">apartment</span>
</Link>

<Link className="md:col-span-4 group relative bg-[#F4F1EA]-lowest hover:bg-[#F4F1EA] rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="reading-language" to="/collections">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA] rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">📖 Phonics</span>
<h3 className="font-title-md text-title-md text-ink pt-2">Reading &amp; Language</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Tactile phonics cards, vocabulary ladders &amp; spelling blocks.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-coral font-bold">
<span className="">Discover Reading</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>

<Link className="md:col-span-4 group relative bg-[#F4F1EA]-lowest hover:bg-[#F4F1EA] rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="math-logic" to="/collections">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA] rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🔢 Spatial Logic</span>
<h3 className="font-title-md text-title-md text-ink pt-2">Math &amp; Logic</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Wooden fraction tiles, tactile counting abaci &amp; pattern sequences.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-coral font-bold">
<span className="">Explore Logic</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>

<Link className="md:col-span-4 group relative bg-[#F4F1EA]-lowest hover:bg-[#F4F1EA] rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="sensory-calm" to="/collections">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA] rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🫧 Calm Focus</span>
<h3 className="font-title-md text-title-md text-ink pt-2">Sensory &amp; Calm</h3>
<p className="font-body-sm text-body-sm text-ink-variant mt-1">Weighted fidget stone arrays, silent kinetic textures &amp; soft chime pads.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-coral font-bold">
<span className="">Calming Play</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>

<Link className="md:col-span-7 group relative bg-coral/40 hover:bg-coral/60 rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[240px]" data-path="arts-crafts" to="/collections">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA]-lowest rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🎨 Physical Creation</span>
<h3 className="font-headline-md text-headline-md text-ink pt-2">Arts &amp; Guided Drawing</h3>
<p className="font-body-md text-body-md text-ink-variant max-w-md">Our signature drawing robot, water-reveal pads, stroke tracing sets, and ergonomic triangular sketch pencils.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-ink group-hover:text-coral transition-colors">
<span className="">Explore Creative Arts</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-ink/10 select-none pointer-events-none group-hover:scale-110 transition-transform">palette</span>
</Link>

<Link className="md:col-span-5 group relative bg-tertiary-fixed-dim/30 hover:bg-tertiary-fixed-dim/50 rounded-3xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all flex flex-col justify-between overflow-hidden min-h-[240px]" data-path="active-outdoor" to="/collections">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-[#F4F1EA]-lowest rounded-full font-label-sm text-label-sm text-ink border border-outline-variant font-bold inline-block">🏃 Kinetic Motion</span>
<h3 className="font-headline-md text-headline-md text-ink pt-2">Active &amp; Kinetic</h3>
<p className="font-body-sm text-body-sm text-ink-variant">Acrobatic SpiderRacers, air rocket kinetic pumps &amp; backyard balance stepping stones.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-ink group-hover:text-coral transition-colors">
<span className="">Active Motion</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-ink/10 select-none pointer-events-none group-hover:scale-110 transition-transform">toys</span>
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
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="quiz-age-group">
  {[
    { id: '1-2', label: '1–2 Years' },
    { id: '3-4', label: '3–4 Years' },
    { id: '5-7', label: '5–7 Years' },
    { id: '8+', label: '8+ Years' }
  ].map(age => (
    <button 
      key={age.id}
      onClick={() => { setQuizAge(age.id); setShowQuizResult(false); }}
      type="button"
      className={`quiz-age-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-center transition-all ${quizAge === age.id ? 'active-quiz-chip bg-coral text-canvas border-ink shadow-[3px_3px_0px_#1E2A38]' : 'bg-[#F4F1EA] border-ink text-ink hover:bg-[#F4F1EA]-high'}`}
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
      className={`quiz-goal-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-left flex items-center gap-3 transition-all ${quizGoal === goal.id ? 'active-quiz-chip bg-secondary-fixed text-on-secondary-fixed border-ink shadow-[3px_3px_0px_#1E2A38]' : 'bg-[#F4F1EA] border-ink text-ink hover:bg-[#F4F1EA]-high'}`}
    >
      <span className={`material-symbols-outlined ${goal.iconColor}`}>{goal.icon}</span>
      <span>{goal.label}</span>
    </button>
  ))}
</div>
</div>

<div className="pt-space-sm flex flex-col items-center gap-space-xs">
<button 
  onClick={() => setShowQuizResult(true)}
  type="button"
  className="w-full sm:w-auto px-space-2xl py-3.5 bg-coral/20 text-canvas rounded-xl font-label-lg text-label-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
>
  <span>Show My 3 Personalized Matches</span>
  <span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
<span className="font-body-sm text-body-sm text-ink-variant flex items-center gap-1 pt-1">
  <span className="material-symbols-outlined text-sm text-coral">lock</span> Instant recommendations • No email required to view
</span>
</div>

<div className={`mt-space-md p-space-md rounded-2xl bg-secondary-container border-2 border-ink transition-all duration-500 ${showQuizResult ? 'opacity-100 block' : 'opacity-0 hidden'}`} id="quiz-result-box">
<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-3xl text-on-secondary-container">auto_awesome</span>
    <div>
      <p className="font-label-md text-label-md text-on-secondary-container font-bold">
        Top Match: {quizGoal === 'stem' ? 'ToddsIQ™ Build-a-Bot Kit' : quizGoal === 'phonics' ? 'ToddsIQ™ Phonics Starter' : 'ToddsIQ™ Bot + 150 Card Core Set'}
      </p>
      <p className="font-body-sm text-body-sm text-on-secondary-container">
        Perfect for {quizAge} yrs: {quizGoal === 'focus' ? 'builds 25+ min calm independent focus without screens.' : 'fosters hands-on learning and reduces screen time.'}
      </p>
    </div>
  </div>
  <Link to="/product/toddsiq-robot" className="px-5 py-2.5 bg-[#F4F1EA]-lowest text-ink rounded-xl font-label-md text-label-md border-2 border-ink shadow-[3px_3px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center whitespace-nowrap">View Bundle ($89)</Link>
</div>
</div>
</div>
</div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-y-2 border-ink">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<div className="flex items-center gap-2 text-tertiary-container mb-1">
<div className="flex">
<span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-ink">4.92 / 5.0 Global Rating</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight">Parent-Tested, Therapist-Approved</h2>
</div>
<Link className="font-label-md text-label-md text-ink hover:text-coral transition-colors flex items-center gap-1" data-path="parent-reviews" to="/collections">
<span className="">Read All 480+ Verified Stories</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<div className="bg-[#F4F1EA]-lowest rounded-2xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex text-tertiary-container">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
</div>
<span className="px-2 py-0.5 rounded bg-coral text-canvas font-label-sm text-label-sm font-bold">Verified Buyer</span>
</div>
<p className="font-body-md text-body-md text-ink leading-relaxed">
              “Saved our dinner times completely. My 4-year-old used to melt down asking for an iPad; now she feeds cards to her robot and proudly shows off sketchbooks filled with lions and boats.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-coral/20 text-canvas flex items-center justify-center font-bold font-label-sm">ER</div>
<div>
<p className="font-label-md text-label-md text-ink">Elena R.</p>
<p className="font-body-sm text-body-sm text-ink-variant">Mom of 4yo &amp; 2yo • California</p>
</div>
</div>
</div>

<div className="bg-[#F4F1EA]-lowest rounded-2xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex text-tertiary-container">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Occupational Therapist</span>
</div>
<p className="font-body-md text-body-md text-ink leading-relaxed">
              “As a pediatric O.T., the stroke-by-stroke pacing is unmatched. Children develop true pincer grasp and visual motor integration instead of passive glass tapping.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold font-label-sm">MT</div>
<div>
<p className="font-label-md text-label-md text-ink">Marcus T., MS, OTR/L</p>
<p className="font-body-sm text-body-sm text-ink-variant">Pediatric Clinical Specialist</p>
</div>
</div>
</div>

<div className="bg-[#F4F1EA]-lowest rounded-2xl p-space-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex text-tertiary-container">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
</div>
<span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">Living Room Champion</span>
</div>
<p className="font-body-md text-body-md text-ink leading-relaxed">
              “The MagTrack 3D system has been running through our living room chairs for three weeks straight. Worth every single penny for how engaged both our 6yo and 8yo remain.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-bold font-label-sm">SK</div>
<div>
<p className="font-label-md text-label-md text-ink">Sarah &amp; David K.</p>
<p className="font-body-sm text-body-sm text-ink-variant">Parents of 6yo &amp; 8yo • Illinois</p>
</div>
</div>
</div>
</div>
</div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas">
  <div className="max-w-7xl mx-auto flex flex-col gap-space-xl text-center">
    <div>
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">SEE IT IN ACTION</span>
      <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Real Parents, Real Playtime</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      <div className="flex flex-col gap-3">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F4F1EA]-low border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline poster="https://thoson.com/cdn/shop/files/1_b0744e83-37b5-4b51-91a5-3a05470d0505_720x.jpg?v=1725595982">
             <source src="https://cdn.shopify.com/videos/c/vp/50d3a54b41a54dc6abda9f55073142ed/50d3a54b41a54dc6abda9f55073142ed.HD-1080p-7.2Mbps-21272719.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="font-label-md text-ink font-bold">The Drawing Robot teaches stroke precision.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F4F1EA]-low border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline poster="https://thoson.com/cdn/shop/files/7_70d4c82b-09db-484d-b352-7e997a44f3bd_720x.jpg?v=1725595982">
            <source src="https://cdn.shopify.com/videos/c/vp/b3152ef32cf54e38ba5b10fb03a4bc03/b3152ef32cf54e38ba5b10fb03a4bc03.HD-1080p-7.2Mbps-20894541.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="font-label-md text-ink font-bold">The MagTrack keeps 5yos busy for hours.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#F4F1EA]-low border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline poster="https://thoson.com/cdn/shop/files/3_e5d167eb-079d-4c3e-86d1-4cb50beaf736_720x.jpg?v=1725595982">
            <source src="https://cdn.shopify.com/videos/c/vp/50d3a54b41a54dc6abda9f55073142ed/50d3a54b41a54dc6abda9f55073142ed.HD-1080p-7.2Mbps-21272719.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="font-label-md text-ink font-bold">Tactile buttons build finger strength.</p>
      </div>
    </div>
    <div className="mt-4">
       <Link className="inline-flex px-8 py-3.5 bg-transparent text-[#0b3359] rounded-xl border-2 border-[#0b3359] font-label-lg font-bold shadow-sm hover:bg-white/50 backdrop-blur-sm transition-all items-center justify-center gap-2" to="/collections">
         <span>View All Videos</span>
         <span className="material-symbols-outlined text-base">play_circle</span>
       </Link>
    </div>
  </div>
</section></FadeInUp>

<FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">Keep Hands Creating</span>
<h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Essential Consumables &amp; Expansions</h2>
</div>
<p className="font-body-sm text-body-sm text-ink-variant">Washable ink refills, extra track vehicles, and new card topic decks.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">

<div className="p-space-md rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-[#F4F1EA] flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-coral">edit</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-ink">12-Color Marker Pack</h4>
<p className="font-body-sm text-body-sm text-ink-variant">Ultra-washable non-toxic ink</p>
<span className="font-label-md text-label-md text-coral font-bold">$9.99</span>
</div>
</div>
<button className="px-3 py-1.5 bg-canvas hover:bg-[#F4F1EA] text-ink rounded-lg font-label-sm text-label-sm border border-ink shadow-[2px_2px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>

<div className="p-space-md rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-[#F4F1EA] flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-tertiary">toys</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-ink">MagTrack Turbo Racer Car</h4>
<p className="font-body-sm text-body-sm text-ink-variant">High-torque USB climbing car</p>
<span className="font-label-md text-label-md text-coral font-bold">$7.99</span>
</div>
</div>
<button className="px-3 py-1.5 bg-canvas hover:bg-[#F4F1EA] text-ink rounded-lg font-label-sm text-label-sm border border-ink shadow-[2px_2px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>

<div className="p-space-md rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-[#F4F1EA] flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-secondary">style</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-ink">150 Additional Cards</h4>
<p className="font-body-sm text-body-sm text-ink-variant">Dinosaurs, vehicles &amp; space</p>
<span className="font-label-md text-label-md text-coral font-bold">$19.00</span>
</div>
</div>
<button className="px-3 py-1.5 bg-canvas hover:bg-[#F4F1EA] text-ink rounded-lg font-label-sm text-label-sm border border-ink shadow-[2px_2px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>
</div>
</div>
</section></FadeInUp>


</div>
    </>
  );
}
