import fs from 'fs/promises';
import 'dotenv/config';

const TARGET_DOMAIN = '065gcz-yy.myshopify.com';
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
const IS_DRY_RUN = process.argv.includes('--dry-run');

if (!ADMIN_TOKEN) {
  console.error("❌ SHOPIFY_ADMIN_API_ACCESS_TOKEN is missing from your environment variables.");
  console.error("Please add it to .env (not .env.local if exposed to Vite) and run again.");
  process.exit(1);
}

const COLLECTIONS = [
  { url: 'https://thoson.com/collections/best-sellers', handle: 'best-sellers', title: 'Best Sellers' },
  { url: 'https://thoson.com/collections/big-kids-ages-5', handle: 'big-kids-ages-5', title: 'Big Kids · Ages 5+' },
  { url: 'https://thoson.com/collections/preschool-toys-ages-3-5', handle: 'preschool-toys-ages-3-5', title: 'Preschool Toys · Ages 3–5' },
  { url: 'https://thoson.com/collections/toddler-toys-ages-1-3', handle: 'toddler-toys-ages-1-3', title: 'Toddler Toys · Ages 1–3' }
];

async function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429) {
        console.log(`Rate limited on ${url}, waiting...`);
        await delay(2000 * (i + 1));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await delay(1000 * (i + 1));
    }
  }
}

const ADMIN_API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION || '2026-07';

async function adminGraphQL(query, variables = {}) {
  const res = await fetchWithRetry(`https://${TARGET_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

async function getSourceProducts(collectionUrl) {
  let products = [];
  let page = 1;
  while (true) {
    const jsonUrl = `${collectionUrl}/products.json?limit=250&page=${page}`;
    const res = await fetchWithRetry(jsonUrl);
    const data = await res.json();
    if (!data.products || data.products.length === 0) break;
    products.push(...data.products);
    page++;
    await delay(500); // respect source rate limits
  }
  return products;
}

async function getAllShopifyProducts() {
  const products = new Map(); // handle -> id
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const data = await adminGraphQL(`
      query getProducts($cursor: String) {
        products(first: 250, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              handle
              metafield(namespace: "custom", key: "source_product_url") {
                value
              }
            }
          }
        }
      }
    `, { cursor });

    for (const edge of data.products.edges) {
      products.set(edge.node.handle, edge.node.id);
      if (edge.node.metafield?.value) {
        // We can also track by URL if needed
      }
    }
    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }
  return products;
}

async function ensureCollectionsExist() {
  const existing = new Map();
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const data = await adminGraphQL(`
      query getCollections($cursor: String) {
        collections(first: 250, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              handle
            }
          }
        }
      }
    `, { cursor });

    for (const edge of data.collections.edges) {
      existing.set(edge.node.handle, edge.node.id);
    }
    hasNextPage = data.collections.pageInfo.hasNextPage;
    cursor = data.collections.pageInfo.endCursor;
  }

  const collectionIds = {};
  for (const col of COLLECTIONS) {
    if (existing.has(col.handle)) {
      collectionIds[col.handle] = existing.get(col.handle);
    } else {
      if (IS_DRY_RUN) {
        console.log(`[DRY RUN] Would create collection: ${col.title}`);
        collectionIds[col.handle] = 'mock_collection_id';
      } else {
        console.log(`Creating collection: ${col.title}`);
        const result = await adminGraphQL(`
          mutation collectionCreate($input: CollectionInput!) {
            collectionCreate(input: $input) {
              collection { id }
              userErrors { field message }
            }
          }
        `, {
          input: {
            title: col.title,
            handle: col.handle
          }
        });
        if (result.collectionCreate.userErrors.length > 0) {
          console.error('Error creating collection:', result.collectionCreate.userErrors);
        } else {
          collectionIds[col.handle] = result.collectionCreate.collection.id;
        }
      }
    }
  }
  return collectionIds;
}

function cleanHtml(html) {
  if (!html) return '';
  // Basic cleanup: remove script tags, etc. For now, keep as is based on instructions
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

async function run() {
  console.log(`Starting ${IS_DRY_RUN ? 'DRY RUN ' : ''}import process...`);
  
  const report = {
    collectionsFound: 0,
    productsFound: 0,
    uniqueProducts: 0,
    created: [],
    updated: [],
    skipped: [],
    failed: [],
    variantsProcessed: 0,
    imagesProcessed: 0,
    dryRunDetails: []
  };

  try {
    const existingShopifyProducts = await getAllShopifyProducts();
    const collectionIds = await ensureCollectionsExist();
    report.collectionsFound = COLLECTIONS.length;

    const sourceProductsMap = new Map();
    const productCollectionsMap = new Map();
    const sourceCollectionsFound = new Map();

    // 1. Scrape all products
    for (const col of COLLECTIONS) {
      console.log(`Fetching from ${col.url}...`);
      const products = await getSourceProducts(col.url);
      
      for (const p of products) {
        const handle = p.handle;
        if (!sourceProductsMap.has(handle)) {
          sourceProductsMap.set(handle, p);
          productCollectionsMap.set(handle, [col.handle]);
          sourceCollectionsFound.set(handle, [col.title]);
        } else {
          const cols = productCollectionsMap.get(handle);
          if (!cols.includes(col.handle)) {
            cols.push(col.handle);
            sourceCollectionsFound.get(handle).push(col.title);
          }
        }
        report.productsFound++;
      }
    }
    
    report.uniqueProducts = sourceProductsMap.size;

    // 2. Process products
    for (const [handle, p] of sourceProductsMap.entries()) {
      try {
        const isExisting = existingShopifyProducts.has(handle);
        const sourceUrl = `https://thoson.com/products/${handle}`;
        
        const options = p.options || [];
        const variants = p.variants || [];
        const images = p.images || [];

        report.variantsProcessed += variants.length;
        report.imagesProcessed += images.length;

        const prices = variants.map(v => v.price).filter(Boolean);
        const compareAtPrices = variants.map(v => v.compare_at_price).filter(Boolean);
        const missingPrice = variants.some(v => v.price == null);

        if (IS_DRY_RUN) {
          report.dryRunDetails.push({
            title: p.title,
            sourceUrl: sourceUrl,
            handle: handle,
            action: isExisting ? 'UPDATE' : 'CREATE',
            collections: sourceCollectionsFound.get(handle),
            options: options.map(o => o.name),
            variantsCount: variants.length,
            prices: [...new Set(prices)],
            compareAtPrices: [...new Set(compareAtPrices)],
            missingPrices: missingPrice,
            availability: variants.some(v => v.available) ? 'In Stock' : 'Out of Stock',
            imagesCount: images.length
          });
          if (isExisting) {
            report.updated.push(p.title);
          } else {
            report.created.push(p.title);
          }
          continue;
        }

        // --- Real Import Logic Below (omitted for dry run) ---
        // (This would use adminGraphQL to create products, etc.)

      } catch (err) {
        console.error(`[FAILED] ${p.title} - ${err.message}`);
        report.failed.push({ title: p.title, url: `https://thoson.com/products/${p.handle}`, error: err.message });
      }
    }
    
    // Save report
    await fs.writeFile('import-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n--- Final Report ---');
    console.log(`Total Source Products Found: ${report.productsFound}`);
    console.log(`Unique Products to Process: ${report.uniqueProducts}`);
    console.log(`Duplicate Product Occurrences (in multiple collections): ${report.productsFound - report.uniqueProducts}`);
    console.log(`Collections: ${report.collectionsFound}`);
    console.log(`Total Variants Discovered: ${report.variantsProcessed}`);
    console.log(`Total Images Discovered: ${report.imagesProcessed}`);
    console.log(`Products That Already Exist (Would UPDATE): ${report.updated.length}`);
    console.log(`Products That Are New (Would CREATE): ${report.created.length}`);
    console.log(`Products Skipped: ${report.skipped.length}`);
    console.log(`Products Failed: ${report.failed.length}`);
    console.log('--------------------');
    
    if (IS_DRY_RUN) {
      console.log('\nDetailed DRY RUN output saved to import-report.json');
    }

  } catch (err) {
    console.error("Fatal Error during import:", err);
  }
}

run();
