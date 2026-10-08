import { useState, useEffect } from 'react';
import { getProducts } from '../services/shopify/products';
import { shopifyFetch } from '../services/shopify/client';
import { useCart } from '../context/CartContext';

export default function Diagnostics() {
  const [status, setStatus] = useState('CONNECTING...');
  const [productsCount, setProductsCount] = useState('-');
  const [collectionsCount, setCollectionsCount] = useState('-');
  const { cartId } = useCart();

  useEffect(() => {
    async function checkApi() {
      try {
        const [products, collectionsData] = await Promise.all([
          getProducts(),
          shopifyFetch({
            query: `{ collections(first: 5) { edges { node { id } } } }`
          })
        ]);
        setProductsCount(products.length);
        setCollectionsCount(collectionsData?.collections?.edges?.length || 0);
        setStatus('CONNECTED');
      } catch (error) {
        console.error('Diagnostics check failed', error);
        setStatus('FAILED');
      }
    }
    checkApi();
  }, []);

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      <div>Shopify API: <span style={{ color: status === 'CONNECTED' ? '#4ade80' : status === 'FAILED' ? '#f87171' : '#facc15' }}>{status}</span></div>
      <div>Products: {productsCount}</div>
      <div>Collections: {collectionsCount}</div>
      <div>Cart: <span style={{ color: cartId ? '#4ade80' : '#facc15' }}>{cartId ? 'READY' : 'FAILED'}</span></div>
    </div>
  );
}
