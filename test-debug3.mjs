import fs from 'fs';

const url = 'https://065gcz-yy.myshopify.com/api/2024-07/graphql.json';
const token = '1f6c4ffabff3ef78dfda070c06db1f39';

const query = `
  query {
    product(handle: "toddal-drawing-bot") {
      id title handle description descriptionHtml tags
      options { name values }
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
