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
            if (cart.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
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
        if (cart.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
        localStorage.setItem('shopifyCartId', cart.id);
        setCartItems([]);
      } catch (e) {
        console.error('Failed to create cart', e);
      }
    }
    initializeCart();
  }, []);

  const mapShopifyCart = (cart, fallbackItem = null) => {
    if (!cart || !cart.lines) {
      setCartItems([]);
      return;
    }
    const items = cart.lines.edges.map(({ node }) => {
      const priceFromMerch = parseFloat(node.merchandise?.price?.amount);
      const priceFromCost = parseFloat(node.cost?.amountPerQuantity?.amount);
      const safePrice = !isNaN(priceFromMerch) && priceFromMerch > 0
        ? priceFromMerch
        : (!isNaN(priceFromCost) && priceFromCost > 0
            ? priceFromCost
            : (fallbackItem?.price || 0));

      // In Shopify Storefront API, node.quantity may be returned as 0 if an unfulfilled location warning occurs.
      // But if an item is present in the cart, its visible quantity must be at least 1.
      const currentItem = cartItems.find(ci => ci.id === node.id || ci.variantId === node.merchandise?.id);
      const safeQty = node.quantity > 0
        ? node.quantity
        : (currentItem?.qty || fallbackItem?.qty || 1);

      return {
        id: node.id,
        variantId: node.merchandise?.id || fallbackItem?.variantId,
        title: node.merchandise?.product?.title || fallbackItem?.title || 'Product',
        variantTitle: node.merchandise?.title || '',
        price: safePrice,
        qty: safeQty,
        thumbnail: node.merchandise?.image?.url || fallbackItem?.thumbnail || '',
      };
    });
    setCartItems(items);
  };

  const addItem = async (product, qtyToAdd = 1, variantId = null) => {
    setLoading(true);
    const validQty = Math.max(parseInt(qtyToAdd) || 1, 1);
    const shopifyVariantId = variantId || (product.variants && product.variants[0]?.id) || product.shopifyId || product.id;
    const itemPrice = typeof product.price === 'number' 
      ? product.price 
      : (parseFloat(product.price) || 0);

    const fallbackItem = {
      variantId: shopifyVariantId,
      title: product.title || product.name || 'Product',
      price: itemPrice,
      qty: validQty,
      thumbnail: product.thumbnail || product.image || (product.images && product.images[0]) || ''
    };

    if (cartId) {
      try {
        const cart = await addCartLines(cartId, [{ merchandiseId: shopifyVariantId, quantity: validQty }]);
        if (cart) {
          if (cart.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
          mapShopifyCart(cart, fallbackItem);
          setIsCartOpen(true);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to add item to Shopify cart:', e);
      }
    }

    // Local state fallback if Shopify cart API is unreachable or returns an error
    setCartItems(prev => {
      const existing = prev.find(item => item.variantId === shopifyVariantId);
      if (existing) {
        return prev.map(item => item.variantId === shopifyVariantId ? { ...item, qty: item.qty + validQty } : item);
      }
      return [...prev, {
        id: `local-${Date.now()}`,
        variantId: shopifyVariantId,
        title: fallbackItem.title,
        variantTitle: product.variantTitle || '',
        price: fallbackItem.price,
        qty: validQty,
        thumbnail: fallbackItem.thumbnail
      }];
    });
    setIsCartOpen(true);
    setLoading(false);
  };

  const removeItem = async (lineId) => {
    setLoading(true);
    setCartItems(prev => prev.filter(item => item.id !== lineId));

    if (cartId && !String(lineId).startsWith('local-')) {
      try {
        const cart = await removeCartLines(cartId, [lineId]);
        if (cart) {
          if (cart.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
          mapShopifyCart(cart);
        }
      } catch (e) {
        console.error('Failed to remove item from Shopify cart:', e);
      }
    }
    setLoading(false);
  };

  const updateQty = async (lineId, qty) => {
    const validQty = Math.max(parseInt(qty) || 0, 0);
    if (validQty < 1) return removeItem(lineId);
    setLoading(true);

    // Optimistically update quantity in local cart so pricing & stepper update immediately
    setCartItems(prev => prev.map(item => item.id === lineId ? { ...item, qty: validQty } : item));

    if (cartId && !String(lineId).startsWith('local-')) {
      try {
        const cart = await updateCartLines(cartId, [{ id: lineId, quantity: validQty }]);
        if (cart) {
          if (cart.checkoutUrl) setCheckoutUrl(cart.checkoutUrl);
          const items = cart.lines.edges.map(({ node }) => {
            const price = parseFloat(node.merchandise?.price?.amount) || parseFloat(node.cost?.amountPerQuantity?.amount) || 0;
            return {
              id: node.id,
              variantId: node.merchandise?.id,
              title: node.merchandise?.product?.title || '',
              variantTitle: node.merchandise?.title || '',
              price: price,
              qty: node.quantity > 0 ? node.quantity : validQty,
              thumbnail: node.merchandise?.image?.url || '',
            };
          });
          setCartItems(items);
        }
      } catch (e) {
        console.error('Failed to update qty in Shopify cart:', e);
      }
    }
    setLoading(false);
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 1), 0);
  const cartCount = cartItems.reduce((sum, i) => sum + (Number(i.qty) || 1), 0);

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, cartCount, addItem, removeItem, updateQty, clearCart, isCartOpen, setIsCartOpen, checkoutUrl, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

