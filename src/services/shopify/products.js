import { shopifyFetch } from './client';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from './queries';
import localProducts from '../../data/products.json'; // Fallback for extra UI properties not yet in Shopify

export function normalizeProduct(shopifyProduct) {
  if (!shopifyProduct) return null;

  // Try to find matching local product by title or hardcoded mapping to merge extra UI data
  // like badges, icons, subtitles, etc., until they are moved to Shopify Metafields
  const localProduct = localProducts.find(p => p.title === shopifyProduct.title) || {};

  // Safely extract variants
  const variantsArray = shopifyProduct.variants?.edges 
    ? shopifyProduct.variants.edges.map(e => e.node)
    : (shopifyProduct.variants?.nodes || []);

  const variants = variantsArray.map(v => ({
    id: v.id,
    title: v.title,
    price: v.price ? parseFloat(v.price.amount) : 0,
    compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : null,
    availableForSale: !!v.availableForSale,
    sku: v.sku || '',
    selectedOptions: v.selectedOptions || [],
    image: v.image?.url || null
  }));

  // Map options back to existing UI format
  const options = (shopifyProduct.options || []).map(opt => {
    const localOpt = localProduct.options?.find(lo => lo.name === opt.name);
    if (localOpt) {
      return {
        ...opt,
        subtitles: localOpt.subtitles,
        badges: localOpt.badges,
        icons: localOpt.icons,
        prices: (opt.values || []).map(val => {
          const matchingVariant = variants.find(v => v.selectedOptions.find(so => so.name === opt.name && so.value === val));
          return matchingVariant ? matchingVariant.price : null;
        }),
        compareAtPrices: (opt.values || []).map(val => {
          const matchingVariant = variants.find(v => v.selectedOptions.find(so => so.name === opt.name && so.value === val));
          return matchingVariant ? matchingVariant.compareAtPrice : null;
        })
      };
    }
    return { name: opt.name, values: opt.values || [] };
  });

  const price = shopifyProduct.priceRange?.minVariantPrice?.amount 
    ? parseFloat(shopifyProduct.priceRange.minVariantPrice.amount) 
    : 0;
    
  const compareAtPrice = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : null;

  // Safely extract images
  const imagesArray = shopifyProduct.images?.edges
    ? shopifyProduct.images.edges.map(e => e.node)
    : (shopifyProduct.images?.nodes || []);
    
  const imageUrls = imagesArray.map(img => img.url).filter(Boolean);

  return {
    // Keep local ID mapping temporarily or use handle so routing works seamlessly
    id: localProduct.id || shopifyProduct.handle, 
    handle: shopifyProduct.handle,
    shopifyId: shopifyProduct.id,
    title: shopifyProduct.title || 'Unknown Product',
    description: shopifyProduct.description || (shopifyProduct.descriptionHtml ? shopifyProduct.descriptionHtml.replace(/<[^>]+>/g, '') : ''),
    descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description || '',
    price: price,
    compareAtPrice: compareAtPrice,
    thumbnail: imageUrls[0] || localProduct.thumbnail || '',
    images: imageUrls,
    options: options,
    variants: variants,
    categories: shopifyProduct.tags || localProduct.categories || [],
    ageBand: localProduct.ageBand || "3+",
    rating: localProduct.rating || 5.0,
    reviews: localProduct.reviews || 0,
    video: localProduct.video || null,
    testimony: localProduct.testimony || null
  };
}

export async function getProducts(first = 250, query = '') {
  try {
    const data = await shopifyFetch({
      query: GET_PRODUCTS_QUERY,
      variables: { first, query }
    });
    if (!data || !data.products) throw new Error("Invalid response: products is missing");
    return data.products.edges.map(edge => normalizeProduct(edge.node));
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to local products for uninterrupted UI if Shopify is down or not fully setup
    return localProducts; 
  }
}

export async function getProductByHandle(handle) {
  try {
    // Check if the passed handle is actually a local ID like 'toddsiq-best-sellers-1'
    const localFallback = localProducts.find(p => p.id === handle);
    const shopifyHandle = localFallback ? (localFallback.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) : handle;
    
    const data = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: shopifyHandle }
    });
    
    if (data.product) {
      return normalizeProduct(data.product);
    }
    
    return localFallback || null;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return localProducts.find(p => p.id === handle) || null;
  }
}
