import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeInUp } from '../components/AnimatedSection';

export default function TrackOrder() {
  const [trackMethod, setTrackMethod] = useState('order'); // 'order' or 'number'
  const [orderNumber, setOrderNumber] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackMethod === 'number' && trackingCode.trim()) {
      // Direct carrier track
      const cleanCode = trackingCode.trim();
      const carrierUrl = `https://t.17track.net/en#nums=${encodeURIComponent(cleanCode)}`;
      window.open(carrierUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!orderNumber.trim() || !emailOrPhone.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas">
      {/* 1. HERO SECTION */}
      <FadeInUp>
        <section className="w-full px-gutter py-8 lg:py-16 bg-[#F4F1EA]-low border-b-2 border-ink">
          <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center items-center">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-coral font-bold bg-coral/10 px-3 py-1 rounded-full border border-coral/30">
              REAL-TIME SHIPMENT STATUS
            </span>
            <h1 className="font-display-hero text-4xl md:text-5xl lg:text-6xl text-ink font-black tracking-tight leading-tight">
              Track Your <span className="text-[#f58f29]">Order.</span>
            </h1>
            <p className="font-body-lg text-sm md:text-base text-ink/80 max-w-xl leading-relaxed">
              We package every toy with care and dispatch swiftly within 24–48 hours. Enter your details below to check your order progress.
            </p>
          </div>
        </section>
      </FadeInUp>

      {/* 2. TRACKING LOOKUP FORM */}
      <section className="w-full px-gutter py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            {/* Toggle Switch */}
            <div className="flex bg-[#F4F1EA] p-1.5 rounded-2xl border-2 border-ink mb-6">
              <button
                type="button"
                onClick={() => {
                  setTrackMethod('order');
                  setHasSearched(false);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  trackMethod === 'order'
                    ? 'bg-white text-ink border border-ink shadow-[2px_2px_0px_#1E2A38]'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Order # & Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setTrackMethod('number');
                  setHasSearched(false);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  trackMethod === 'number'
                    ? 'bg-white text-ink border border-ink shadow-[2px_2px_0px_#1E2A38]'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                Tracking Number
              </button>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              {trackMethod === 'order' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. #1024 or 1024"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-ink/20 focus:border-coral focus:outline-none text-ink text-sm font-medium transition-colors bg-[#F4F1EA]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Email or Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Used during checkout"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border-2 border-ink/20 focus:border-coral focus:outline-none text-ink text-sm font-medium transition-colors bg-[#F4F1EA]/30"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    Carrier Tracking Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9400111899562537891234 (USPS / UPS / FedEx / DHL)"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border-2 border-ink/20 focus:border-coral focus:outline-none text-ink text-sm font-medium transition-colors bg-[#F4F1EA]/30"
                  />
                  <p className="text-xs text-ink/60 mt-1">
                    Entering your tracking code opens real-time live GPS checkpoints via our multi-carrier tracking partner.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSearching}
                className="w-full h-12 mt-2 bg-coral text-white font-bold rounded-xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Looking up shipment...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">search</span>
                    {trackMethod === 'order' ? 'Track My Order' : 'Track via Carrier'}
                  </>
                )}
              </button>
            </form>

            {/* Tracking Result Mock / Status Preview */}
            {hasSearched && (
              <div className="mt-8 pt-6 border-t-2 border-ink/10 space-y-4">
                <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-ink/20 flex items-start gap-3">
                  <span className="material-symbols-outlined text-coral text-2xl mt-0.5">mark_email_read</span>
                  <div>
                    <h4 className="font-bold text-ink text-sm">Order Status Lookup Active</h4>
                    <p className="text-xs text-ink/70 mt-1">
                      If your order #{orderNumber.replace('#', '')} was placed within the last 24–48 hours, our warehouse team is actively preparing your package. A live tracking link was emailed to <strong>{emailOrPhone}</strong>.
                    </p>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="py-4">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-ink/50 mb-4">Typical Shipment Progression</h5>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#1F9D8A] text-white flex items-center justify-center border border-ink text-xs font-bold">✓</div>
                      <span className="text-[11px] font-bold text-ink">Order Confirmed</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center border border-ink text-xs font-bold">2</div>
                      <span className="text-[11px] font-bold text-ink">Packaging</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#F4F1EA] text-ink/40 flex items-center justify-center border border-ink text-xs font-bold">3</div>
                      <span className="text-[11px] font-medium text-ink/60">In Transit</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#F4F1EA] text-ink/40 flex items-center justify-center border border-ink text-xs font-bold">4</div>
                      <span className="text-[11px] font-medium text-ink/60">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Helpful Tracking FAQs */}
          <div className="mt-10 space-y-4">
            <h3 className="font-display text-xl font-bold text-ink">Tracking FAQs</h3>
            
            <div className="p-4 rounded-2xl bg-white border-2 border-ink shadow-[2px_2px_0px_#1E2A38]">
              <strong className="block text-sm font-bold text-ink mb-1">When will my tracking number become active?</strong>
              <p className="text-xs text-ink/70 leading-relaxed">
                Carriers (USPS, UPS, FedEx) typically require 24 to 48 hours to scan physical packages into their regional sorting facilities once a shipping label has been generated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-ink shadow-[2px_2px_0px_#1E2A38]">
              <strong className="block text-sm font-bold text-ink mb-1">Didn't receive a confirmation email?</strong>
              <p className="text-xs text-ink/70 leading-relaxed">
                Please check your Spam or Promotions folder for an email from <strong>hello@toddsiq.com</strong>. If you still cannot locate it, please contact our support team and we will resend your order summary immediately.
              </p>
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="mt-8 p-6 rounded-3xl bg-[#FFF8E7] border-2 border-ink shadow-[3px_3px_0px_#1E2A38] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-ink text-sm">Need personalized assistance?</h4>
              <p className="text-xs text-ink/70 mt-0.5">Our support team is standing by to help you track down your parcel.</p>
              <a href="mailto:hello@toddsiq.com" className="text-xs font-bold text-coral underline block mt-1">hello@toddsiq.com</a>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-coral text-white font-bold rounded-xl border border-ink text-xs shadow-[2px_2px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
            >
              Contact Support →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
