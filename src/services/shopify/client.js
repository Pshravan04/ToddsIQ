import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION || '2026-07';

// Ensure we have a valid domain format for the client
// The client expects something like 'https://toddsiq.myshopify.com'
const storeDomain = domain ? (domain.startsWith('http') ? domain : `https://${domain}`) : '';

let client = null;

if (storeDomain && storefrontAccessToken) {
  client = createStorefrontApiClient({
    storeDomain,
    apiVersion,
    publicAccessToken: storefrontAccessToken,
  });
}

export async function shopifyFetch({ query, variables }) {
  if (!client) {
    throw new Error('Shopify credentials are not set.');
  }

  try {
    const response = await client.request(query, { variables });
    
    if (response.errors && response.errors.length > 0) {
      const messages = response.errors.map(err => err.message).join(', ');
      throw new Error(`GraphQL Errors: ${messages}`);
    }
    
    if (!response.data) {
      throw new Error('Shopify API returned no data.');
    }

    return response.data;
  } catch (error) {
    console.error('Shopify API error:', error);
    throw error;
  }
}
