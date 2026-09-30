import fs from 'fs/promises';

const collections = [
  'best-sellers',
  'big-kids-ages-5',
  'preschool-toys-ages-3-5',
  'toddler-toys-ages-1-3'
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const allProducts = [];
  let idCounter = 100;
  
  for (const collection of collections) {
    try {
      console.log(`Fetching collection: ${collection}`);
      const res = await fetch(`https://thoson.com/collections/${collection}/products.json?limit=5`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        }
      });
      const text = await res.text();
      
      if (text.includes('local_rate_limited') || text.includes('Challenge Validation')) {
        console.error(`Rate limited or blocked on ${collection}`);
        await sleep(2000);
        continue;
      }
      
      const data = JSON.parse(text);
      
      const mapped = data.products.map(p => {
        let video = null;
        const html = p.body_html || '';
        const videoMatch = html.match(/<iframe.*?src="(.*?)".*?><\/iframe>/);
        if (videoMatch) video = videoMatch[1];
        
        let testimony = null;
        const bqMatch = html.match(/<blockquote.*?>(.*?)<\/blockquote>/s);
        if (bqMatch) {
            testimony = bqMatch[1].replace(/<[^>]*>?/gm, '').trim();
        }
        
        return {
          id: idCounter++,
          handle: p.handle,
          title: p.title.replace(/Thoson/g, 'ToddsIQ'),
          category: collection,
          price: p.variants[0]?.price || "29.99",
          originalPrice: p.variants[0]?.compare_at_price || null,
          description: html.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...',
          image: p.images[0]?.src,
          images: p.images.map(img => img.src),
          video: video,
          testimony: testimony || "My kids love this toy! Best purchase ever.",
          tags: p.tags,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 50,
          isNew: Math.random() > 0.7,
          benefits: ["Develops fine motor skills", "Screen-free fun", "Durable materials"]
        };
      });
      
      allProducts.push(...mapped);
      await sleep(2000); 
    } catch (e) {
      console.error(`Failed to fetch ${collection}:`, e.message);
    }
  }
  
  await fs.writeFile('src/data/scraped_products.json', JSON.stringify(allProducts, null, 2));
  console.log(`Saved ${allProducts.length} products to src/data/scraped_products.json`);
}

run();
