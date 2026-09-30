import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addItem } = useCart();
  const featured = productsData.slice(0, 8);
  const bestsellers = productsData.slice(0, 4);

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

<section className="relative w-full min-h-[600px] lg:h-[700px] flex items-center overflow-hidden">
  {/* Background Image & Gradient Overlays */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/hero-bg.png" 
      alt="Child playing with ToddsIQ Drawing Bot" 
      className="w-full h-full object-cover object-[70%_center] md:object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-transparent md:w-[70%] lg:w-[60%]"></div>
  </div>

  <div className="max-w-7xl mx-auto w-full px-gutter relative z-10 py-12">
    <div className="max-w-xl flex flex-col gap-6">
      
      {/* Logo inside Hero */}
      <div className="mb-2">
        <span className="font-display-hero text-4xl text-[#0b3359] font-black tracking-tight">
          Todds<span className="text-[#f58f29]">IQ</span><span className="text-sm align-super ml-1">™</span>
        </span>
      </div>

      {/* Kicker Badge */}
      <div className="inline-flex items-center gap-2 self-start bg-transparent border border-[#d1d9e0] px-4 py-1.5 rounded-full text-[#0b3359] font-bold text-sm tracking-wide shadow-sm bg-white/30 backdrop-blur-sm">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dcb650" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        Award-Winning STEM Toys
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dcb650" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </div>

      {/* Headline */}
      <h1 className="font-display-hero text-5xl md:text-6xl lg:text-[4rem] text-[#0b3359] font-black tracking-tight leading-[1.1]">
        Spark brilliant minds <br /> with <span className="text-[#f58f29] relative inline-block z-10">zero screens.<svg className="absolute -bottom-1 left-0 w-full h-3 text-[#fcd5a0] -z-10" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,15 C50,0 150,0 200,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg></span>
      </h1>

      {/* Description */}
      <p className="font-body-lg text-lg text-[#0b3359]/80 max-w-md leading-relaxed">
        ToddsIQ™ crafts physical creative companions and tactile engineering kits that turn restless hours into deep, joyful focus. Built for little hands, loved by 28,000+ families.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <a className="px-6 py-3.5 bg-[#f58f29] text-white rounded-full font-label-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2" href="#catalog">
          <span>Shop the Catalog</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </a>
        <a className="px-6 py-3.5 bg-transparent text-[#0b3359] rounded-full border border-[#0b3359] font-label-lg shadow-sm hover:bg-white/50 backdrop-blur-sm transition-all flex items-center gap-2" href="#quiz">
          <span className="material-symbols-outlined text-[#0b3359]">psychology</span>
          <span>Take the 45s Toy Quiz</span>
        </a>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-4 pt-4">
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
</section>

<section className="w-full bg-surface-container-high border-y-2 border-on-surface py-space-sm overflow-hidden select-none">
<div className="flex whitespace-nowrap animate-[marquee_24s_linear_infinite] gap-space-xl items-center font-label-md text-label-md text-on-surface">
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">phonelink_off</span> 100% SCREEN-FREE FOCUS</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-base">pan_tool</span> TACTILE FINE-MOTOR SKILLS</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">verified</span> NON-TOXIC &amp; SAFETY TESTED</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-primary-container text-base">favorite</span> LOVED BY 28,000+ PARENTS</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-tertiary-container text-base">spa</span> MONTESSORI-ALIGNED PLAY</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">do_not_disturb_on</span> ZERO ALGORITHMIC DOPAMINE</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">phonelink_off</span> 100% SCREEN-FREE FOCUS</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-tertiary text-base">pan_tool</span> TACTILE FINE-MOTOR SKILLS</span>
<span className="text-on-surface-variant">•</span>
<span className="inline-flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-base">verified</span> NON-TOXIC &amp; SAFETY TESTED</span>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Tailored Developmental Stages</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Shop by Age &amp; Milestone</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Every kit is precision-calibrated for growing neural connections, pincer-grasp coordination, and open-ended experimentation.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<div className="group bg-surface-container-lowest rounded-3xl p-space-lg border-2 border-on-surface shadow-[5px_5px_0px_#1c1c18] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1c1c18] transition-all flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold border border-on-surface">
                Ages 1–3
              </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">8 Curated Kits</span>
</div>
<div className="h-44 rounded-2xl bg-surface-container-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A toddler sitting at a low blonde wood Montessori sensory table grasping pastel wooden nesting blocks and soft textured silicone stacking toys under clean diffused daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdncwwO8LdzpCjcM_8f54wBrSVuoAmdBlSyj7qvd2FTVra_sFR5AqaEr8WaAM5enVg7iyLnYRGQZ1NksEuqSOk2qf_DYkm3VAZY1Yz5jTaqCfm3YF46u1w0clbaCiZem6LA-cUqGgnPTbi-q_kKOblCaUq8EZGpL2zDbjfH3h9_tcKbKJqF1KkpZABJ9W4cQEH8ym-cAV4D_wbVRvcUTIOkN8ATeaDYBPgPmsoRme8KLqhdlho1AS5CA"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-on-primary">
<span className="font-label-md text-label-md font-bold block">First Marks &amp; Grasp</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Toddler Play</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Sensory exploration, first strokes, tactile discovery, grasp &amp; soft nesting geometry.</p>
</div>

<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">NestWood Full Pack</span><span className="font-bold text-primary">$49</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">AquaDoodle Book</span><span className="font-bold text-primary">$25</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">SquishBlocks Tactile Set</span><span className="font-bold text-primary">$49</span>
</div>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-center font-label-md text-label-md rounded-xl border border-on-surface transition-colors flex items-center justify-center gap-1" to="/collections/toddler">
<span className="">Browse Ages 1–3</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>

<div className="group bg-surface-container-lowest rounded-3xl p-space-lg border-2 border-on-surface shadow-[6px_6px_0px_#ff6154] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ff6154] transition-all flex flex-col justify-between relative">
<div className="absolute -top-3 right-6 bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-3 py-0.5 rounded-full border border-on-surface">
            Most Popular Stage
          </div>
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold border border-on-surface">
                Ages 3–5
              </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">14 Curated Kits</span>
</div>
<div className="h-44 rounded-2xl bg-surface-container-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A focused 4-year-old child and smiling mother collaborating with a pastel pink smart drawing machine on a sunlit wooden craft table, tracing lines with washable pens beside illustrated word flashcards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgSoyDMhkUpIS3bFZZWFyz5m9QcC7QYTnNcI184BzgckUZctEFnqyDbwK0nn5u97TX_xrjDbBhoJg0d_CbmNQWmhW10cQrsjYTLEzOonX2RZgLFIiSsvXIHNK8hev9D3Bu3wQYQlbRTvOJ1nOW66FtmaGydIVx0qPtlY-u0u93TJe2QP_5olPfUjI1w9W-SLMYwsul5-DkmhVGwvsbQqRnFmq7xrapCpczxa-icY-U_JC5SnowUlh_dw"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-on-primary">
<span className="font-label-md text-label-md font-bold block">Guided Drawing &amp; Phonics</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Preschool &amp; Pre-K</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Guided drawing mentors, early phonics mastery, spatial logic, and snap track engineering.</p>
</div>
<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">ToddsIQ Bot Full Pack</span><span className="font-bold text-primary">$89</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">TurboMonster Track</span><span className="font-bold text-primary">$39</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">Count Crew Number Blocks</span><span className="font-bold text-primary">$49</span>
</div>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-primary-container text-on-primary text-center font-label-md text-label-md rounded-xl border border-on-surface shadow-[2px_2px_0px_#1c1c18] hover:bg-primary transition-colors flex items-center justify-center gap-1" to="/collections/preschool">
<span className="">Browse Ages 3–5</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>

<div className="group bg-surface-container-lowest rounded-3xl p-space-lg border-2 border-on-surface shadow-[5px_5px_0px_#1c1c18] hover:-translate-y-1 hover:shadow-[7px_7px_0px_#1c1c18] transition-all flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex justify-between items-center">
<span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold border border-on-surface">
                Ages 5+
              </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">11 Curated Kits</span>
</div>
<div className="h-44 rounded-2xl bg-surface-container-low overflow-hidden relative border border-outline-variant">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An older child building an intricate three-dimensional kinetic magnetic track system with climbing cars and suspension loops across a hardwood room floor in warm natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWDLjOZUb6gQTYJmMKEFbQmMYVa2fjTz5qF7LEC_h4kuwdOzozt-eoe2Q6qx5NFNvc6_eQZN5cpa44kMOGVP4CRlAJztommG6sA5FzAC4EzcCyCWvXW4-uzhlOxAiVZC8oUsBjfb80iln4WqF-aR9Dh2XAj3QrbA60i5En8VI-88QW2PARaPyq5mJhNWjca1KPmVXVHPW4YOc7HBq1Rf8afKgcJ8V756tshNvl5dGez4ooS9wMZlGhoA"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-on-primary">
<span className="font-label-md text-label-md font-bold block">Complex STEM Physics</span>
</div>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Big Kids &amp; Explorers</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Multi-level track physics, handheld optical microscopes, and advanced mechanical building sets.</p>
</div>
<div className="space-y-1.5 pt-2 border-t border-surface-container">
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">MagTrack 3D Master Set</span><span className="font-bold text-primary">$69</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">SpiderRacer Duo Set</span><span className="font-bold text-primary">$39</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span className="">Spell &amp; Play Master Lab</span><span className="font-bold text-primary">$49</span>
</div>
</div>
</div>
<Link className="mt-space-lg w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-center font-label-md text-label-md rounded-xl border border-on-surface transition-colors flex items-center justify-center gap-1" to="/collections/big-kids">
<span className="">Browse Ages 5+</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface-container-low border-y-2 border-on-surface">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">Tested in 28,000+ Homes</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Award-Winning Bestsellers</h2>
</div>

<div className="flex items-center gap-2 flex-wrap">
<button className="px-4 py-1.5 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface border-2 border-on-surface shadow-[2px_2px_0px_#1c1c18] font-bold">All Ages</button>
<button className="px-4 py-1.5 rounded-full bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-outline transition-colors">Ages 1–3</button>
<button className="px-4 py-1.5 rounded-full bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-outline transition-colors">Ages 3–5</button>
<button className="px-4 py-1.5 rounded-full bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface-variant border border-outline transition-colors">Ages 5+</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg pt-space-sm">

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="The ToddsIQ drawing bot set with colored flashcards, erasable markers, and custom drawing pad on white surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5bBGQnmznI09dVVNxCHR-T-SP1UyydkcJje-pM3BPYwrE8myXg7CJMzagc80CBx12knNnzb7C1AXVLqcGK7w3DLqaMsKokeMF2PW1HIDgz_Tc8leLqOjG3idv7MhBHKJsfCOzYXjEF9S8mPJRo_UyLPtFIIB-tsGdI_OEevaZQ98BGjzBzVn1COfRyZ4Bbo-nH_ejVt0xkKf1LeesYM2mUj-r0IsyyLHWdLYaBqpyXYGzBRJ3yd4Pvw"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-primary-container text-on-primary font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 31%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 3–8</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(480 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">ToddsIQ™ Bot – Full Pack</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Includes 150 hardbound step-by-step drawing cards + dual non-toxic markers.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$89.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1.5">$129.00</span>
</div>
<button className="px-3.5 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" onClick={() => {}}>
<span className="material-symbols-outlined text-sm">add_shopping_cart</span>
<span className="">Quick Add</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="Vibrant colorful 3D flexible magnetic track pieces arranged into an elevated spiral roller coaster bridge with motorized light-up car." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3yk-07Bz9ercQaEOtvPsFwJEPHMQJsCrR5uhYWBl-jLR_IUj8G1PMtTzg5TJgSLgjRKvNmFtOJb5HKMvqktPDQxJzU5eN0S8KEWHtFz9X0Vtg-HlTYP04ioL8bJg4Qt02Rq30ljLaM061A8G_8oD7yuAeF579VHJSM0b0DRkjb2CjiMVGh5X745onqEWMhuSWtYiteb0pm0apk2SLZkH-SAm8QRrQmUEZOzn41GbjoiFIVQkuFHjwyA"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 50%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 4–12</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(342 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">MagTrack™ 3D Train Set</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Anti-gravity flexible serpentine track pieces with vertical wall climbing ability.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-body-sm text-body-sm text-on-surface-variant">From</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold ml-1">$69.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1">$139.00</span>
</div>
<a className="px-3.5 py-2 bg-surface-container-highest hover:bg-surface-container text-on-surface rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" data-path="building-construction" href="#">
<span className="">Choose Tier</span>
<span className="material-symbols-outlined text-sm">tune</span>
</a>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="Handcrafted organic beechwood stacking arches and nesting sensory cylinders smoothly sanded with botanical pastel dye finishes on natural linen." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASB91V6QbG7-uoX-BJmCHljD16ggZzhyCHSmKDibNz_0EQ9rQ8EV6Va8NDySCcbqP7Th2N-HM3kjq8R_bEATsXoLYdqYfZBk0CM_pCklJRp5cds7X61_z2oEjB63DGniHVwfN76hlbr4AShZUkkuwttqbcZCWNQZgP_p1bzyfeLMhCi6bXlzIo6BYIosWTjy6uDy8u7Ylcav68t69uL6xXWnHezL3_VpXJlwbsqNO8BbAeF4Z64QWrAw"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 28%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 1–3</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.8</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(180 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">NestWood™ Full Pack</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Handmade FSC-certified wooden tactile puzzles designed for early spatial grasping.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$49.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1.5">$69.00</span>
</div>
<button className="px-3.5 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" onClick={() => {}}>
<span className="material-symbols-outlined text-sm">add_shopping_cart</span>
<span className="">Quick Add</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="A handheld portable optical pocket microscope for kids illuminating a leaf vein with LED light on a nature exploration table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwBg6WzCSSkv5FKZVdqtounSWoWyOQ6PGnN4hd_9p5JIqHfpoAIHKXLKRMtkAmLAOcj1hH0gfjBeVG8l0-_hL4zIqcvEgfKHlbejGWzOmiVOqMVC9dWYxzFT_LIWaonfXJtyHO69ZoyCyfIOcZdv2jhSv3DDC7KgFne7Rl883QUbYSV6H8fWljA-tUA7Ipwpa1k41QcASKuluwFxspFlsnLuFPYwI6QwekgbVuIijgHjoCgzPMxn_KaA"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-primary-container text-on-primary font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 30%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 5+</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(94 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Thoson MicroScope Explorer™</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">60x-120x high-definition pocket optical lens with prepared specimen slides.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$69.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1.5">$99.00</span>
</div>
<button className="px-3.5 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" onClick={() => {}}>
<span className="material-symbols-outlined text-sm">add_shopping_cart</span>
<span className="">Quick Add</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="Reusable mess-free water coloring book showing vibrant colors appearing on canvas as a water pen touches the white textured paper sheet." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6OPg8rme5cSHYXvUk2YrM6tWikEXBcHXaEFzO7fT6NIhswdQPH3n2WvEkcTGKylua5E71AvVqA2M-fbcRGZy8pxfmjhDdkjQCzy4ekgNGcX_JCp6PtqpOppBrUbICxOM5duG8Hz22IrWYS_aZ3OzWpDYffVn6jaAWEeC6HlBfZP4nfYUbJAhEKKDtS-9-TRdo0TJuye0UD7Q4rLc8W1vaI1J42d1pZbPCBGuGFXrdD9Z3GTJYXuHZjg"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-tertiary-container text-on-tertiary font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 63%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 1–4</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.7</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(112 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Thoson AquaDoodle Book™</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Pure clean water reveals vivid colors that vanish as pages dry. 100% mess-free.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$25.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1.5">$69.00</span>
</div>
<button className="px-3.5 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" onClick={() => {}}>
<span className="material-symbols-outlined text-sm">add_shopping_cart</span>
<span className="">Quick Add</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-md border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-sm">
<div className="relative rounded-xl overflow-hidden bg-surface-container aspect-square">
<img className="w-full h-full object-cover" data-alt="Magnetic translucent engineering cubes constructing a geometric tower with glowing shadows on a blonde birch playroom floor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZrgs5QFnjYjvrJe2X320dWSQ2Ok4yxdr6hGjdafyphiFiY1DiEFSkZ_Gs_sUNREQDbbN64aPurlzDPMUTUne9fz472HSexLYZJQotkhpONhZ5CzGSTlv5xo2ClcJk5tVV1YqoH5hwdZmE-iHMUpSbIfKs9tCuLqRdv_I_rhAvS8I0VOuEXSsoMo9F_QrYPIFXl_-xqdumrbsKfEKA5Z1XeClI-DCLfv8PRni2li8DD58ChI0qS4W_yg"/>
<span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold border border-on-surface shadow-sm">SAVE 36%</span>
<span className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-surface-container-lowest/90 font-label-sm text-label-sm text-on-surface border border-outline-variant">Ages 3–10</span>
</div>
<div>
<div className="flex items-center gap-1 text-tertiary-container pt-1">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(215 reviews)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Thoson BuildBox™ Magnetic</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Reinforced neodymium magnet blocks that snap into bridge and vehicle structures.</p>
</div>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center justify-between">
<div>
<span className="font-headline-sm text-headline-sm text-primary font-bold">$69.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant line-through ml-1.5">$109.00</span>
</div>
<button className="px-3.5 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1" onClick={() => {}}>
<span className="material-symbols-outlined text-sm">add_shopping_cart</span>
<span className="">Quick Add</span>
</button>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="text-center max-w-3xl mx-auto space-y-space-xs">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">The Screen-Free Difference</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Why Tactile Play Shapes Developing Minds</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">
          Tablets offer passive visual simulation. ToddsIQ builds three-dimensional neural wiring through resistance, weight, and tangible agency.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center border border-on-surface shadow-sm text-on-primary-fixed">
<span className="material-symbols-outlined text-2xl">texture</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Mess-Free Friction</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Real paper resistance, tactile ink friction, and snap-fit physical components ground sensory attention without tablet glaze.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center border border-on-surface shadow-sm text-on-tertiary-fixed">
<span className="material-symbols-outlined text-2xl">hardware</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Fine-Motor Precision</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Replaces the "blank page freeze" with rhythmic, guided stroke-by-stroke confidence that transitions straight to classroom handwriting.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center border border-on-surface shadow-sm text-on-secondary-fixed">
<span className="material-symbols-outlined text-2xl">bedtime</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Zero Blue Light</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Preserves melatonin production and ends post-screen dysregulation. Calms household evenings before bedtime stories.
            </p>
</div>
</div>

<div className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex flex-col gap-space-md">
<div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center border border-on-surface shadow-sm text-on-primary">
<span className="material-symbols-outlined text-2xl">accessibility_new</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-on-surface">Self-Directed Agency</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Engineered for independent 3-year-olds to operate from start to finish without hovering parents needing to configure passwords or apps.
            </p>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface-container-low border-t-2 border-on-surface">
<div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Curated Pathways</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Shop by Creative Interest</h2>
</div>
<a className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors flex items-center gap-1" data-path="shop-catalog" href="#">
<span className="">View All 7 Categories</span>
<span className="material-symbols-outlined text-base">east</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">

<a className="md:col-span-7 group relative bg-secondary-fixed/50 hover:bg-secondary-fixed rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[260px]" data-path="stem-science" href="#">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-surface-container-lowest rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🔬 STEM Core</span>
<h3 className="font-headline-md text-headline-md text-on-surface pt-2">STEM &amp; Science</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-sm">Mechanical track circuits, gravity roller coaster kits, pocket microscopes &amp; engineering gear.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
<span className="">Explore STEM Kits</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-on-surface/10 select-none pointer-events-none group-hover:scale-110 transition-transform">biotech</span>
</a>

<a className="md:col-span-5 group relative bg-tertiary-fixed/40 hover:bg-tertiary-fixed/60 rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[260px]" data-path="building-construction" href="#">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-surface-container-lowest rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🧱 Engineering</span>
<h3 className="font-headline-md text-headline-md text-on-surface pt-2">Building &amp; Construction</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Snap-fit magnetic geometry, structural trusses &amp; dynamic architecture.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
<span className="">Build Now</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-on-surface/10 select-none pointer-events-none group-hover:scale-110 transition-transform">apartment</span>
</a>

<a className="md:col-span-4 group relative bg-surface-container-lowest hover:bg-surface-container rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="reading-language" href="#">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">📖 Phonics</span>
<h3 className="font-title-md text-title-md text-on-surface pt-2">Reading &amp; Language</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tactile phonics cards, vocabulary ladders &amp; spelling blocks.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
<span className="">Discover Reading</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</a>

<a className="md:col-span-4 group relative bg-surface-container-lowest hover:bg-surface-container rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="math-logic" href="#">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🔢 Spatial Logic</span>
<h3 className="font-title-md text-title-md text-on-surface pt-2">Math &amp; Logic</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Wooden fraction tiles, tactile counting abaci &amp; pattern sequences.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
<span className="">Explore Logic</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</a>

<a className="md:col-span-4 group relative bg-surface-container-lowest hover:bg-surface-container rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[220px]" data-path="sensory-calm" href="#">
<div className="relative z-10">
<span className="px-2.5 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🫧 Calm Focus</span>
<h3 className="font-title-md text-title-md text-on-surface pt-2">Sensory &amp; Calm</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Weighted fidget stone arrays, silent kinetic textures &amp; soft chime pads.</p>
</div>
<div className="relative z-10 pt-4 flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
<span className="">Calming Play</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</a>

<a className="md:col-span-7 group relative bg-primary-fixed/40 hover:bg-primary-fixed/60 rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[240px]" data-path="arts-crafts" href="#">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-surface-container-lowest rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🎨 Physical Creation</span>
<h3 className="font-headline-md text-headline-md text-on-surface pt-2">Arts &amp; Guided Drawing</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Our signature drawing robot, water-reveal pads, stroke tracing sets, and ergonomic triangular sketch pencils.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
<span className="">Explore Creative Arts</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl text-on-surface/10 select-none pointer-events-none group-hover:scale-110 transition-transform">palette</span>
</a>

<a className="md:col-span-5 group relative bg-tertiary-fixed-dim/30 hover:bg-tertiary-fixed-dim/50 rounded-3xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] transition-all flex flex-col justify-between overflow-hidden min-h-[240px]" data-path="active-outdoor" href="#">
<div className="space-y-1 relative z-10">
<span className="px-2.5 py-1 bg-surface-container-lowest rounded-full font-label-sm text-label-sm text-on-surface border border-outline-variant font-bold inline-block">🏃 Kinetic Motion</span>
<h3 className="font-headline-md text-headline-md text-on-surface pt-2">Active &amp; Kinetic</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Acrobatic SpiderRacers, air rocket kinetic pumps &amp; backyard balance stepping stones.</p>
</div>
<div className="relative z-10 pt-space-md flex items-center gap-1 font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">
<span className="">Active Motion</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-on-surface/10 select-none pointer-events-none group-hover:scale-110 transition-transform">toys</span>
</a>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface" id="toy-quiz">
<div className="max-w-4xl mx-auto rounded-3xl bg-surface-container-lowest border-2 border-on-surface shadow-[8px_8px_0px_#1c1c18] p-space-lg lg:p-space-2xl relative overflow-hidden">
<div className="space-y-space-xs text-center max-w-2xl mx-auto">
<span className="px-3.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold border border-on-surface inline-block">
          Interactive Matchmaker
        </span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Find Your Child's Exact Match in 45 Seconds</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          Overwhelmed by 30+ educational options? Answer 2 quick questions to uncover the exact developmental match for your child's stage.
        </p>
</div>

<div className="mt-space-xl space-y-space-lg" id="toy-quiz-container">

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-on-surface block font-bold">1. How old is your child?</label>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="quiz-age-group">
<button className="quiz-age-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-center" onClick={() => {}} type="button">
              1–2 Years
            </button>
<button className="quiz-age-btn active-quiz-chip px-4 py-3 rounded-xl bg-primary-fixed text-on-primary-fixed border-2 border-on-surface font-label-md text-label-md shadow-[3px_3px_0px_#1c1c18] transition-all text-center" onClick={() => {}} type="button">
              3–4 Years
            </button>
<button className="quiz-age-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-center" onClick={() => {}} type="button">
              5–7 Years
            </button>
<button className="quiz-age-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-center" onClick={() => {}} type="button">
              8+ Years
            </button>
</div>
</div>

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-on-surface block font-bold">2. What would you like to encourage most?</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="quiz-goal-group">
<button className="quiz-goal-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-left flex items-center gap-3" onClick={() => {}} type="button">
<span className="material-symbols-outlined text-primary">draw</span>
<span className="">Creative Drawing &amp; Fine Motor Control</span>
</button>
<button className="quiz-goal-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-left flex items-center gap-3" onClick={() => {}} type="button">
<span className="material-symbols-outlined text-tertiary">precision_manufacturing</span>
<span className="">Spatial STEM &amp; Building Physics</span>
</button>
<button className="quiz-goal-btn active-quiz-chip px-4 py-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed border-2 border-on-surface font-label-md text-label-md shadow-[3px_3px_0px_#1c1c18] transition-all text-left flex items-center gap-3" onClick={() => {}} type="button">
<span className="material-symbols-outlined text-primary">self_improvement</span>
<span className="">Deep Calm Focus (Zero Screen Meltdowns)</span>
</button>
<button className="quiz-goal-btn px-4 py-3 rounded-xl bg-surface-container border-2 border-on-surface font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-all text-left flex items-center gap-3" onClick={() => {}} type="button">
<span className="material-symbols-outlined text-secondary">spellcheck</span>
<span className="">Early Phonics, Words &amp; Math Numbers</span>
</button>
</div>
</div>

<div className="pt-space-sm flex flex-col items-center gap-space-xs">
<button className="w-full sm:w-auto px-space-2xl py-3.5 bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2" onClick={() => {}} type="button">
<span className="">Show My 3 Personalized Matches</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 pt-1">
<span className="material-symbols-outlined text-sm text-primary">lock</span> Instant recommendations • No email required to view
          </span>
</div>

<div className="hidden mt-space-md p-space-md rounded-2xl bg-secondary-container border-2 border-on-surface animate-fade-in" id="quiz-result-box">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl text-on-secondary-container">arrow_back_ios_new</span>
<div>
<p className="font-label-md text-label-md text-on-secondary-container font-bold">Top Match: ToddsIQ™ Bot + 150 Card Core Set</p>
<p className="font-body-sm text-body-sm text-on-secondary-container">Perfect for 3–4 yrs: builds 25+ min calm independent focus without screens.</p>
</div>
</div>
<a className="px-3 py-1.5 bg-surface-container-lowest text-on-surface rounded-lg font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18]" data-path="shop-catalog" href="#">View Bundle ($89)</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface-container-low border-y-2 border-on-surface">
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
<span className="font-label-sm text-label-sm font-bold text-on-surface">4.92 / 5.0 Global Rating</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Parent-Tested, Therapist-Approved</h2>
</div>
<a className="font-label-md text-label-md text-on-surface hover:text-primary transition-colors flex items-center gap-1" data-path="parent-reviews" href="#">
<span className="">Read All 480+ Verified Stories</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">

<div className="bg-surface-container-lowest rounded-2xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
<div className="space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex text-tertiary-container">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
</div>
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">Verified Buyer</span>
</div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
              “Saved our dinner times completely. My 4-year-old used to melt down asking for an iPad; now she feeds cards to her robot and proudly shows off sketchbooks filled with lions and boats.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold font-label-sm">ER</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Elena R.</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Mom of 4yo &amp; 2yo • California</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
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
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
              “As a pediatric O.T., the stroke-by-stroke pacing is unmatched. Children develop true pincer grasp and visual motor integration instead of passive glass tapping.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold font-label-sm">MT</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Marcus T., MS, OTR/L</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Pediatric Clinical Specialist</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-space-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] flex flex-col justify-between">
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
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
              “The MagTrack 3D system has been running through our living room chairs for three weeks straight. Worth every single penny for how engaged both our 6yo and 8yo remain.”
            </p>
</div>
<div className="pt-space-md mt-space-md border-t border-surface-container flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-bold font-label-sm">SK</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Sarah &amp; David K.</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Parents of 6yo &amp; 8yo • Illinois</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-gutter py-space-2xl bg-surface">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Keep Hands Creating</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Essential Consumables &amp; Expansions</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Washable ink refills, extra track vehicles, and new card topic decks.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">

<div className="p-space-md rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-primary">edit</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">12-Color Marker Pack</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Ultra-washable non-toxic ink</p>
<span className="font-label-md text-label-md text-primary font-bold">$9.99</span>
</div>
</div>
<button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>

<div className="p-space-md rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-tertiary">toys</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">MagTrack Turbo Racer Car</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">High-torque USB climbing car</p>
<span className="font-label-md text-label-md text-primary font-bold">$7.99</span>
</div>
</div>
<button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>

<div className="p-space-md rounded-2xl bg-surface-container-lowest border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
<span className="material-symbols-outlined text-2xl text-secondary">style</span>
</div>
<div>
<h4 className="font-label-md text-label-md text-on-surface">150 Additional Cards</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dinosaurs, vehicles &amp; space</p>
<span className="font-label-md text-label-md text-primary font-bold">$19.00</span>
</div>
</div>
<button className="px-3 py-1.5 bg-surface hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm border border-on-surface shadow-[2px_2px_0px_#1c1c18] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all" onClick={() => {}}>
            + Add
          </button>
</div>
</div>
</div>
</section>


</div>
    </>
  );
}
