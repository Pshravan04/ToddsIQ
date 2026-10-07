const fs = require('fs');
const cheerio = require('cheerio'); // From scratch/node_modules

const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/32cfc2f8-2c2c-46f2-8509-3e3157421aea/.system_generated/steps/3491/content.md', 'utf8');

const $ = cheerio.load(html);

const products = [];
$('[class*="product-grid"]').each((i, el) => {
   // Let's just find anything with 'product' class
   console.log("Found product grid");
});

const titles = [];
$('h3, .product-title, .product-name').each((i, el) => {
   titles.push($(el).text().trim());
});

console.log("Found titles:", titles.filter(t => t.length > 0));

const jsonScripts = [];
$('script[type="application/json"]').each((i, el) => {
    jsonScripts.push($(el).html());
});

console.log("Found JSON scripts count:", jsonScripts.length);
jsonScripts.forEach((s, i) => {
    if (s.includes('products') || s.includes('items')) {
        console.log("Possible product data in script", i);
    }
});
