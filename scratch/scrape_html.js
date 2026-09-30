import fs from 'fs/promises';
import * as cheerio from 'cheerio';

async function run() {
  try {
    const res = await fetch('https://thoson.com/collections/best-sellers', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    const html = await res.text();
    if (html.includes('local_rate_limited')) {
      console.log('HTML is also rate-limited');
    } else {
      console.log('HTML fetched successfully. Length:', html.length);
      const $ = cheerio.load(html);
      const products = [];
      $('.product-grid-item').each((i, el) => {
        if (i >= 5) return;
        products.push({
          title: $(el).find('.product-title').text().trim() || $(el).find('h3').text().trim(),
          link: $(el).find('a').attr('href')
        });
      });
      console.log(products);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
