const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../src/data/products.json');
const p = require(dataPath);

p.forEach(item => {
  let title = item.title;
  // Remove existing "ToddsIQ" (with or without space/TM)
  title = title.replace(/ToddsIQ\s*™?\s*/gi, '');
  // Remove trailing TM
  title = title.replace(/™/g, '');
  
  // Clean up any stray spaces
  title = title.trim();
  
  // Set consistent branding
  item.title = `ToddsIQ™ ${title}`;
});

fs.writeFileSync(dataPath, JSON.stringify(p, null, 2));
console.log('Standardized product titles');
