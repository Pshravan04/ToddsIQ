const fs = require('fs');
const p = require('../src/data/products.json');

let found = false;
p.forEach(item => {
  Object.keys(item).forEach(k => {
    if (typeof item[k] === 'string' && item[k].toLowerCase().includes('thoson') && k !== 'thumbnail' && k !== 'images') {
      console.log(`Found in ${item.id} -> ${k}: ${item[k].substring(0, 50)}`);
      item[k] = item[k].replace(/thoson/gi, 'ToddsIQ™');
      found = true;
    }
  });
  if (item.features) {
    item.features = item.features.map(f => {
      if (f.toLowerCase().includes('thoson')) {
        console.log(`Found in feature: ${f}`);
        found = true;
        return f.replace(/thoson/gi, 'ToddsIQ™');
      }
      return f;
    });
  }
});

if (found) {
  fs.writeFileSync('../src/data/products.json', JSON.stringify(p, null, 2));
  console.log('Fixed instances in products.json');
} else {
  console.log('No text occurrences found');
}
