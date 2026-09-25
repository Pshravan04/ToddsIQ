import React from 'react';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Simple upsell logic: grab products not in cart
  const cartProductIds = cart.map(c => c.product.id);
  const upsellProducts = productsData.filter(p => !cartProductIds.includes(p.id)).slice(0, 2);

  if (!isCartOpen) return null;

  return (
    <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className="cart-panel" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="btn-icon">
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="text-center mt-8">
              <p className="mb-4 text-muted">Your cart is empty.</p>
              <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.product.id}-${item.variant.id}`} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.product.thumbnail} alt={item.product.name} />
                </div>
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.product.name}</h4>
                  <div className="cart-item-variant">{item.variant.name}</div>
                  <div className="cart-item-actions">
                    <div className="quantity-ctrl">
                      <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <div style={{fontWeight: 800}}>
                      ${(item.variant.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && upsellProducts.length > 0 && (
            <div className="cart-upsell">
              <div className="cart-upsell-title">Keep the play going</div>
              <div className="flex" style={{flexDirection: 'column', gap: '1rem'}}>
                {upsellProducts.map(up => (
                  <Link to={`/product/${up.slug}`} key={up.id} onClick={() => setIsCartOpen(false)} className="upsell-item">
                    <img src={up.thumbnail} alt={up.name} style={{width: 60, height: 60, objectFit: 'contain', background: '#f5f5f5', borderRadius: 8}} />
                    <div style={{flexGrow: 1}}>
                      <div style={{fontWeight: 700, fontSize: '0.9rem'}}>{up.name}</div>
                      <div style={{color: 'var(--color-primary)', fontWeight: 800}}>${up.price}</div>
                    </div>
                    <Plus size={20} color="var(--color-primary)" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{width: '100%'}}>
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
