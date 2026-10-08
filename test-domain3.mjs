const token = '675b99db3c74a099fc84d340717a25dc';
const query = '{ shop { name primaryDomain { url host } } }';

async function test(domain) {
  try {
    const res = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query: '{ shop { name primaryDomain { url host } } }' })
    });
    console.log(domain, res.status, await res.text());
  } catch(e) {
    console.error(domain, 'error', e.message);
  }
}

test('065gcz-yy.myshopify.com');
