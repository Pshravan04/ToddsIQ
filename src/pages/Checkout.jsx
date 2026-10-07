import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const TAX_RATE = 0.08;
  const SHIPPING = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * TAX_RATE;
  const total = cartTotal + tax + SHIPPING;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Fake processing delay
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      alert('Order Placed Successfully! 🎉');
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-canvas px-4">
        <span className="material-symbols-outlined text-6xl text-ink/20 mb-6">shopping_bag</span>
        <h1 className="font-display text-4xl font-extrabold text-ink mb-4">Your bag is empty</h1>
        <p className="text-ink/70 mb-8">Let's find some amazing toys for your little one.</p>
        <Link to="/collections/all" className="px-8 py-4 bg-coral text-canvas rounded-2xl font-bold border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-ink/70 hover:text-ink font-bold transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Shopping
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink mt-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              
              {/* Contact Info */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-canvas p-6 sm:p-8 rounded-[32px] border-2 border-ink shadow-[4px_4px_0px_#1E2A38]"
              >
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-teal/20 text-teal flex items-center justify-center text-sm border-2 border-teal">1</span>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">Email Address</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink focus:ring-0 bg-white transition-colors outline-none" placeholder="you@example.com" />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="newsletter" className="w-5 h-5 rounded border-2 border-ink/20 text-coral focus:ring-coral" defaultChecked />
                    <label htmlFor="newsletter" className="text-sm text-ink/70 cursor-pointer">Keep me updated on news and exclusive offers</label>
                  </div>
                </div>
              </motion.section>

              {/* Shipping Info */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-canvas p-6 sm:p-8 rounded-[32px] border-2 border-ink shadow-[4px_4px_0px_#1E2A38]"
              >
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-marigold/20 text-marigold flex items-center justify-center text-sm border-2 border-marigold">2</span>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="First" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="Last" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-ink mb-2">Address</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="123 Playful Lane" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-ink mb-2">Apartment, suite, etc. (optional)</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="Apt 4B" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">City</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="City" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">State</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">ZIP</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="12345" />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Payment Info */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-canvas p-6 sm:p-8 rounded-[32px] border-2 border-ink shadow-[4px_4px_0px_#1E2A38]"
              >
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-periwinkle/20 text-periwinkle flex items-center justify-center text-sm border-2 border-periwinkle">3</span>
                  Payment Method
                </h2>
                <div className="bg-white rounded-2xl border-2 border-ink/20 p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" id="cc" className="w-5 h-5 text-coral focus:ring-coral" defaultChecked />
                    <label htmlFor="cc" className="font-bold text-ink cursor-pointer">Credit Card</label>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-8 h-5 bg-[#EAE5D9] rounded border border-ink/10 flex items-center justify-center text-[10px] font-bold">VISA</span>
                    <span className="w-8 h-5 bg-[#EAE5D9] rounded border border-ink/10 flex items-center justify-center text-[10px] font-bold">MC</span>
                  </div>
                </div>
                
                <div className="space-y-4 p-4">
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">Card Number</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white font-mono" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">Expiration (MM/YY)</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white font-mono" placeholder="MM / YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-ink mb-2">Security Code</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white font-mono" placeholder="CVC" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">Name on Card</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border-2 border-ink/20 focus:border-ink outline-none bg-white" placeholder="Full Name" />
                  </div>
                </div>
              </motion.section>

            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 bg-canvas p-6 sm:p-8 rounded-[32px] border-2 border-ink shadow-[4px_4px_0px_#1E2A38]">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl border-2 border-ink/10 overflow-hidden bg-white relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-ink text-canvas text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-canvas">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-ink leading-tight line-clamp-2">{item.name}</p>
                      {item.variant && <p className="text-xs text-ink/60">{item.variant}</p>}
                    </div>
                    <div className="font-bold text-ink">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-ink/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70 font-semibold">Subtotal</span>
                  <span className="font-bold text-ink">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70 font-semibold">Shipping</span>
                  <span className="font-bold text-ink">{SHIPPING === 0 ? 'FREE' : formatPrice(SHIPPING)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/70 font-semibold">Estimated Taxes</span>
                  <span className="font-bold text-ink">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t-2 border-ink pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-ink">Total</span>
                  <div className="text-right">
                    <span className="text-xs text-ink/50 block">{currency}</span>
                    <span className="font-display text-3xl font-extrabold text-ink">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 bg-coral text-canvas rounded-2xl font-display font-bold text-xl border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:bg-[#e65548] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-canvas/30 border-t-canvas rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">lock</span>
                    Place Order
                  </>
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink/50 font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                Secure 256-bit SSL Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
