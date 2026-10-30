import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeInUp } from '../components/AnimatedSection';

const FAQ_DATA = [
  {
    category: 'shipping',
    categoryName: 'Shipping & Delivery',
    icon: 'local_shipping',
    question: 'How long does shipping take?',
    answer: 'Orders are processed and dispatched from our warehouse within 1 to 2 business days (Monday through Friday). Once shipped, standard delivery takes 3 to 7 business days within the contiguous United States. Express Priority shipping options (2–4 business days) are also available during checkout.'
  },
  {
    category: 'shipping',
    categoryName: 'Shipping & Delivery',
    icon: 'local_shipping',
    question: 'How much does shipping cost?',
    answer: 'Standard shipping is completely FREE on all orders over $50! For domestic orders under $50, we offer a low flat-rate shipping fee of $9.99. Express shipping rates are dynamically calculated at checkout based on destination.'
  },
  {
    category: 'shipping',
    categoryName: 'Shipping & Delivery',
    icon: 'local_shipping',
    question: 'How do I track my order?',
    answer: 'As soon as your package leaves our fulfillment center, we send a shipping confirmation email containing your official tracking number and a live carrier link. You can also visit our Track Your Order page anytime and enter your Order Number or Tracking ID.'
  },
  {
    category: 'shipping',
    categoryName: 'Shipping & Delivery',
    icon: 'local_shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to Canada, the United Kingdom, Australia, and select European destinations. International shipments typically take 7 to 14 business days. Please note that customs duties or import taxes may apply depending on your destination country.'
  },
  {
    category: 'returns',
    categoryName: 'Returns & Guarantee',
    icon: 'verified_user',
    question: 'How does the 30-Day Living Room Guarantee work?',
    answer: 'We want you to feel complete peace of mind. Unbox the toy, let your child explore, build, and play in your living room for up to 30 days. If you don’t notice increased focus, joy, and active screen-free engagement, simply email our customer support at hello@toddsiq.com for return instructions and a 100% refund of your purchase price.'
  },
  {
    category: 'returns',
    categoryName: 'Returns & Guarantee',
    icon: 'verified_user',
    question: 'What if my order arrives damaged or with missing pieces?',
    answer: 'We take great pride in our packaging, but if transit mishandling occurs, don’t worry! Simply email hello@toddsiq.com with your order number and a quick photo or video. We will immediately expedite a brand new replacement directly to your door at zero extra cost to you.'
  },
  {
    category: 'returns',
    categoryName: 'Returns & Guarantee',
    icon: 'verified_user',
    question: 'How long do refunds take to process?',
    answer: 'Once your return parcel is delivered to our fulfillment warehouse and checked in, we process your refund within 3 to 5 business days. The funds will be credited directly back to your original payment method (Credit Card, PayPal, Apple Pay, etc.).'
  },
  {
    category: 'toys',
    categoryName: 'Toys & Safety',
    icon: 'child_care',
    question: 'Are ToddsIQ™ toys certified non-toxic and child-safe?',
    answer: 'Safety is our absolute top priority. All ToddsIQ™ toys are manufactured with premium, BPA-free, lead-free, non-toxic ABS plastic and natural finishes. Our products strictly comply with U.S. Consumer Product Safety Commission (CPSC), ASTM F963, and CPSIA standards, featuring rounded, smooth edges designed for little hands.'
  },
  {
    category: 'toys',
    categoryName: 'Toys & Safety',
    icon: 'child_care',
    question: 'How do I choose the right toy for my child’s age?',
    answer: 'We organize our collections by targeted developmental milestones: Ages 1–3 focus on sensory exploration, hand-eye coordination, and fine motor skills; Ages 3–5 focus on creative storytelling, drawing companions, and early phonics; and Ages 5+ feature advanced STEM problem-solving and kinetic engineering.'
  },
  {
    category: 'toys',
    categoryName: 'Toys & Safety',
    icon: 'child_care',
    question: 'Do electronic toys (like the Drawing Robot) need batteries?',
    answer: 'Our smart robotic and electronic companions (such as the ToddsIQ™ Drawing Robot) feature built-in, USB-C rechargeable lithium batteries so you don’t have to constantly buy disposable batteries. A charging cable and full accessory set are included in every box.'
  },
  {
    category: 'orders',
    categoryName: 'Orders & Payments',
    icon: 'credit_card',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), as well as Apple Pay, Google Pay, PayPal, and Shop Pay. All transactions are securely processed through Shopify’s Level 1 PCI-DSS certified checkout with 256-bit SSL encryption.'
  },
  {
    category: 'orders',
    categoryName: 'Orders & Payments',
    icon: 'credit_card',
    question: 'Can I change or cancel my order after placing it?',
    answer: 'Because our warehouse team begins preparing orders quickly, please email hello@toddsiq.com within 2 hours of placing your order if you need to modify your shipping address or cancel. If the package has already been handed to the carrier, you can simply take advantage of our 30-day return policy upon arrival.'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: 'help' },
  { id: 'shipping', label: 'Shipping & Delivery', icon: 'local_shipping' },
  { id: 'returns', label: 'Returns & Guarantee', icon: 'verified_user' },
  { id: 'toys', label: 'Toys & Child Safety', icon: 'child_care' },
  { id: 'orders', label: 'Orders & Payments', icon: 'credit_card' }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query) || 
      faq.categoryName.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              HELP CENTER & ANSWERS
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Frequently Asked <span className="text-[#f58f29]">Questions.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-2xl leading-relaxed">
              Have a question about our developmental toys, order tracking, shipping, or the 30-Day Guarantee? We've got you covered with quick, transparent answers.
            </p>

            {/* Quick Search Bar */}
            <div className="w-full max-w-xl mt-4 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-xl pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. shipping time, guarantee, safety)..."
                className="w-full h-12 pl-12 pr-10 rounded-2xl border-2 border-ink bg-white text-ink text-sm font-medium focus:outline-none focus:border-coral shadow-[3px_3px_0px_#1E2A38] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. CATEGORY FILTER CHIPS */}
      <section className="w-full px-gutter py-6 border-b-2 border-ink bg-white">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 border-ink transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-coral text-white shadow-[2px_2px_0px_#1E2A38] -translate-y-0.5'
                    : 'bg-[#F4F1EA] text-ink hover:bg-[#F4F1EA]-high'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. ACCORDION QUESTIONS LIST */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border-2 border-ink text-center shadow-[4px_4px_0px_#1E2A38]">
              <span className="material-symbols-outlined text-4xl text-ink/30 mb-2">search_off</span>
              <h3 className="font-display text-xl font-bold text-ink">No questions found</h3>
              <p className="text-sm text-ink/70 mt-1">Try adjusting your search terms or view all categories.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-[#F4F1EA] text-ink font-bold rounded-xl border border-ink text-xs hover:bg-coral hover:text-white transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F4F1EA]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#F4F1EA] border border-ink/20 flex items-center justify-center text-coral flex-shrink-0">
                        <span className="material-symbols-outlined text-sm">{faq.icon}</span>
                      </span>
                      <span className="font-display font-bold text-base md:text-lg text-ink">
                        {faq.question}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-ink/60 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-coral' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 pt-1 text-sm md:text-base text-ink-variant leading-relaxed border-t border-ink/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}

          {/* Quick Help CTA Card */}
          <div className="mt-12 p-6 md:p-8 rounded-3xl bg-[#FFF8E7] border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-label-sm uppercase tracking-wider text-coral font-bold text-xs">STILL HAVE QUESTIONS?</span>
              <h3 className="font-display text-2xl font-bold text-ink">We're Here to Help!</h3>
              <p className="font-body-sm text-sm text-ink-variant">
                Our California-based support team responds within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
              >
                Contact Us
              </Link>
              <a
                href="mailto:hello@toddsiq.com"
                className="px-5 py-2.5 bg-white text-ink font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
              >
                hello@toddsiq.com
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
