import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    category: '',
    orderNumber: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formState.email.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = 'Please enter a valid email address.';
    if (!formState.category) newErrors.category = 'Please tell us how we can help.';
    if (!formState.message.trim()) newErrors.message = 'Please provide a message.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormState({
      name: '',
      email: '',
      category: '',
      orderNumber: '',
      message: ''
    });
  };

  const scrollToForm = (category) => {
    if (category) {
      setFormState(prev => ({ ...prev, category }));
    }
    document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-space-xl">
            <div className="w-full md:w-1/2 flex flex-col gap-3 lg:gap-4">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">GET IN TOUCH</span>
              <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
                We're Here <br />
                <span className="text-[#f58f29] relative inline-block z-10">to Help.
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#fcd5a0] -z-10" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0,15 C50,0 150,0 200,15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/></svg>
                </span>
              </h1>
              <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-lg leading-snug">
                Have a question about a product, your order, or finding the right creative companion? We'd love to hear from you.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-3xl border-2 border-ink shadow-[6px_6px_0px_#1E2A38] overflow-hidden bg-[#FFF8E7] relative aspect-[4/3] w-full max-w-lg mx-auto">
                <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/863e6c75-e3eb-4fb9-b1f8-edccf374bcbf_70548431-7df3-42d2-bc62-5ba682dceb57.png?v=1775435140" alt="ToddsIQ Help" className="w-full h-full object-cover mix-blend-multiply" />
                <div className="absolute top-4 right-4 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider px-3 py-1 rounded-full border border-ink shadow-[2px_2px_0px_#1E2A38] font-bold">
                  LET'S TALK
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. CONTACT OPTIONS */}
      <FadeInUp>
        <section className="w-full px-gutter py-space-xl bg-canvas border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
            <div className="text-center max-w-3xl mx-auto space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">HOW CAN WE HELP?</span>
              <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight">Choose What You Need.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              
              <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md items-start">
                <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center border border-ink shadow-sm text-coral text-2xl">
                  <span className="material-symbols-outlined">package_2</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-ink font-bold">Order Help</h3>
                  <p className="font-body-sm text-body-sm text-ink-variant mt-2 mb-4">
                    Questions about delivery or tracking?
                  </p>
                  <button onClick={() => scrollToForm('Order Support')} className="text-coral font-label-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    GET ORDER HELP <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md items-start">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center border border-ink shadow-sm text-on-tertiary-fixed text-2xl">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-ink font-bold">Product Questions</h3>
                  <p className="font-body-sm text-body-sm text-ink-variant mt-2 mb-4">
                    Need help choosing the right product for your child?
                  </p>
                  <button onClick={() => scrollToForm('Product Question')} className="text-tertiary font-label-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    ASK ABOUT A PRODUCT <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center border border-ink shadow-sm text-on-secondary-fixed text-2xl">
                  <span className="material-symbols-outlined">sync</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-ink font-bold">Returns & Exchanges</h3>
                  <p className="font-body-sm text-body-sm text-ink-variant mt-2 mb-4">
                    Need help with a return or exchange?
                  </p>
                  <button onClick={() => scrollToForm('Returns & Exchanges')} className="text-[#0b3359] font-label-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    RETURNS & EXCHANGES <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="p-space-lg rounded-2xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col gap-space-md items-start">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center border border-ink shadow-sm text-[#10B981] text-2xl">
                  <span className="material-symbols-outlined">chat_bubble</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-ink font-bold">General Questions</h3>
                  <p className="font-body-sm text-body-sm text-ink-variant mt-2 mb-4">
                    Something else? We're happy to help.
                  </p>
                  <button onClick={() => scrollToForm('General Question')} className="text-[#10B981] font-label-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    CONTACT US <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 3. MAIN CONTACT FORM */}
      <FadeInUp>
        <section id="contact-form-section" className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-space-xl">
            
            {/* Left — Form */}
            <div className="w-full lg:w-[65%]">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">SEND US A MESSAGE</span>
              <h2 className="font-headline-lg text-headline-lg text-ink tracking-tight mt-1 mb-2">Let's Talk.</h2>
              <p className="font-body-md text-ink-variant mb-space-lg max-w-lg">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="bg-canvas p-space-xl rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] text-center max-w-xl">
                  <div className="w-16 h-16 bg-[#10B981]/20 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#10B981]/30">
                    <span className="material-symbols-outlined text-3xl">check</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mb-2">MESSAGE SENT</h3>
                  <p className="font-body-md text-ink-variant mb-8">
                    Thanks for reaching out! We've received your message and will be in touch.
                  </p>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-3 bg-white text-ink rounded-xl border-2 border-ink font-label-lg text-sm font-bold shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-flex items-center gap-2"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-canvas p-space-md sm:p-space-xl rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] space-y-5 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-label-md text-ink mb-1 font-bold">FULL NAME *</label>
                      <input 
                        id="name"
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full h-[48px] px-4 rounded-xl border-2 ${errors.name ? 'border-coral' : 'border-ink/20'} bg-[#F4F1EA]-lowest focus:border-coral focus:outline-none font-body-md transition-colors`} 
                      />
                      {errors.name && <p className="text-coral text-xs mt-1 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-label-md text-ink mb-1 font-bold">EMAIL ADDRESS *</label>
                      <input 
                        id="email"
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full h-[48px] px-4 rounded-xl border-2 ${errors.email ? 'border-coral' : 'border-ink/20'} bg-[#F4F1EA]-lowest focus:border-coral focus:outline-none font-body-md transition-colors`} 
                      />
                      {errors.email && <p className="text-coral text-xs mt-1 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block font-label-md text-ink mb-1 font-bold">WHAT CAN WE HELP WITH? *</label>
                    <div className="relative">
                      <select 
                        id="category"
                        value={formState.category}
                        onChange={(e) => setFormState(prev => ({ ...prev, category: e.target.value }))}
                        className={`w-full h-[48px] px-4 rounded-xl border-2 ${errors.category ? 'border-coral' : 'border-ink/20'} bg-[#F4F1EA]-lowest focus:border-coral focus:outline-none font-body-md transition-colors appearance-none`}
                      >
                        <option value="">Select a category</option>
                        <option value="General Question">General Question</option>
                        <option value="Product Question">Product Question</option>
                        <option value="Order Support">Order Support</option>
                        <option value="Shipping & Delivery">Shipping & Delivery</option>
                        <option value="Returns & Exchanges">Returns & Exchanges</option>
                        <option value="Wholesale / Partnership">Wholesale / Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50">expand_more</span>
                    </div>
                    {errors.category && <p className="text-coral text-xs mt-1 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {errors.category}</p>}
                  </div>

                  <div>
                    <label htmlFor="orderNumber" className="block font-label-md text-ink mb-1 font-bold">ORDER NUMBER <span className="font-normal text-ink/50">(Optional)</span></label>
                    <input 
                      id="orderNumber"
                      type="text" 
                      value={formState.orderNumber}
                      onChange={(e) => setFormState(prev => ({ ...prev, orderNumber: e.target.value }))}
                      className="w-full h-[48px] px-4 rounded-xl border-2 border-ink/20 bg-[#F4F1EA]-lowest focus:border-coral focus:outline-none font-body-md transition-colors" 
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-label-md text-ink mb-1 font-bold">MESSAGE *</label>
                    <textarea 
                      id="message"
                      rows="5" 
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className={`w-full min-h-[140px] p-4 rounded-xl border-2 ${errors.message ? 'border-coral' : 'border-ink/20'} bg-[#F4F1EA]-lowest focus:border-coral focus:outline-none font-body-md resize-y transition-colors`} 
                      placeholder="Tell us a little about how we can help..."
                    ></textarea>
                    {errors.message && <p className="text-coral text-xs mt-1 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">error</span> {errors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[200px] h-[48px] px-6 bg-coral text-canvas rounded-xl font-label-lg border-2 border-ink shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><span className="w-4 h-4 border-2 border-canvas/30 border-t-canvas rounded-full animate-spin"></span> SENDING...</>
                    ) : (
                      <>SEND MESSAGE <span className="material-symbols-outlined text-sm">arrow_forward</span></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right — Support Card */}
            <div className="w-full lg:w-[35%] pt-8 lg:pt-16">
              <div className="bg-canvas p-space-lg rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] sticky top-24">
                <h3 className="font-display text-2xl font-bold text-ink mb-3">Need a little help?</h3>
                <p className="font-body-sm text-ink-variant mb-6">
                  For questions about your order, product, shipping, or returns, send us a message and we'll help you find the right answer.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <span className="font-label-sm text-ink/50 font-bold tracking-widest uppercase block mb-1">Customer Support</span>
                    <a href="mailto:hello@toddsiq.com" className="font-body-md font-bold text-coral hover:underline">hello@toddsiq.com</a>
                  </div>
                  
                  <div>
                    <span className="font-label-sm text-ink/50 font-bold tracking-widest uppercase block mb-1">Location</span>
                    <p className="font-body-sm text-ink-variant">
                      ToddsIQ™ is a product brand owned and operated by Naeem Body Oil LLC, a registered U.S. company based in California.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-ink/10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full border-2 border-ink bg-coral/20 flex items-center justify-center text-coral text-sm"><span className="material-symbols-outlined text-base">face</span></div>
                    <div className="w-10 h-10 rounded-full border-2 border-ink bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed text-sm"><span className="material-symbols-outlined text-base">mood</span></div>
                  </div>
                  <div className="font-label-sm font-bold text-ink leading-tight">
                    REAL PEOPLE<br/>
                    <span className="text-ink/60">HELPFUL SUPPORT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 4 & 5. ORDER SUPPORT & FAQ */}
      <FadeInUp>
        <section className="w-full px-gutter py-space-xl bg-canvas border-b-2 border-ink">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-space-xl">
            
            <div className="flex flex-col sm:flex-row items-center gap-space-md p-space-lg rounded-3xl bg-[#F4F1EA]-lowest border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
              <div className="w-24 h-24 shrink-0 rounded-2xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] overflow-hidden bg-white">
                <img src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/MagTrack.webp?v=1763487546" alt="ToddsIQ Box" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-headline-sm text-ink font-bold mb-1">Need Help With an Order?</h3>
                <p className="font-body-sm text-ink-variant mb-4">
                  Have an order question? Keep your order number nearby so we can help you faster.
                </p>
                <Link to="/contact" className="inline-flex px-4 py-2 bg-white text-ink rounded-xl border-2 border-ink font-label-md text-sm font-bold shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all items-center gap-1">
                  TRACK YOUR ORDER <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-space-lg rounded-3xl bg-secondary-fixed/30 border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
              <div className="w-12 h-12 bg-white rounded-full border-2 border-ink flex items-center justify-center text-ink mb-3 shadow-sm">
                <span className="material-symbols-outlined text-xl">help</span>
              </div>
              <h3 className="font-headline-sm text-ink font-bold mb-1">Looking for a quick answer?</h3>
              <p className="font-body-sm text-ink-variant mb-4 max-w-sm">
                You may find what you're looking for in our frequently asked questions.
              </p>
              <Link to="/contact" className="inline-flex px-4 py-2 bg-white text-ink rounded-xl border-2 border-ink font-label-md text-sm font-bold shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1E2A38] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all items-center gap-1">
                VIEW FAQs <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

          </div>
        </section>
      </FadeInUp>

      {/* 6. FINAL CTA */}
      <FadeInUp>
        <section className="w-full px-gutter py-space-2xl bg-canvas">
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#0b3359] border-2 border-ink shadow-[8px_8px_0px_#1E2A38] p-space-lg lg:p-space-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-space-xl">
            <div className="w-full md:w-3/5 space-y-space-sm text-left relative z-10">
              <h2 className="font-headline-lg text-4xl text-canvas tracking-tight">Ready to Find Their Next Favorite?</h2>
              <p className="font-body-md text-canvas/80 max-w-sm">
                Explore hands-on products designed to turn curiosity into creativity.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link className="px-6 py-3 bg-coral text-canvas rounded-xl border-2 border-ink font-label-lg text-sm shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2" to="/collections/best-sellers">
                  SHOP NOW
                </Link>
                <Link className="px-6 py-3 bg-white text-ink rounded-xl border-2 border-ink font-label-lg text-sm font-bold shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all" to="/collections/best-sellers">
                  BEST SELLERS
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
        </section>
      </FadeInUp>

    </div>
  );
}
