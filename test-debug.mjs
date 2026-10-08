import fs from 'fs';

const url = 'https://065gcz-yy.myshopify.com/api/2024-07/graphql.json';
const token = '1f6c4ffabff3ef78dfda070c06db1f39';

const query = `
  query {
    product(handle: "toddal-drawing-bot") {
      id title handle description descriptionHtml tags
      options { name values }
      variants(first: 100) {
        edges {
          node {
            id title sku availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url }
          }
        }
      }
    }
  }
`;

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  },
  body: JSON.stringify({ query }),
})
.then(r => r.json())
.then(data => {
  const p = data.data.product;
  console.log('product properties types:');
  for (const key of Object.keys(p)) {
    console.log(key, typeof p[key], Array.isArray(p[key]) ? 'array' : '');
  }
  console.log('Tags:', p.tags);
  console.log('Options:', JSON.stringify(p.options, null, 2));
})
.catch(console.error);
