import fs from 'fs/promises';

async function extractFromHTML() {
  const html = await fs.readFile('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\32cfc2f8-2c2c-46f2-8509-3e3157421aea\\.system_generated\\steps\\1234\\content.md', 'utf-8');
  
  // Very basic regex to find product titles and images in Shopify Dawn/Theme HTML
  const titles = [...html.matchAll(/<a href="\/products\/.*?".*?class="full-unstyled-link">(.*?)<\/a>/gs)].map(m => m[1].trim().replace(/<[^>]+>/g, ''));
  const images = [...html.matchAll(/<img.*?src="([^"]+cdn\.shopify\.com[^"]+)".*?>/g)].map(m => m[1].replace('&amp;', '&'));
  
  console.log("Found titles:", titles.slice(0, 10));
  console.log("Found images:", images.slice(0, 10));
}
extractFromHTML();
