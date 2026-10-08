import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Ensure we have a valid domain format for the client
// The client expects something like 'https://toddsiq.myshopify.com'
const storeDomain = domain ? (domain.startsWith('http') ? domain : `https://${domain}`) : '';

let client = null;

if (storeDomain && storefrontAccessToken) {
  client = createStorefrontApiClient({
    storeDomain,
    apiVersion: '2024-04',
    publicAccessToken: storefrontAccessToken,
  });
}

export async function shopifyFetch({ query, variables }) {
  if (!client) {
    throw new Error('Shopify credentials are not set.');
  }

  try {
    const response = await client.request(query, { variables });
    return response.data;
  } catch (error) {
    console.error('Shopify API error:', error);
    throw error;
  }
}
