import { createContext, useContext, useState, useEffect } from 'react';
import { createCart, getCart, addCartLines, updateCartLines, removeCartLines } from '../services/shopify/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initializeCart() {
      const storedCartId = localStorage.getItem('shopifyCartId');
      if (storedCartId) {
        try {
          const cart = await getCart(storedCartId);
          if (cart) {
            setCartId(cart.id);
            setCheckoutUrl(cart.checkoutUrl);
            mapShopifyCart(cart);
            return;
          }
        } catch (e) {
          console.error('Failed to load cart', e);
        }
      }
      
      try {
        const cart = await createCart();
        setCartId(cart.id);
        setCheckoutUrl(cart.checkoutUrl);
        localStorage.setItem('shopifyCartId', cart.id);
        setCartItems([]);
      } catch (e) {
        console.error('Failed to create cart', e);
      }
    }
    initializeCart();
  }, []);

  const mapShopifyCart = (cart) => {
    if (!cart || !cart.lines) {
      setCartItems([]);
      return;
    }
    const items = cart.lines.edges.map(({ node }) => ({
      id: node.id,
      variantId: node.merchandise.id,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: parseFloat(node.merchandise.price.amount),
      qty: node.quantity,
      thumbnail: node.merchandise.image?.url || '',
    }));
    setCartItems(items);
  };

  const addItem = async (product, qtyToAdd = 1, variantId = null) => {
    if (!cartId) return;
    setLoading(true);
    try {
      // Use variantId if provided, otherwise fallback to the first variant if available, or just product id if it's already a variant
      const shopifyVariantId = variantId || (product.variants && product.variants[0]?.id) || product.id;
      
      const cart = await addCartLines(cartId, [{ merchandiseId: shopifyVariantId, quantity: qtyToAdd }]);
      mapShopifyCart(cart);
      setIsCartOpen(true);
    } catch (e) {
      console.error('Failed to add item', e);
    }
    setLoading(false);
  };

  const removeItem = async (lineId) => {
    if (!cartId) return;
    setLoading(true);
    try {
      const cart = await removeCartLines(cartId, [lineId]);
      mapShopifyCart(cart);
    } catch (e) {
      console.error('Failed to remove item', e);
    }
    setLoading(false);
  };

  const updateQty = async (lineId, qty) => {
    if (!cartId) return;
    if (qty < 1) return removeItem(lineId);
    setLoading(true);
    try {
      const cart = await updateCartLines(cartId, [{ id: lineId, quantity: qty }]);
      mapShopifyCart(cart);
    } catch (e) {
      console.error('Failed to update qty', e);
    }
    setLoading(false);
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, cartCount, addItem, removeItem, updateQty, clearCart, isCartOpen, setIsCartOpen, checkoutUrl, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
