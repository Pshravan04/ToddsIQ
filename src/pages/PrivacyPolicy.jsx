import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function PrivacyPolicy() {
  const lastUpdated = 'October 27, 2026';

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-5xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              TRUST & TRANSPARENCY
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Privacy <span className="text-[#f58f29]">Policy.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-2xl leading-relaxed">
              At ToddsIQ™, we value the trust you place in us when shopping for developmental, screen-free toys for your family. This Privacy Policy details how we collect, use, and protect your information.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-ink/60 bg-white px-3 py-1.5 rounded-full border border-ink/20 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-coral">update</span>
              Last Updated: {lastUpdated}
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 2. KEY PROMISES BADGES */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 border-b-2 border-ink bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral/20 border border-ink flex items-center justify-center text-coral flex-shrink-0">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">100% Secure</strong>
                <span className="text-xs text-ink/70">Encrypted checkout via Shopify</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed border border-ink flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">block</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">We Never Sell Data</strong>
                <span className="text-xs text-ink/70">Your family's privacy stays private</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed border border-ink flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined">family_restroom</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">COPPA Protected</strong>
                <span className="text-xs text-ink/70">Toys for kids, accounts for adults</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F1EA] border-2 border-ink shadow-[2px_2px_0px_#1E2A38] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed border border-ink flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-ink">Easy Opt-Out</strong>
                <span className="text-xs text-ink/70">Unsubscribe with one click anytime</span>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>

      {/* 3. POLICY DETAILS */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Section 1 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">1</span>
              Who We Are & Company Information
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                <strong>ToddsIQ™</strong> (referred to as “we,” “us,” or “our”) is a specialized educational and developmental toy brand owned and operated by <strong>Naeem Body Oil LLC</strong>, a registered U.S. company organized under the laws of the State of California.
              </p>
              <p>
                Our store is hosted on Shopify Inc. (“Shopify”), which provides us with the secure online e-commerce platform that allows us to sell our products to you.
              </p>
              <div className="p-4 rounded-xl bg-[#F4F1EA] border border-ink/20 mt-3 text-sm">
                <p><strong>Brand:</strong> ToddsIQ™</p>
                <p><strong>Operating Entity:</strong> Naeem Body Oil LLC</p>
                <p><strong>Registered Address:</strong> 3328 E Anaheim St, Long Beach, CA 90804, United States</p>
                <p><strong>Official Inquiries & Support:</strong> <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a></p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">2</span>
              Information We Collect
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 leading-relaxed">
              <p>When you browse, interact with, or make a purchase from ToddsIQ™, we collect the following categories of information:</p>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F4F1EA]/60 border border-ink/10">
                  <h3 className="font-bold text-ink mb-1">A. Order & Transaction Information</h3>
                  <p className="text-sm">
                    When you purchase a product, we collect your name, billing address, shipping address, email address, phone number, and purchase details. <em>Payment details (such as credit card numbers) are encrypted and processed directly by Shopify Payments or certified payment processors (e.g., Apple Pay, Google Pay, PayPal). We never store your full payment card details on our local servers.</em>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F1EA]/60 border border-ink/10">
                  <h3 className="font-bold text-ink mb-1">B. Device & Usage Information</h3>
                  <p className="text-sm">
                    As you browse the site, Shopify and analytics tools automatically collect device data such as IP address, browser type, operating system, time zone, referring/exit pages, and interactions with our product catalog.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F1EA]/60 border border-ink/10">
                  <h3 className="font-bold text-ink mb-1">C. Customer Support & Communication Data</h3>
                  <p className="text-sm">
                    If you contact us through our website contact form or email us at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a>, we collect your message content, order references, and email history to assist you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">3</span>
              How We Use Your Information
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>We use the information we collect for strictly business and customer fulfillment purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Order Fulfillment:</strong> Processing payments, preparing shipping labels, arranging dispatch, and issuing invoices and order confirmation receipts.</li>
                <li><strong>Shipping & Tracking Updates:</strong> Sending real-time SMS or email tracking updates so you know when your child's toys will arrive.</li>
                <li><strong>Customer Support:</strong> Assisting you with returns, 30-Day Living Room Guarantee requests, order edits, or developmental toy questions.</li>
                <li><strong>Fraud Detection & Risk Prevention:</strong> Screening orders for fraud or unauthorized transactions to safeguard both customers and our store.</li>
                <li><strong>Service Improvements:</strong> Understanding how families navigate our store to optimize loading speeds, product descriptions, and user experience.</li>
                <li><strong>Marketing (Only with Your Consent):</strong> If you opt in to our newsletter, sending you special promotions, developmental milestones play guides, or new release announcements. You can unsubscribe at any time.</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">4</span>
              Sharing Your Information with Trusted Third Parties
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                We do not sell, rent, or trade your personal information to data brokers or advertisers. We share information only with trusted third-party service providers who assist us in operating our store:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Shopify:</strong> Powers our e-commerce platform and processes checkouts under strict PCI-DSS compliance. You can read Shopify's Privacy Policy at <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer" className="text-coral underline">shopify.com/legal/privacy</a>.</li>
                <li><strong>Shipping Carriers:</strong> Trusted couriers such as USPS, UPS, FedEx, and DHL receive your name, delivery address, and phone number solely for delivery fulfillment.</li>
                <li><strong>Payment Processors:</strong> Gateways handle card transactions through tokenized, encrypted pathways.</li>
                <li><strong>Legal Compliance:</strong> We may disclose information if required to comply with applicable laws, respond to lawful subpoenas, or protect our legal rights.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">5</span>
              Cookies & Tracking Technologies
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                A cookie is a small data file stored on your browser. We use essential cookies to keep items in your shopping bag, save your chosen currency, and ensure smooth checkout.
              </p>
              <p>
                We also use non-essential performance cookies to analyze web traffic. You may choose to disable cookies in your browser settings at any time, although doing so may impair certain features of the shopping cart.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">6</span>
              Your Privacy Rights (California & International)
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                Depending on your location, you have statutory rights concerning your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>California Residents (CCPA / CPRA):</strong> You have the right to know what personal data we collect, request deletion of your information, and opt out of any data sharing. We do not sell your personal data.</li>
                <li><strong>European Economic Area (GDPR) / UK:</strong> You have the right to access, correct, port, or request erasure of your personal data, and withdraw consent at any time.</li>
                <li><strong>Exercising Your Rights:</strong> To submit a data access or deletion request, simply email us at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a> with the subject line <em>"Privacy Rights Request"</em>. We will verify and process your request within 30 days without discrimination.</li>
              </ul>
            </div>
          </div>

          {/* Section 7 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">7</span>
              Children's Privacy Protection (COPPA)
            </h2>
            <div className="font-body-md text-ink-variant space-y-3 leading-relaxed">
              <p>
                ToddsIQ™ creates educational toys for babies, toddlers, and young children. However, <strong>our website and purchasing channels are intended exclusively for parents, guardians, and adults aged 18 and older.</strong>
              </p>
              <p>
                We do not knowingly solicit or collect personal information directly from children under 13. If you believe a child has provided us with personal information without parental consent, please contact us at <a href="mailto:hello@toddsiq.com" className="text-coral underline font-bold">hello@toddsiq.com</a>, and we will promptly delete that information from our records.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h2 className="font-display text-2xl font-bold text-ink mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-coral text-white text-sm flex items-center justify-center font-bold">8</span>
              Contact Us Regarding Your Privacy
            </h2>
            <div className="font-body-md text-ink-variant space-y-4 leading-relaxed">
              <p>
                If you have questions, feedback, or concerns regarding our privacy practices, please contact our team:
              </p>
              <div className="p-4 rounded-2xl bg-[#FFF8E7] border-2 border-ink/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="font-bold text-ink text-base">ToddsIQ™ Customer Support & Privacy Team</p>
                  <p className="text-sm text-ink/70">Naeem Body Oil LLC • Long Beach, California</p>
                  <p className="text-sm font-semibold text-coral mt-1">hello@toddsiq.com</p>
                </div>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm whitespace-nowrap"
                >
                  Contact Form →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
