import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function RefundPolicy() {
  const lastUpdated = 'October 27, 2026';

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-5xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              30-DAY LIVING ROOM GUARANTEE
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Refund & <span className="text-[#f58f29]">Return Policy.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-2xl leading-relaxed">
              We want you and your child to love every moment of playtime. That's why every single ToddsIQ™ product is backed by our 30-Day Risk-Free Living Room Guarantee.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-ink/60 bg-white px-3 py-1.5 rounded-full border border-ink/20 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-coral">verified_user</span>
              Last Updated: {lastUpdated}
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. GUARANTEE HIGHLIGHTS */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 border-b-2 border-ink bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral/20 border border-ink flex items-center justify-center text-coral flex-shrink-0">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">30-Day Trial</strong>
                <span className="text-xs text-ink/70">Unbox, test, and enjoy at home</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed border border-ink flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">100% Refund</strong>
                <span className="text-xs text-ink/70">Prompt refund to original payment</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed border border-ink flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">autorenew</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Free Replacement</strong>
                <span className="text-xs text-ink/70">Immediate replacement if damaged</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed border border-ink flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Human Support</strong>
                <span className="text-xs text-ink/70">Direct help at hello@toddsiq.com</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 3. STEP BY STEP RETURN GUIDE */}
      <FadeInUp>
        <section className="w-full px-gutter py-12 bg-[#F4F1EA]/50 border-b-2 border-ink">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold">SIMPLE & STRESS-FREE</span>
              <h2 className="font-display text-3xl font-bold text-ink mt-1">How Returns Work in 4 Easy Steps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-coral text-white font-bold text-sm flex items-center justify-center mb-3">1</span>
                  <h3 className="font-bold text-ink text-base mb-1">Email Support</h3>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Drop us an email at <span className="font-bold text-coral">hello@toddsiq.com</span> with your Order Number and the item you'd like to return.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-sm flex items-center justify-center mb-3">2</span>
                  <h3 className="font-bold text-ink text-base mb-1">Get Instructions</h3>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Our team will reply within 24 hours with return instructions and the return warehouse address.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-sm flex items-center justify-center mb-3">3</span>
                  <h3 className="font-bold text-ink text-base mb-1">Send Package</h3>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Place the item safely with its original parts into its box and drop it off at your local carrier.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white font-bold text-sm flex items-center justify-center mb-3">4</span>
                  <h3 className="font-bold text-ink text-base mb-1">Receive Refund</h3>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Once received, your refund is processed within 3 to 5 business days back to your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 4. POLICY DETAILS */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Section 1: The Living Room Guarantee */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">1</span>
              The 30-Day Living Room Guarantee
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We know that bringing new educational toys into your home is an investment in your child's growth. We want you to feel 100% confident in that decision.
              </p>
              <p>
                Unbox your ToddsIQ™ toy, let your child explore, build, sketch, or discover. If after 30 days of receiving your order you don't observe engaged, screen-free play or if you are not completely delighted for any reason, simply email us at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> to initiate a return.
              </p>
            </div>
          </div>

          {/* Section 2: Eligibility Criteria */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">2</span>
              Eligibility Requirements
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>To qualify for a refund under our 30-day policy:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Your request must be submitted within <strong>30 calendar days</strong> of the verified delivery date.</li>
                <li>Items should include all original parts, pieces, charging cables, pens, and accessories originally included in the set.</li>
                <li>Proof of purchase (order confirmation number or purchase email address) is required.</li>
                <li>Items marked explicitly as “Final Sale” or downloadable digital guides are exempt from returns.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Damaged, Defective or Wrong Items */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">3</span>
              Damaged, Defective, or Incorrect Items
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                Please inspect your order upon reception. If the item is defective, damaged in transit, or if you received the wrong product, please contact us immediately at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> with a quick photo or video of the issue.
              </p>
              <div className="p-4 rounded-xl bg-[#E8F8F5] border border-[#1F9D8A]/30 text-sm">
                <strong className="text-[#1F9D8A] block font-bold mb-1">Our Fast Replacement Promise</strong>
                If your product arrived broken or malfunctioning, you do not need to deal with the hassle of return shipping. We will immediately expedite a brand new replacement directly to your door at zero additional cost.
              </div>
            </div>
          </div>

          {/* Section 4: Refund Processing & Timelines */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">4</span>
              Refund Processing & Timeline
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                Once your return is received and inspected at our fulfillment center, we will send you an email confirmation notifying you that your refund has been approved.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Approved refunds are submitted directly back to your original payment method (Credit Card, PayPal, Apple Pay, Google Pay).</li>
                <li>Refunds typically appear in your bank or card statement within <strong>3 to 5 business days</strong>, depending on your financial institution's processing speed.</li>
                <li>Original shipping charges (if applicable for orders under $50) are non-refundable unless the return is due to our error or product damage.</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Order Cancellations */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">5</span>
              Order Cancellations & Modifications
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                Our warehouse team works swiftly to dispatch orders within 24–48 hours. If you wish to cancel or modify an order, please email <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> as quickly as possible with the subject line <em>"URGENT: Order Cancellation"</em>.
              </p>
              <p>
                If your order has not yet been processed by our warehouse, we will immediately cancel it and issue a 100% refund. If the package has already shipped, you can simply use our 30-day return process upon arrival.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#F4F1EA] border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Need to start a return or exchange?</h3>
              <p className="font-body-sm text-ink-variant mt-1">Our support specialists are here to guide you every step of the way.</p>
              <p className="text-sm font-semibold text-coral mt-1">hello@toddsiq.com</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
            >
              Start Return Request →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
