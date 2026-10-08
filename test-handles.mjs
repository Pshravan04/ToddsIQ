import fs from 'fs';

const url = 'https://065gcz-yy.myshopify.com/api/2026-07/graphql.json';
const token = '1f6c4ffabff3ef78dfda070c06db1f39';

const query = `
  query {
    products(first: 10) {
      edges {
        node {
          id title handle description tags
          options { name values }
          variants(first: 10) {
            edges { node { id title price { amount currencyCode } compareAtPrice { amount currencyCode } selectedOptions { name value } } }
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
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(console.error);
