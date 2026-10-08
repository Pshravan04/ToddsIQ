import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ open, onClose }) {
  const { cartItems, cartTotal, updateQty, removeItem, setIsCartOpen, checkoutUrl, loading } = useCart();
  const { formatPrice } = useCurrency();
  const FREE_SHIPPING = 50;
  const progress = Math.min((cartTotal / FREE_SHIPPING) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING - cartTotal, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[2000]"
          />
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[95vw] max-w-[420px] bg-canvas z-[2001] shadow-2xl flex flex-col border-l-2 border-ink"
            role="dialog" 
            aria-modal="true" 
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-6 border-b-2 border-ink bg-canvas z-10">
              <span className="font-display text-2xl font-bold text-ink">Your Bag 🛍️</span>
              <button className="w-10 h-10 rounded-full hover:bg-[#EAE5D9] flex items-center justify-center transition-colors" onClick={onClose} aria-label="Close cart">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="p-4 bg-teal/10 border-b-2 border-teal flex flex-col gap-2">
              <p className="text-sm font-bold text-teal text-center">
                {remaining > 0
                  ? `Add ${formatPrice(remaining)} more for FREE shipping! 🚚`
                  : '🎉 You unlocked free shipping!'}
              </p>
              <div className="h-2 bg-teal/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-teal rounded-full" 
                />
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto p-6 flex flex-col gap-6 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-ink/60 gap-4 mt-12">
                  <span className="material-symbols-outlined text-6xl opacity-50">shopping_bag</span>
                  <p className="font-display text-xl font-bold">Your bag is empty</p>
                  <p className="text-sm">Add some toys to get started!</p>
                  <button onClick={onClose} className="mt-4 px-6 py-3 rounded-full bg-[#EAE5D9] text-ink font-bold hover:bg-[#D5D0C4] transition-colors border-2 border-ink shadow-[2px_2px_0px_#1E2A38]">
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item.id} 
                    className="flex gap-4 p-4 bg-white rounded-3xl border-2 border-ink shadow-[3px_3px_0px_#1E2A38]"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-[#F4F1EA] overflow-hidden border-2 border-ink flex-shrink-0">
                      <img className="w-full h-full object-cover" src={item.thumbnail || item.image} alt={item.title || item.name} />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-bold text-ink text-sm leading-tight">{item.title || item.name}</p>
                        <button onClick={() => removeItem(item.id)} className="text-ink/50 hover:text-coral transition-colors" aria-label="Remove">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                      </div>
                      {item.variantTitle && item.variantTitle !== 'Default Title' && <p className="text-xs text-ink/60 mt-1">{item.variantTitle}</p>}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-[#F4F1EA] border-2 border-ink rounded-full px-2 py-1">
                          <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-ink transition-colors font-bold" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                          <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                          <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white text-ink transition-colors font-bold" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                        </div>
                        <div className="font-display font-bold text-lg text-ink">
                          {formatPrice(item.price * item.qty)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t-2 border-ink bg-canvas">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-ink text-lg">Subtotal</span>
                <span className="font-display font-bold text-2xl text-ink">{formatPrice(cartTotal)}</span>
              </div>
              <p className="text-xs text-ink/60 text-center mb-4">Taxes and shipping calculated at checkout</p>
              
              <div className="flex flex-col gap-3">
                {cartItems.length > 0 && checkoutUrl ? (
                  <a 
                    href={checkoutUrl}
                    className={`w-full py-4 bg-coral text-canvas rounded-2xl font-display font-bold text-lg border-2 border-ink shadow-[4px_4px_0px_#1E2A38] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#1E2A38] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {loading ? 'Updating...' : 'Checkout'} <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </a>
                ) : (
                  <button 
                    disabled 
                    className="w-full py-4 bg-ink/10 text-ink/40 rounded-2xl font-display font-bold text-lg border-2 border-ink/20 flex items-center justify-center"
                  >
                    Checkout
                  </button>
                )}
                
                <button 
                  className="w-full py-4 bg-transparent text-ink rounded-2xl font-display font-bold border-2 border-transparent hover:border-ink transition-all" 
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}