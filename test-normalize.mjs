import { getProductByHandle } from './src/services/shopify/products.js';
(async () => {
  const prod = await getProductByHandle('toddal-drawing-bot');
  console.dir(prod, { depth: null });
})();
