import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), '');
const domain = env.VITE_SHOPIFY_STORE_DOMAIN;
const token = env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

console.log('Using Domain:', domain);
console.log('Using Token Length:', token ? token.length : 0);

async function shopifyFetch({ query, variables }) {
  if (!domain || !token) throw new Error('Shopify credentials are not set.');
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}\nBody: ${text}`);
  }
  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

async function run() {
  console.log('1. Fetching Products...');
  const productsData = await shopifyFetch({
    query: `
      query getProducts {
        products(first: 5) {
          edges { node { id handle title } }
        }
      }
    `
  });
  console.log('Products fetched:', productsData.products.edges.length);

  console.log('2. Fetching Collections...');
  const collectionsData = await shopifyFetch({
    query: `
      query getCollections {
        collections(first: 5) {
          edges { node { id handle title } }
        }
      }
    `
  });
  console.log('Collections fetched:', collectionsData.collections.edges.length);

  console.log('3. Creating Cart...');
  const cartData = await shopifyFetch({
    query: `
      mutation createCart {
        cartCreate {
          cart { id checkoutUrl }
        }
      }
    `
  });
  console.log('Cart created with ID:', cartData.cartCreate.cart.id);
  console.log('VERIFICATION COMPLETE');
}

run().catch(console.error);
