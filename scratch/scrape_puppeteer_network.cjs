const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  const videoUrls = new Set();
  
  // Intercept network requests
  page.on('response', async (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (url.includes('.mp4') || contentType.includes('video/mp4') || url.includes('cdn.shopify.com/videos/')) {
      videoUrls.add(url);
    }
  });

  await page.goto('https://toddsiq.com/', { waitUntil: 'networkidle2' });
  
  // Scroll down slowly
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300; // scroll amount
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300); // Wait 300ms between scrolls
    });
  });
  
  // Wait another 5 seconds for any late requests
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Intercepted Videos:');
  console.log(Array.from(videoUrls));
  
  await browser.close();
})();
