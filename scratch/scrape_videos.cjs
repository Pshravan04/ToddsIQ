const https = require('https');
const fs = require('fs');

https.get('https://toddsiq.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scratch/toddsiq_home.html', data);
    console.log('Downloaded HTML. Length:', data.length);
    
    // Find videos using a regex
    // Looks for anything that resembles a video URL, typically ending in .mp4 or similar,
    // or Shopify CDN video URLs
    const videoMatches = data.match(/https?:\/\/[^"'\s]+\.mp4[^"'\s]*/gi) || [];
    console.log('MP4 URLs found:', new Set(videoMatches));

    // Alternative: check for source tags
    const sourceMatches = data.match(/<source[^>]+src=["']([^"']+)["']/gi) || [];
    console.log('Source tags found:', sourceMatches);
  });
}).on('error', (err) => console.log('Error: ' + err.message));
