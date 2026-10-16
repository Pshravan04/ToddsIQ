import { shopifyFetch } from './client';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from './queries';
import localProducts from '../../data/products.json'; // Fallback for extra UI properties not yet in Shopify

export function normalizeProduct(shopifyProduct) {
  if (!shopifyProduct) return null;

  // Find matching local product by multiple strategies: handle, id, slug, or title
  const sHandle = (shopifyProduct.handle || '').toLowerCase();
  const sTitle = (shopifyProduct.title || '').toLowerCase();
  const sHandleRaw = sHandle.replace(/^toddsiq-/, '');

  const localProduct = localProducts.find(p => {
    if (!p) return false;
    const pHandle = (p.handle || '').toLowerCase();
    const pId = (p.id || '').toLowerCase();
    const pSlug = (p.slug || '').toLowerCase();
    const pTitle = (p.title || '').toLowerCase();

    // Exact handle or id or slug match
    if (sHandle && (pHandle === sHandle || pId === sHandle || pSlug === sHandle)) return true;

    // Stripped handle match (without 'toddsiq-')
    const pHandleRaw = (pHandle || pId || pSlug).replace(/^toddsiq-/, '');
    if (sHandleRaw && pHandleRaw && sHandleRaw === pHandleRaw) return true;

    // Exact title match
    if (sTitle && pTitle === sTitle) return true;

    // Prefix title match (e.g. "ToddsIQ™ Pippo™ - Talking Word Cards" vs "ToddsIQ™ Pippo™")
    if (sTitle && pTitle && (pTitle.startsWith(sTitle) || sTitle.startsWith(pTitle))) return true;

    return false;
  }) || {};

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

  // Derive ageBand with fallback to Shopify tags and local data
  let ageBand = localProduct.ageBand;
  if (!ageBand) {
    const tags = shopifyProduct.tags || [];
    if (tags.some(t => t.includes('1-3') || t.toLowerCase().includes('toddler'))) {
      ageBand = '1-3';
    } else if (tags.some(t => t.includes('5+') || t.toLowerCase().includes('big kids'))) {
      ageBand = '5+';
    } else if (tags.some(t => t.includes('3-5') || t.toLowerCase().includes('preschool'))) {
      ageBand = '3-5';
    } else {
      ageBand = '3-5';
    }
  }

  const combinedCategories = Array.from(new Set([
    ...(shopifyProduct.tags || []),
    ...(localProduct.categories || []),
    ...(ageBand === '1-3' ? ['Toddler', 'Ages 1-3'] : []),
    ...(ageBand === '3-5' ? ['Preschool', 'Ages 3-5'] : []),
    ...(ageBand === '5+' ? ['Big Kids', 'Ages 5+'] : [])
  ]));

  return {
    // Keep local ID mapping temporarily or use handle so routing works seamlessly
    id: localProduct.id || shopifyProduct.handle, 
    handle: shopifyProduct.handle,
    slug: shopifyProduct.handle,
    shopifyId: shopifyProduct.id,
    title: shopifyProduct.title || localProduct.title || 'Unknown Product',
    description: shopifyProduct.description || (shopifyProduct.descriptionHtml ? shopifyProduct.descriptionHtml.replace(/<[^>]+>/g, '') : '') || localProduct.description || '',
    descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description || localProduct.description || '',
    price: price || localProduct.price || 0,
    compareAtPrice: compareAtPrice || localProduct.compareAtPrice || null,
    thumbnail: imageUrls[0] || localProduct.thumbnail || '',
    images: imageUrls.length > 0 ? imageUrls : (localProduct.images || []),
    options: options.length > 0 ? options : (localProduct.options || []),
    variants: variants.length > 0 ? variants : (localProduct.variants || []),
    categories: combinedCategories,
    ageBand: ageBand,
    badge: localProduct.badge || (compareAtPrice && price ? `SAVE ${Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%` : null),
    rating: localProduct.rating || 5.0,
    reviews: localProduct.reviews || 128,
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
    const shopifyItems = data.products.edges.map(edge => normalizeProduct(edge.node)).filter(Boolean);

    // Merge any missing localProducts so the catalog always has full coverage
    if (Array.isArray(localProducts) && localProducts.length > 0) {
      const existingHandles = new Set(shopifyItems.map(p => (p.handle || p.id || '').toLowerCase().replace(/^toddsiq-/, '')));
      const existingTitles = new Set(shopifyItems.map(p => (p.title || '').toLowerCase()));
      const remainingLocal = localProducts.filter(p => {
        const handleRaw = (p.handle || p.id || p.slug || '').toLowerCase().replace(/^toddsiq-/, '');
        const titleRaw = (p.title || '').toLowerCase();
        return !existingHandles.has(handleRaw) && !existingTitles.has(titleRaw);
      });
      return [...shopifyItems, ...remainingLocal];
    }

    return shopifyItems;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to local products for uninterrupted UI if Shopify is down or not fully setup
    return localProducts; 
  }
}

export async function getProductByHandle(handle) {
  if (!handle) return null;
  const localFallback = localProducts.find(p => p.id === handle || p.handle === handle || p.slug === handle);

  try {
    // 1. Direct handle fetch (e.g. 'drawing-robot', 'toddsiq-shapecrew')
    let data = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle }
    });
    
    if (data?.product) {
      return normalizeProduct(data.product);
    }

    // 2. Try with or without 'toddsiq-' prefix
    const altHandle = handle.startsWith('toddsiq-') 
      ? handle.replace(/^toddsiq-/, '') 
      : `toddsiq-${handle}`;

    data = await shopifyFetch({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: altHandle }
    });

    if (data?.product) {
      return normalizeProduct(data.product);
    }

    // 3. Try local fallback's explicit handle if distinct
    if (localFallback?.handle && localFallback.handle !== handle && localFallback.handle !== altHandle) {
      data = await shopifyFetch({
        query: GET_PRODUCT_BY_HANDLE_QUERY,
        variables: { handle: localFallback.handle }
      });
      if (data?.product) {
        return normalizeProduct(data.product);
      }
    }
    
    return localFallback || null;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return localFallback || null;
  }
}
