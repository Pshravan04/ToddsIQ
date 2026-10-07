import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

export default function About() {
  const scrollToPurpose = () => {
    document.getElementById('our-purpose')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-canvas overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-[100px] md:pt-[140px] pb-space-xl md:pb-[100px] px-gutter bg-[#F4F1EA] relative">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-space-xl relative z-10">
          
          {/* Left Content (45%) */}
          <div className="w-full md:w-[45%] text-left space-y-6">
            <FadeInUp delay={0.1}>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.15em] text-coral font-bold block">ABOUT TODDSIQ™</span>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <h1 className="text-[clamp(44px,6vw,80px)] font-headline-2xl text-ink leading-[0.95] tracking-tight">
                Big Dreams<br />for Little Hands.
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="text-[17px] md:text-[19px] font-body-lg text-ink-variant max-w-[480px] leading-relaxed">
                More than toys. Creative companions designed to spark curiosity, imagination, and real-world learning.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/products/robot" className="h-[54px] px-8 bg-coral hover:bg-coral/90 text-canvas font-label-lg rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-all transform hover:-translate-y-1 flex items-center justify-center">
                  SHOP TODDSIQ™
                </Link>
                <button onClick={scrollToPurpose} className="h-[54px] px-8 bg-canvas hover:bg-white text-ink font-label-lg rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] transition-all transform hover:-translate-y-1 flex items-center justify-center">
                  OUR PURPOSE ↓
                </button>
              </div>
            </FadeInUp>
          </div>

          {/* Right Visual (55%) */}
          <div className="w-full md:w-[55%] relative">
            {/* Subtle Blob Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E8F8F5] rounded-full blur-[80px] opacity-40 z-0"></div>
            
            <FadeInUp delay={0.5} className="relative z-10 w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/MagTrack.webp?v=1763487546" 
                alt="ToddsIQ Hands-on Play" 
                className="w-full h-full object-cover rounded-[24px] border border-ink/10 shadow-lg mix-blend-multiply"
              />
              <div className="absolute -bottom-4 -right-4 md:-right-8 bg-canvas text-ink px-6 py-3 rounded-full border border-ink shadow-[3px_3px_0px_#1E2A38] font-label-sm font-bold uppercase tracking-wider transform rotate-3 z-20">
                CREATIVE COMPANION
              </div>
              <div className="absolute top-8 -left-4 text-3xl animate-pulse z-20 hidden md:block">⭐</div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="py-12 md:py-20 px-gutter bg-canvas border-b border-outline">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <div className="w-full md:w-[45%]">
            <FadeInUp>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.15em] text-[#6C8EF5] font-bold block mb-4">WHO WE ARE</span>
              <h2 className="text-[clamp(34px,4vw,64px)] font-headline-lg text-ink leading-tight">Built for<br/>curious minds.</h2>
            </FadeInUp>
          </div>
          <div className="w-full md:w-[55%] space-y-8 mt-2 md:mt-10">
            <FadeInUp delay={0.2}>
              <p className="text-[17px] md:text-[19px] font-body-lg text-ink-variant leading-relaxed">
                ToddsIQ™ is a product brand owned and operated by Naeem Body Oil LLC, a registered U.S. company based in California. We specialize in delivering high-quality, educational, and creative products for families across the United States.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 font-label-xs text-label-xs uppercase tracking-widest text-ink/60 font-bold">
                <span>BASED IN CALIFORNIA</span>
                <span className="w-1 h-1 bg-ink/20 rounded-full hidden sm:block"></span>
                <span>MADE FOR FAMILIES</span>
                <span className="w-1 h-1 bg-ink/20 rounded-full hidden sm:block"></span>
                <span>CREATIVE + EDUCATIONAL</span>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE */}
      <section id="our-purpose" className="py-16 md:py-24 px-gutter bg-[#F4F1EA]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-[50%] relative order-2 lg:order-1">
            <FadeInUp delay={0.2}>
              <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/thoson-magtrack-03.png?v=1789972736" 
                  alt="Child Hands-On Play" 
                  className="w-full h-full object-contain drop-shadow-xl"
                  loading="lazy"
                />
                {/* Typographic Labels */}
                <span className="absolute top-[10%] left-[0%] font-label-xs tracking-widest text-ink/80 bg-canvas/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink/20 transform -rotate-6">CREATE</span>
                <span className="absolute top-[20%] right-[5%] font-label-xs tracking-widest text-ink/80 bg-canvas/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink/20 transform rotate-6">EXPLORE</span>
                <span className="absolute bottom-[25%] left-[5%] font-label-xs tracking-widest text-ink/80 bg-canvas/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink/20 transform -rotate-3">BUILD</span>
                <span className="absolute bottom-[10%] right-[10%] font-label-xs tracking-widest text-ink/80 bg-canvas/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink/20 transform rotate-6">DISCOVER</span>
              </div>
            </FadeInUp>
          </div>
          <div className="w-full lg:w-[50%] space-y-6 order-1 lg:order-2">
            <FadeInUp>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.15em] text-[#FFB627] font-bold block mb-4">OUR PURPOSE</span>
              <h2 className="text-[clamp(34px,5vw,64px)] font-headline-xl text-ink leading-[1.05] mb-8">
                Building the foundation<br/>for brighter futures.
              </h2>
              <div className="space-y-6 text-[17px] md:text-[19px] font-body-lg text-ink-variant leading-relaxed">
                <p>At ToddsIQ™, we’re not just making toys—we’re building the foundation for brighter futures.</p>
                <p>In a world dominated by screens and passive play, we’re on a mission to bring back the magic of hands-on imagination, where creativity, curiosity, and joy take center stage.</p>
                <p>Every product we create is designed to make your child think, move, giggle, and grow with purpose.</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 4. MORE THAN A TOY (FEATURE GRID) */}
      <section className="py-16 md:py-24 px-gutter bg-canvas border-t border-outline">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-2xl mb-12">
            <FadeInUp>
              <span className="font-label-sm uppercase tracking-[0.15em] text-[#1F9D8A] font-bold block mb-4">WHAT MAKES TODDSIQ™ DIFFERENT</span>
              <h2 className="text-[clamp(34px,4vw,64px)] font-headline-xl text-ink leading-tight mb-6">More than a toy.</h2>
              <p className="text-[17px] md:text-[19px] text-ink-variant leading-relaxed mb-4">
                Unlike typical toys, ToddsIQ™ is a companion—a thoughtful playmate built to support your child’s mental, emotional, and developmental growth.
              </p>
              <p className="text-[17px] md:text-[19px] text-ink-variant leading-relaxed">
                Our toys are not just fun—they’re intentionally crafted to challenge young minds, promote critical thinking, and encourage real-world interaction.
              </p>
            </FadeInUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: '01', title: 'CURIOUS MINDS', desc: 'Designed to encourage questions, exploration, and discovery.', icon: '💡', bg: 'bg-[#FFF8E7]' },
              { id: '02', title: 'CREATIVE PLAY', desc: 'Open-ended experiences that give imagination room to grow.', icon: '🎨', bg: 'bg-[#FFF4F2]' },
              { id: '03', title: 'REAL-WORLD INTERACTION', desc: 'Hands-on play that gets little minds and hands moving.', icon: '🤝', bg: 'bg-[#EEF1FD]' },
              { id: '04', title: 'SCREEN-FREE FUN', desc: 'Meaningful play experiences children can enjoy away from screens.', icon: '🧸', bg: 'bg-[#E8F8F5]' },
            ].map((card) => (
              <StaggerItem key={card.id}>
                <div className={`${card.bg} p-8 rounded-[24px] border border-ink/10 h-full flex flex-col hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl">{card.icon}</span>
                    <span className="font-label-xs text-ink/40 font-bold">{card.id}</span>
                  </div>
                  <h3 className="font-title-md text-ink font-bold mb-2">{card.title}</h3>
                  <p className="text-[15px] font-body-sm text-ink-variant leading-relaxed">{card.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. PLAY WITH A PURPOSE */}
      <section className="py-16 md:py-24 px-gutter bg-[#F4F1EA] border-y border-outline">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <div className="max-w-3xl mb-12 md:mb-16">
              <h2 className="text-[clamp(34px,4vw,64px)] font-headline-xl text-ink leading-tight mb-6">Play with a purpose.</h2>
              <p className="text-[17px] md:text-[19px] text-ink-variant leading-relaxed">
                From boosting motor skills to unlocking imaginative adventures, every ToddsIQ™ experience is designed as a screen-free journey children can enjoy and remember.
              </p>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            {/* Desktop Horizontal */}
            <div className="hidden lg:flex items-center justify-between w-full relative">
              <div className="absolute left-0 right-0 h-[1px] bg-ink/20 top-1/2 -translate-y-1/2 z-0"></div>
              {['PLAY', 'EXPLORE', 'BUILD', 'IMAGINE', 'DISCOVER'].map((step, idx) => (
                <div key={step} className="bg-[#F4F1EA] z-10 px-4">
                  <span className={`px-6 py-3 rounded-full font-label-sm font-bold tracking-wider text-sm border shadow-sm ${idx === 4 ? 'bg-coral text-canvas border-coral' : 'bg-canvas text-ink border-ink/20'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            {/* Mobile Vertical */}
            <div className="flex lg:hidden flex-col items-start gap-4 relative pl-6">
              <div className="absolute top-4 bottom-4 left-6 w-[1px] bg-ink/20 z-0"></div>
              {['PLAY', 'EXPLORE', 'BUILD', 'IMAGINE', 'DISCOVER'].map((step, idx) => (
                <div key={step} className="bg-[#F4F1EA] z-10 py-2 -ml-4 pl-4 pr-2">
                  <span className={`inline-block px-5 py-2.5 rounded-full font-label-sm font-bold tracking-wider text-xs border shadow-sm ${idx === 4 ? 'bg-coral text-canvas border-coral' : 'bg-canvas text-ink border-ink/20'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 6. FIX "BIG DREAMS FOR LITTLE HANDS" (MANIFESTO) */}
      <section className="py-20 md:py-32 px-gutter bg-[#0b3359] text-canvas border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Text */}
          <div className="w-full md:w-[60%] space-y-10">
            <FadeInUp>
              <h2 className="text-[clamp(40px,6vw,90px)] font-headline-2xl leading-[1.0] text-[#FFB627]">
                Big dreams<br />for little hands.
              </h2>
            </FadeInUp>
            
            <div className="text-[22px] md:text-[32px] font-headline-md leading-tight text-canvas/90">
              <FadeInUp delay={0.1}>
                <p className="mb-8 max-w-lg">We believe children don't need more things to simply keep them busy.</p>
              </FadeInUp>
              <StaggerContainer className="space-y-3 opacity-80 text-[20px] md:text-[28px]">
                <StaggerItem><p>EXPLORE.</p></StaggerItem>
                <StaggerItem><p>BUILD.</p></StaggerItem>
                <StaggerItem><p>IMAGINE.</p></StaggerItem>
                <StaggerItem><p>MAKE MISTAKES.</p></StaggerItem>
                <StaggerItem><p>FIGURE THINGS OUT.</p></StaggerItem>
              </StaggerContainer>
              <FadeInUp delay={0.6}>
                <p className="mt-10 text-coral italic font-bold">"Look what I made."</p>
              </FadeInUp>
            </div>
          </div>

          {/* Right Visual (35-40%) */}
          <div className="w-full md:w-[40%]">
            <FadeInUp delay={0.3}>
              <div className="aspect-[4/5] w-full max-w-[400px] mx-auto">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/6a8eaac1-5d40-418f-aa89-b6522654543f_1e60f38e-84d1-4c22-bb85-35158bc9c2a0.webp?v=1775435265" 
                  alt="Child discovering" 
                  className="w-full h-full object-cover rounded-[24px] border border-canvas/20 shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  loading="lazy"
                />
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 7. "FOR THE FAMILIES WHO CARE" */}
      <section className="py-16 md:py-24 px-gutter bg-[#F4F1EA]">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-2xl mb-16">
            <FadeInUp>
              <h2 className="text-[clamp(34px,4vw,64px)] font-headline-xl text-ink leading-tight mb-6">Because you want more than just a toy.</h2>
              <p className="text-[17px] md:text-[19px] text-ink-variant leading-relaxed">
                Whether you're a parent, a grandparent, or a thoughtful gift-giver, you want more than just toys—you want impact.
              </p>
            </FadeInUp>
          </div>

          <div className="border-t border-ink/20">
            <StaggerContainer>
              {[
                { num: '01', title: 'A BURST OF CURIOSITY', desc: 'Something that makes them ask, explore, and wonder.' },
                { num: '02', title: 'A TOOL FOR LEARNING', desc: 'Play that turns discovery into an experience.' },
                { num: '03', title: 'A COMPANION FOR THEIR STORY', desc: 'Something they can build memories around.' }
              ].map((item) => (
                <StaggerItem key={item.num}>
                  <div className="py-8 md:py-12 border-b border-ink/20 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 hover:bg-canvas/50 transition-colors px-4 -mx-4 rounded-xl">
                    <span className="text-[28px] md:text-[40px] font-headline-md text-ink/30 w-16">{item.num}</span>
                    <h3 className="text-[22px] md:text-[28px] font-headline-md text-ink flex-1">{item.title}</h3>
                    <p className="text-[17px] md:text-[19px] text-ink-variant flex-1">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 8. CREATIVE COMPANION SECTION */}
      <section className="py-16 md:py-24 px-gutter bg-canvas border-t border-outline">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-[45%] order-2 lg:order-1 relative">
            <FadeInUp>
              <div className="aspect-square w-full max-w-[500px] mx-auto relative rounded-[24px] overflow-hidden border border-ink/10 shadow-xl bg-[#FFF8E7]">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/863e6c75-e3eb-4fb9-b1f8-edccf374bcbf_70548431-7df3-42d2-bc62-5ba682dceb57.png?v=1775435140" 
                  alt="ToddsIQ Product Details" 
                  className="w-full h-full object-cover mix-blend-multiply"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-white px-6 py-4 rounded-xl border border-ink shadow-[4px_4px_0px_#1E2A38] rotate-2 z-10 hidden sm:block">
                <span className="font-label-xs block text-ink/60 mb-1 tracking-widest">TODDSIQ™</span>
                <span className="font-headline-sm text-ink leading-tight">CREATIVE<br/>COMPANION</span>
              </div>
            </FadeInUp>
          </div>
          <div className="w-full lg:w-[55%] space-y-6 order-1 lg:order-2">
            <FadeInUp delay={0.2}>
              <h2 className="text-[clamp(34px,5vw,64px)] font-headline-xl text-ink leading-[1.05] mb-8">
                Meet their Creative Companion.
              </h2>
              <div className="space-y-6 text-[17px] md:text-[19px] font-body-lg text-ink-variant leading-relaxed">
                <p>So whether your child is exploring, building, learning, or laughing—ToddsIQ™ is right there, cheering them on.</p>
                <p>Because at the heart of every giggle, every 'aha!' moment, and every proud little achievement… there’s a Creative Companion named ToddsIQ™.</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 md:py-[100px] px-gutter bg-[#0b3359] text-canvas border-b-2 border-ink">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left CTA Text */}
          <div className="w-full md:w-[60%] space-y-6">
            <FadeInUp>
              <span className="font-label-sm uppercase tracking-[0.15em] text-[#FFB627] font-bold block mb-4">READY TO PLAY?</span>
              <h2 className="text-[clamp(40px,5vw,72px)] font-headline-2xl leading-[1.05] text-canvas mb-6">
                Ready to spark<br/>their next aha! moment?
              </h2>
              <p className="text-[18px] md:text-[20px] text-canvas/80 max-w-md leading-relaxed mb-10">
                Discover hands-on products designed to turn curiosity into creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products/robot" 
                  className="h-[54px] px-8 bg-coral hover:bg-coral/90 text-canvas font-label-lg rounded-xl border border-transparent transition-all flex items-center justify-center font-bold"
                >
                  SHOP NOW
                </Link>
                <Link 
                  to="/collections/all" 
                  className="h-[54px] px-8 bg-transparent hover:bg-canvas/10 text-canvas font-label-lg rounded-xl border border-canvas/30 transition-all flex items-center justify-center font-bold"
                >
                  EXPLORE TODDSIQ™
                </Link>
              </div>
            </FadeInUp>
          </div>

          {/* Right CTA Visual */}
          <div className="w-full md:w-[40%] hidden sm:block">
            <FadeInUp delay={0.2}>
              <div className="aspect-[4/3] w-full max-w-[400px] mx-auto bg-[#F4F1EA] rounded-[24px] overflow-hidden p-6 relative">
                 <img 
                  src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/MagTrack.webp?v=1763487546" 
                  alt="ToddsIQ Products" 
                  className="w-full h-full object-cover rounded-[16px] mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            </FadeInUp>
          </div>
          
        </div>
      </section>

    </div>
  );
}
