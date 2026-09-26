import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { cartItems, cartTotal, updateQty, removeItem } = useCart();
  const FREE_SHIPPING = 50;
  const progress = Math.min((cartTotal / FREE_SHIPPING) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING - cartTotal, 0);

  return (
    <>
      <div className={`cart-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-header">
          <span className="cart-title">Your Bag 🛍️</span>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="shipping-progress">
          <p className="shipping-label">
            {remaining > 0
              ? `Add $${remaining.toFixed(2)} more for FREE shipping! 🚚`
              : '🎉 You unlocked free shipping!'}
          </p>
          <div className="shipping-track">
            <div className="shipping-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{color:'var(--text-muted)',marginTop:'1rem',fontSize:'.9375rem'}}>Your bag is empty</p>
              <p style={{fontSize:'.85rem',color:'var(--text-muted)',opacity:.7,marginTop:'.25rem'}}>Add some toys to get started!</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.image} alt={item.name} />
                <div>
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-variant">{item.variant || ''}</p>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span style={{fontSize:'.875rem',fontWeight:600}}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    <button onClick={() => removeItem(item.id)} style={{marginLeft:'auto',color:'var(--text-muted)',fontSize:'.75rem',background:'none',border:'none',cursor:'pointer'}}>Remove</button>
                  </div>
                </div>
                <div className="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-total-row">
            <span className="cart-total-label">Subtotal</span>
            <span className="cart-total-value">$${cartTotal.toFixed(2)}</span>
          </div>
          <p style={{fontSize:'.8rem',color:'var(--text-muted)',textAlign:'center'}}>Taxes and shipping calculated at checkout</p>
          <button className="btn btn-primary btn-lg" style={{justifyContent:'center'}} disabled={cartItems.length === 0}>
            Checkout →
          </button>
          <button className="btn btn-outline" style={{justifyContent:'center'}} onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}