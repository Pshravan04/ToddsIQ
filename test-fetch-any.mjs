async function test() {
  const url = "https://065gcz-yy.myshopify.com/api/2026-07/graphql.json";
  const token = "675b99db3c74a099fc84d340717a25dc";
  
  const query = `{
    products(first: 1) {
      edges {
        node {
          title
          options {
            name
            values
          }
        }
      }
    }
  }`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  console.dir(data, { depth: null });
}

test();
