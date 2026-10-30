import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function ShippingPolicy() {
  const lastUpdated = 'October 27, 2026';

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-5xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              FAST & TRACKED DELIVERY
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Shipping <span className="text-[#f58f29]">Policy.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-2xl leading-relaxed">
              We know parents and little learners can't wait for playtime to begin! Here is everything you need to know about our processing, shipping speeds, and order tracking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/track"
                className="px-6 py-2.5 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] transition-all text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">local_shipping</span>
                Track Your Order
              </Link>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-ink/60 bg-white px-3 py-2 rounded-full border border-ink/20 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-coral">schedule</span>
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. SHIPPING SNAPSHOT CARDS */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 border-b-2 border-ink bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral/20 border border-ink flex items-center justify-center text-coral flex-shrink-0">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">1–2 Day Dispatch</strong>
                <span className="text-xs text-ink/70">Fast warehouse fulfillment</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed border border-ink flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Free Over $50</strong>
                <span className="text-xs text-ink/70">Or flat $9.99 standard</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed border border-ink flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">3–7 Business Days</strong>
                <span className="text-xs text-ink/70">Average US delivery time</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed border border-ink flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">pin_drop</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">100% Tracked</strong>
                <span className="text-xs text-ink/70">Live tracking link by email</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 3. POLICY DETAILS */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Section 1: Processing */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">1</span>
              Order Processing Time
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                All orders are processed Monday through Friday (excluding major U.S. holidays).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Standard Processing:</strong> Orders are verified, carefully packaged, and dispatched from our warehouse within <strong>1 to 2 business days</strong> (24–48 hours).</li>
                <li><strong>High Volume Periods:</strong> During major promotional sales or holiday seasons (e.g., Black Friday, Christmas), order handling may take up to 3 business days.</li>
                <li><strong>Confirmation:</strong> Once your order is placed, you will immediately receive an Order Confirmation email. Once dispatched, you will receive a second email containing your tracking number and carrier link.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Domestic Shipping Rates & Estimates */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">2</span>
              Domestic Shipping Rates & Delivery Estimates
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 leading-relaxed">
              <p>We ship to addresses across the United States, including Alaska, Hawaii, and APO/FPO addresses.</p>
              
              <div className="overflow-x-auto rounded-2xl border-2 border-ink shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F4F1EA] border-b-2 border-ink text-ink font-bold">
                    <tr>
                      <th className="p-3 md:p-4">Shipping Tier</th>
                      <th className="p-3 md:p-4">Order Value</th>
                      <th className="p-3 md:p-4">Estimated Transit Time</th>
                      <th className="p-3 md:p-4">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    <tr className="hover:bg-[#F4F1EA]/50">
                      <td className="p-3 md:p-4 font-bold text-ink">Free Standard Shipping</td>
                      <td className="p-3 md:p-4">$50.00 and above</td>
                      <td className="p-3 md:p-4">3–7 business days</td>
                      <td className="p-3 md:p-4 font-bold text-[#1F9D8A]">FREE</td>
                    </tr>
                    <tr className="hover:bg-[#F4F1EA]/50">
                      <td className="p-3 md:p-4 font-bold text-ink">Standard Shipping</td>
                      <td className="p-3 md:p-4">Under $50.00</td>
                      <td className="p-3 md:p-4">3–7 business days</td>
                      <td className="p-3 md:p-4 font-bold text-ink">$9.99</td>
                    </tr>
                    <tr className="hover:bg-[#F4F1EA]/50">
                      <td className="p-3 md:p-4 font-bold text-ink">Express Priority Delivery</td>
                      <td className="p-3 md:p-4">Any order value</td>
                      <td className="p-3 md:p-4">2–4 business days</td>
                      <td className="p-3 md:p-4 font-bold text-ink">Calculated at Checkout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-ink/60 italic">
                *Estimated transit times begin once the package has been handed over to the carrier. Rural or remote areas may take slightly longer.
              </p>
            </div>
          </div>

          {/* Section 3: Carriers & Order Tracking */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">3</span>
              Carrier Partners & Live Tracking
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 leading-relaxed">
              <p>
                We partner with reputable domestic and international carriers including <strong>USPS, UPS, FedEx, and DHL</strong> to ensure reliable door-to-door delivery.
              </p>
              <div className="p-4 rounded-xl bg-[#FFF8E7] border border-ink/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <strong className="block text-ink font-bold">Looking for your parcel?</strong>
                  <span className="text-sm text-ink/70">Check tracking progress with your Order Number or Tracking ID.</span>
                </div>
                <Link
                  to="/track"
                  className="px-4 py-2 bg-coral text-white font-bold rounded-xl border border-ink text-sm shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Track Package Now
                </Link>
              </div>
            </div>
          </div>

          {/* Section 4: International Shipping */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">4</span>
              International Shipping & Customs
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We proudly ship our developmental toys to Canada, the United Kingdom, Australia, and select international destinations.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>International Transit Time:</strong> Typically 7 to 14 business days, depending on destination country and customs inspection speeds.</li>
                <li><strong>Customs, Duties & Taxes:</strong> Depending on your country's customs regulations, import duties, tariffs, and taxes may apply upon entry. Any applicable import fees are the responsibility of the recipient.</li>
              </ul>
            </div>
          </div>

          {/* Section 5: Address Changes & Shipping Issues */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">5</span>
              Address Accuracy, Lost & Damaged Packages
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                <strong>Need to update your address?</strong> Please email <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> with your order number as soon as possible. If the order has not yet been processed by the fulfillment center, we will gladly update it for you.
              </p>
              <p>
                <strong>Damaged or Lost in Transit?</strong> If your package arrived damaged or has not moved in tracking for over 7 business days, don't worry. Contact our team right away. We will immediately open a carrier claim and arrange a replacement shipment at zero extra charge to you under our satisfaction commitment.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#F4F1EA] border-2 border-ink shadow-[4px_4px_0px_#1E2A38] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Have a question about your shipment?</h3>
              <p className="font-body-sm text-ink-variant mt-1">Our support team is always happy to look up your parcel.</p>
              <p className="text-sm font-semibold text-coral mt-1">hello@toddsiq.com</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
            >
              Contact Support →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
