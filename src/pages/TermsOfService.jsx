import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function TermsOfService() {
  const lastUpdated = 'October 27, 2026';

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-5xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              TERMS & CONDITIONS
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Terms of <span className="text-[#f58f29]">Service.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-2xl leading-relaxed">
              Welcome to ToddsIQ™. Please read these Terms of Service carefully before browsing or making a purchase on our website. By using our website, you agree to be bound by these terms.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-ink/60 bg-white px-3 py-1.5 rounded-full border border-ink/20 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-coral">verified</span>
              Last Updated: {lastUpdated}
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. SUMMARY HIGHLIGHTS */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 border-b-2 border-ink bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral/20 border border-ink flex items-center justify-center text-coral flex-shrink-0">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Clear & Fair</strong>
                <span className="text-xs text-ink/70">Transparent terms for every customer</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed border border-ink flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">30-Day Guarantee</strong>
                <span className="text-xs text-ink/70">Living Room risk-free play guarantee</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed border border-ink flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Upfront Pricing</strong>
                <span className="text-xs text-ink/70">No hidden fees or unexpected charges</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed border border-ink flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">public</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">California Law</strong>
                <span className="text-xs text-ink/70">Governed under United States law</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 3. DETAILED TERMS SECTIONS */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Section 1 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">1</span>
              General Overview & Acceptance
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                This website (<strong>toddsiq.com</strong>) is operated by <strong>Naeem Body Oil LLC</strong>, doing business as <strong>ToddsIQ™</strong>. Throughout the site, the terms “we”, “us” and “our” refer to ToddsIQ™.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and policies referenced herein or available by hyperlink.
              </p>
              <p>
                Please read these Terms carefully before accessing or using our website. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">2</span>
              Online Store Eligibility & Account Requirements
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority and have given us your consent to allow any of your minor dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized purpose, nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
              <p>
                A breach or violation of any of the Terms will result in an immediate termination of your Services.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">3</span>
              Products, Accuracy of Information & Pricing
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We have made every effort to display as accurately as possible the colors and images of our products that appear on the store. However, we cannot guarantee that your computer or mobile screen’s display of any color will be completely exact.
              </p>
              <p>
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              </p>
              <p>
                All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">4</span>
              Accuracy of Billing and Account Information
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
              </p>
              <p>
                In the event that we make a change to or cancel an order, we will notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
              </p>
              <p>
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your email address and payment details so that we can complete your transactions and contact you as needed.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">5</span>
              Shipping, Title & Risk of Loss
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                All purchases of physical items from ToddsIQ™ are made pursuant to a shipment contract. This means that the risk of loss and title for such items pass to you upon our delivery to the carrier (e.g. USPS, UPS, FedEx).
              </p>
              <p>
                However, customer satisfaction is our top priority. In the unlikely event that a shipment is lost in transit, arrived damaged, or marked delivered but not received, please contact us at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> within 14 days so our support team can assist you with an investigation and a replacement.
              </p>
              <p>
                Please refer to our full <Link to="/shipping" className="text-coral underline font-bold">Shipping Policy</Link> for detailed delivery timelines and rates.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">6</span>
              30-Day Living Room Guarantee & Returns
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We stand behind the developmental value of every toy we create. We offer a <strong>30-Day Risk-Free Living Room Guarantee</strong>: if after 30 days of delivery you or your child are not delighted with your purchase, you may initiate a return for a refund.
              </p>
              <p>
                For detailed conditions, step-by-step return instructions, and refund timelines, please review our comprehensive <Link to="/refund-policy" className="text-coral underline font-bold">Refund & Return Policy</Link>.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">7</span>
              Intellectual Property Rights
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                The ToddsIQ™ trademark, logo, graphics, website design, product illustrations, text, and marketing media are the exclusive intellectual property of <strong>Naeem Body Oil LLC</strong> and are protected by United States and international copyright, trademark, and unfair competition laws.
              </p>
              <p>
                You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service or website content without express written permission by us.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">8</span>
              Limitation of Liability & Warranty Disclaimer
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free.
              </p>
              <p>
                In no case shall ToddsIQ™, our directors, officers, employees, affiliates, agents, contractors, suppliers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service.
              </p>
              <p>
                Always supervise young children during play in accordance with the age guidance indicated on each product package.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">9</span>
              Governing Law & Dispute Resolution
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the <strong>State of California, United States</strong>, without regard to its conflict of law principles.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">10</span>
              Contact Information
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 leading-relaxed">
              <p>
                Questions about the Terms of Service should be sent to us at:
              </p>
              <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-ink/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="font-bold text-ink text-base">ToddsIQ™ Legal & Customer Care</p>
                  <p className="text-sm text-ink/70">Naeem Body Oil LLC • Long Beach, California</p>
                  <p className="text-sm font-semibold text-coral mt-1">hello@toddsiq.com</p>
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
