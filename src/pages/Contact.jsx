import React from 'react';
import { FadeInUp } from '../components/AnimatedSection';

export default function Contact() {
  return (
    <div className="w-full bg-[#F4F1EA] min-h-screen">
      <div className="pt-[120px] pb-space-2xl px-gutter">
        <FadeInUp>
          <div className="max-w-3xl mx-auto space-y-space-md bg-canvas rounded-3xl p-space-xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
            <h1 className="font-headline-xl text-headline-xl text-ink">Contact Us</h1>
            <p className="font-body-lg text-body-lg text-ink-variant">
              We'd love to hear from you! Whether you have a question about our products, an order, or just want to say hi, feel free to reach out.
            </p>
            
            <form className="space-y-4 mt-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-label-md text-ink mb-1">Name</label>
                <input type="text" className="w-full p-3 rounded-xl border-2 border-outline bg-[#F4F1EA]-lowest focus:border-ink focus:outline-none font-body-md" placeholder="Your name" />
              </div>
              <div>
                <label className="block font-label-md text-ink mb-1">Email</label>
                <input type="email" className="w-full p-3 rounded-xl border-2 border-outline bg-[#F4F1EA]-lowest focus:border-ink focus:outline-none font-body-md" placeholder="Your email address" />
              </div>
              <div>
                <label className="block font-label-md text-ink mb-1">Message</label>
                <textarea rows="4" className="w-full p-3 rounded-xl border-2 border-outline bg-[#F4F1EA]-lowest focus:border-ink focus:outline-none font-body-md resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-3 bg-coral hover:bg-coral/90 text-canvas rounded-xl font-label-lg border-2 border-ink shadow-[2px_2px_0px_#1E2A38] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
