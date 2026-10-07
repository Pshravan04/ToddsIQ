const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  await page.goto('https://toddsiq.com/', { waitUntil: 'networkidle2' });
  
  // Scroll down to load lazy elements
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  fs.writeFileSync('scratch/toddsiq_home_puppeteer.html', html);
  console.log('Saved HTML. Length:', html.length);
  
  // Try finding videos
  const videos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('video, iframe')).map(el => {
      return {
        tag: el.tagName,
        src: el.src || (el.querySelector('source') ? el.querySelector('source').src : null),
        poster: el.poster,
        className: el.className
      };
    }).filter(v => v.src);
  });
  
  console.log('Videos or iframes:', videos);
  
  await browser.close();
})();
