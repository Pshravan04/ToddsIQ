import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function About() {
  const scrollToPurpose = () => {
    document.getElementById('our-purpose')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <FadeInUp><section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-space-xl">
          <div className="w-full md:w-1/2 flex flex-col gap-3 lg:gap-4">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">ABOUT TODDSIQ™</span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-[#0b3359] font-black tracking-tight leading-tight">
              Big Dreams <br/>
              <span className="text-[#f58f29] relative inline-block z-10">for Little Hands.
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#fcd5a0] -z-10" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,15 C50,0 150,0 200,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg>
              </span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-[#0b3359]/80 max-w-lg leading-snug">
              More than toys. Creative companions designed to spark curiosity, imagination, and real-world learning without the screens.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link className="px-5 py-2.5 bg-coral text-canvas rounded-xl border-2 border-ink font-label-lg text-sm shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2" to="/collections/best-sellers">
                <span>SHOP BESTSELLERS</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <button onClick={scrollToPurpose} className="px-5 py-2.5 bg-white text-[#0b3359] rounded-xl border-2 border-ink font-label-lg text-sm font-bold shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
                <span>OUR PURPOSE ↓</span>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
             <div className="rounded-3xl border-2 border-ink shadow-[6px_6px_0px_#1E2A38] overflow-hidden bg-[#F4F1EA]-lowest relative aspect-[4/3] w-full">
               <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/MagTrack.webp?v=1763487546" alt="ToddsIQ Hands-on Play" className="w-full h-full object-cover mix-blend-multiply" />
               <div className="absolute top-4 right-4 bg-coral text-canvas font-label-sm text-label-sm uppercase tracking-wider px-3 py-1 rounded-full border border-ink shadow-[2px_2px_0px_#1E2A38] font-bold">
                  CREATIVE COMPANION
                </div>
             </div>
          </div>
        </div>
      </section></FadeInUp>

      {/* 2. WHO WE ARE */}
      <FadeInUp><section className="w-full px-gutter py-space-xl bg-canvas border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-space-lg">
          <div className="w-full md:w-1/3">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">WHO WE ARE</span>
            <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">Built for Curious Minds.</h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="font-body-md md:font-body-lg text-ink-variant">
              ToddsIQ™ is a product brand owned and operated by Naeem Body Oil LLC, a registered U.S. company based in California. We specialize in delivering high-quality, educational, and creative products for families across the United States.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-space-md">
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold border border-ink">BASED IN CALIFORNIA</span>
              <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold border border-ink">MADE FOR FAMILIES</span>
              <span className="px-3 py-1 rounded-full bg-[#F4F1EA] text-ink font-label-sm text-label-sm font-bold border border-ink">CREATIVE + EDUCATIONAL</span>
            </div>
          </div>
        </div>
      </section></FadeInUp>

      {/* 3. OUR PURPOSE */}
      <FadeInUp><section id="our-purpose" className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-space-xl">
          <div className="w-full md:w-1/2 order-2 md:order-1 relative">
            <div className="rounded-3xl border-2 border-ink shadow-[5px_5px_0px_#ff6154] overflow-hidden bg-white relative aspect-square w-full max-w-md mx-auto p-space-lg flex items-center justify-center">
              <img 
                src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/thoson-magtrack-03.png?v=1789972736" 
                alt="Child Hands-On Play" 
                className="w-full h-full object-contain"
              />
              {/* Playful Stickers */}
              <div className="absolute top-8 left-8 px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed font-label-sm font-bold border-2 border-ink rounded-full shadow-[2px_2px_0px_#1E2A38] -rotate-6">CREATE</div>
              <div className="absolute bottom-12 right-8 px-4 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold border-2 border-ink rounded-full shadow-[2px_2px_0px_#1E2A38] rotate-3">EXPLORE</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-space-sm order-1 md:order-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">OUR PURPOSE</span>
            <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">
              Building the foundation for brighter futures.
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 mt-2">
              <p>At ToddsIQ™, we’re not just making toys—we’re building the foundation for brighter futures.</p>
              <p>In a world dominated by screens and passive play, we’re on a mission to bring back the magic of hands-on imagination, where creativity, curiosity, and joy take center stage.</p>
              <p>Every product we create is designed to make your child think, move, giggle, and grow with purpose.</p>
            </div>
          </div>
        </div>
      </section></FadeInUp>

      {/* 4. WHAT MAKES TODDSIQ DIFFERENT */}
      <FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="text-center max-w-3xl mx-auto space-y-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">WHAT MAKES TODDSIQ™ DIFFERENT</span>
            <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight">More than a toy.</h2>
            <p className="font-body-lg text-body-lg text-ink-variant">
              Unlike typical toys, ToddsIQ™ is a companion—a thoughtful playmate built to support your child’s mental, emotional, and developmental growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            
            <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center border border-ink shadow-sm text-on-secondary-fixed text-2xl">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-ink">Curious Minds</h3>
                <p className="font-body-sm text-body-sm text-ink-variant mt-2">
                  Designed to encourage questions, exploration, and discovery.
                </p>
              </div>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center border border-ink shadow-sm text-on-tertiary-fixed text-2xl">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-ink">Creative Play</h3>
                <p className="font-body-sm text-body-sm text-ink-variant mt-2">
                  Open-ended experiences that give imagination room to grow.
                </p>
              </div>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center border border-ink shadow-sm text-coral text-2xl">
                <span className="material-symbols-outlined">handshake</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-ink">Interaction</h3>
                <p className="font-body-sm text-body-sm text-ink-variant mt-2">
                  Hands-on play that gets little minds and hands moving.
                </p>
              </div>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center border border-ink shadow-sm text-[#10B981] text-2xl">
                <span className="material-symbols-outlined">phonelink_off</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-ink">Screen-Free</h3>
                <p className="font-body-sm text-body-sm text-ink-variant mt-2">
                  Meaningful play experiences children can enjoy away from screens.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section></FadeInUp>

      {/* 5. BIG DREAMS MANIFESTO */}
      <FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#0b3359] border-b-2 border-ink text-canvas">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-space-xl">
          <div className="w-full md:w-1/2 flex flex-col gap-space-md">
            <h2 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-[#fcd5a0] tracking-tight leading-tight">
              Big dreams<br/>for little hands.
            </h2>
            <p className="font-body-lg text-canvas/90 max-w-lg mt-2">
              We believe children don't need more things to simply keep them busy.
            </p>
            <ul className="font-headline-md text-xl md:text-2xl space-y-3 mt-4 text-canvas/80">
              <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-coral border border-ink"></span> EXPLORE.</li>
              <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed border border-ink"></span> BUILD.</li>
              <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed border border-ink"></span> IMAGINE.</li>
              <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-coral border border-ink"></span> MAKE MISTAKES.</li>
              <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed border border-ink"></span> FIGURE THINGS OUT.</li>
            </ul>
            <p className="font-headline-sm text-coral mt-6 italic">"Look what I made."</p>
          </div>
          <div className="w-full md:w-1/2">
             <div className="rounded-3xl border-2 border-ink shadow-[6px_6px_0px_#1E2A38] overflow-hidden bg-white aspect-[4/3] w-full max-w-md mx-auto relative">
               <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/6a8eaac1-5d40-418f-aa89-b6522654543f_1e60f38e-84d1-4c22-bb85-35158bc9c2a0.webp?v=1775435265" alt="Child discovering" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section></FadeInUp>

      {/* 6. FAMILIES WHO CARE & CREATIVE COMPANION */}
      <FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col lg:flex-row gap-space-xl items-center">
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">FOR FAMILIES WHO CARE</span>
              <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1">
                Because you want more than just a toy.
              </h2>
              <p className="font-body-md text-ink-variant mt-2 mb-space-lg max-w-md">
                Whether you're a parent, a grandparent, or a thoughtful gift-giver, you want more than just toys—you want impact.
              </p>

              <div className="space-y-4">
                <div className="bg-[#F4F1EA]-lowest p-space-md rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center gap-space-md">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-coral text-canvas flex items-center justify-center font-bold text-lg border border-ink">1</div>
                  <div>
                    <h3 className="font-title-md text-ink font-bold">A Burst of Curiosity</h3>
                    <p className="font-body-sm text-ink-variant mt-0.5">Something that makes them ask, explore, and wonder.</p>
                  </div>
                </div>
                <div className="bg-[#F4F1EA]-lowest p-space-md rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center gap-space-md">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-lg border border-ink">2</div>
                  <div>
                    <h3 className="font-title-md text-ink font-bold">A Tool for Learning</h3>
                    <p className="font-body-sm text-ink-variant mt-0.5">Play that turns discovery into an experience.</p>
                  </div>
                </div>
                <div className="bg-[#F4F1EA]-lowest p-space-md rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex items-center gap-space-md">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-lg border border-ink">3</div>
                  <div>
                    <h3 className="font-title-md text-ink font-bold">A Companion for Their Story</h3>
                    <p className="font-body-sm text-ink-variant mt-0.5">Something they can build memories around.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="rounded-3xl border-2 border-ink shadow-[5px_5px_0px_#1E2A38] overflow-hidden bg-[#FFF8E7] aspect-square w-full max-w-md mx-auto">
                <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/863e6c75-e3eb-4fb9-b1f8-edccf374bcbf_70548431-7df3-42d2-bc62-5ba682dceb57.png?v=1775435140" alt="ToddsIQ Product Details" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="absolute top-1/2 -right-2 md:-right-8 -translate-y-1/2 bg-white px-6 py-4 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] rotate-2 z-10 hidden sm:block">
                <span className="font-label-xs block text-ink-variant mb-1 tracking-widest font-bold">TODDSIQ™</span>
                <span className="font-headline-sm text-ink leading-tight">CREATIVE<br/>COMPANION</span>
              </div>
            </div>
          </div>
        </div>
      </section></FadeInUp>

      {/* 7. CTA */}
      <FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas border-b-2 border-ink">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0b3359] border-2 border-ink shadow-[8px_8px_0px_#1E2A38] p-space-lg lg:p-space-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-space-xl">
          <div className="w-full md:w-3/5 space-y-space-sm text-left relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-coral text-canvas font-label-sm text-label-sm font-bold border border-ink inline-block">
              READY TO PLAY?
            </span>
            <h2 className="font-headline-lg text-4xl text-canvas tracking-tight">Ready to spark their next aha! moment?</h2>
            <p className="font-body-md text-canvas/80 max-w-sm">
              Discover hands-on products designed to turn curiosity into creativity.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link className="px-6 py-3 bg-coral text-canvas rounded-xl border-2 border-ink font-label-lg text-sm shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2" to="/collections/best-sellers">
                SHOP BESTSELLERS
              </Link>
              <Link className="px-6 py-3 bg-white text-ink rounded-xl border-2 border-ink font-label-lg text-sm font-bold shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" to="/collections">
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/5 hidden md:block relative z-10">
            <div className="rounded-2xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] overflow-hidden bg-[#F4F1EA] aspect-square w-full rotate-3 max-w-sm mx-auto">
              <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/MagTrack.webp?v=1763487546" alt="ToddsIQ Products" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
          </div>
          
          {/* Decorative shapes inside CTA */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/5 rotate-12 z-0 pointer-events-none"></div>
        </div>
      </section></FadeInUp>

    </div>
  );
}
