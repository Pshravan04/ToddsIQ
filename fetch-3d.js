const fs = require('fs');
fetch('https://065gcz-yy.myshopify.com/api/2024-04/graphql.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': '675b99db3c74a099fc84d340717a25dc' },
  body: JSON.stringify({ query: `query { product(handle: "3dmagictracktrainset") { variants(first: 250) { edges { node { title selectedOptions { name value } price { amount currencyCode } } } } } }` })
}).then(r => r.json()).then(d => fs.writeFileSync('3d-variants.json', JSON.stringify(d, null, 2)));
