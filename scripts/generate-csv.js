import fs from 'fs/promises';
import { createWriteStream } from 'fs';

const COLLECTIONS = [
  { url: 'https://thoson.com/collections/best-sellers', tags: 'Best Sellers' },
  { url: 'https://thoson.com/collections/big-kids-ages-5', tags: 'Big Kids Ages 5+' },
  { url: 'https://thoson.com/collections/preschool-toys-ages-3-5', tags: 'Preschool Toys Ages 3-5' },
  { url: 'https://thoson.com/collections/toddler-toys-ages-1-3', tags: 'Toddler Toys Ages 1-3' }
];

async function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          ...(options.headers || {})
        }
      });
      if (res.status === 429) {
        console.log(`Rate limited on ${url}, waiting...`);
        if (i === retries - 1) throw new Error(`Rate limit exceeded for ${url}`);
        await delay(2000 * (i + 1));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`Error fetching ${url}: ${err.message}. Retrying...`);
      await delay(1000 * (i + 1));
    }
  }
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
    await delay(500);
  }
  return products;
}

function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  str = str.toString();
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function run() {
  console.log('Fetching products from collections...');
  const allProducts = new Map();
  const productTags = new Map();

  for (const col of COLLECTIONS) {
    console.log(`Fetching ${col.url}...`);
    const products = await getSourceProducts(col.url);
    for (const p of products) {
      if (!allProducts.has(p.handle)) {
        allProducts.set(p.handle, p);
        productTags.set(p.handle, new Set([col.tags]));
      } else {
        productTags.get(p.handle).add(col.tags);
      }
    }
  }

  const csvFile = 'shopify_products_import.csv';
  const headers = [
    'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
    'Option1 Name', 'Option1 Value', 'Option2 Name', 'Option2 Value', 'Option3 Name', 'Option3 Value',
    'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
    'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping',
    'Variant Taxable', 'Variant Barcode', 'Image Src', 'Image Position', 'Image Alt Text', 'Gift Card',
    'SEO Title', 'SEO Description', 'Variant Image', 'Variant Weight Unit', 'Variant Tax Code', 'Cost per item', 'Status'
  ];

  const lines = [headers.map(escapeCSV).join(',')];

  for (const [handle, p] of allProducts.entries()) {
    const tags = Array.from(productTags.get(handle)).join(', ');
    
    const variants = p.variants || [];
    const images = p.images || [];
    const maxRows = Math.max(variants.length, images.length, 1);

    for (let i = 0; i < maxRows; i++) {
      const isFirstRow = i === 0;
      const variant = variants[i];
      const image = images[i];

      const row = [
        handle, // Handle
        isFirstRow ? p.title : '', // Title
        isFirstRow ? p.body_html : '', // Body (HTML)
        isFirstRow ? p.vendor : '', // Vendor
        isFirstRow ? p.product_type : '', // Type
        isFirstRow ? tags : '', // Tags
        isFirstRow ? 'TRUE' : '', // Published
        
        variant && p.options[0] ? p.options[0].name : '', // Option1 Name
        variant ? variant.option1 || '' : '', // Option1 Value
        variant && p.options[1] ? p.options[1].name : '', // Option2 Name
        variant ? variant.option2 || '' : '', // Option2 Value
        variant && p.options[2] ? p.options[2].name : '', // Option3 Name
        variant ? variant.option3 || '' : '', // Option3 Value
        
        variant ? variant.sku || '' : '', // Variant SKU
        variant ? variant.grams || 0 : '', // Variant Grams
        variant ? 'shopify' : '', // Variant Inventory Tracker
        variant ? (variant.available ? 100 : 0) : '', // Variant Inventory Qty
        variant ? (variant.available ? 'continue' : 'deny') : '', // Variant Inventory Policy
        variant ? 'manual' : '', // Variant Fulfillment Service
        variant ? variant.price : '', // Variant Price
        variant ? variant.compare_at_price || '' : '', // Variant Compare At Price
        variant ? 'TRUE' : '', // Variant Requires Shipping
        variant ? 'TRUE' : '', // Variant Taxable
        variant ? variant.barcode || '' : '', // Variant Barcode
        
        image ? image.src : '', // Image Src
        image ? i + 1 : '', // Image Position
        image ? image.alt || '' : '', // Image Alt Text
        isFirstRow ? 'FALSE' : '', // Gift Card
        isFirstRow ? p.title : '', // SEO Title
        isFirstRow ? (p.body_html || '').substring(0, 150).replace(/(<([^>]+)>)/ig, '') : '', // SEO Description
        '', // Variant Image
        variant ? 'g' : '', // Variant Weight Unit
        '', // Variant Tax Code
        '', // Cost per item
        isFirstRow ? 'active' : '' // Status
      ];

      lines.push(row.map(escapeCSV).join(','));
    }
  }

  await fs.writeFile(csvFile, lines.join('\n'));
  console.log(`\n✅ CSV generation complete! Saved ${allProducts.size} products to ${csvFile}`);
}

run().catch(console.error);
