import 'dotenv/config';

const SHOPIFY_DOMAIN = process.env.VITE_SHOPIFY_DOMAIN || process.env.SHOPIFY_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function queryProduct(handle) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        options {
          name
          values
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              availableForSale
              image { url }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  });

  const data = await response.json();
  console.log(`\n--- Product: ${handle} ---`);
  if (!data.data?.product) {
    console.log("Not found.");
    return;
  }
  
  const product = data.data.product;
  console.log("Title:", product.title);
  console.log("Options:", JSON.stringify(product.options, null, 2));
  console.log("Variants count:", product.variants.edges.length);
  product.variants.edges.forEach(({ node: v }, i) => {
    console.log(` Variant ${i+1}: ${v.title} (${v.price.amount} ${v.price.currencyCode}) [Compare: ${v.compareAtPrice ? v.compareAtPrice.amount : 'None'}] - Available: ${v.availableForSale}`);
    console.log(`   Options: ${JSON.stringify(v.selectedOptions)}`);
  });
}

async function main() {
  await queryProduct("drawing-robot");
  await queryProduct("3d-stem-magic-track");
}

main().catch(console.error);
