const fs = require('fs');

async function run() {
  const url = 'https://thoson.com/collections/best-sellers/products.json?limit=250';
  const res = await fetch(url);
  const data = await res.json();
  fs.writeFileSync('thoson_products.json', JSON.stringify(data.products, null, 2));
  console.log('Saved ' + data.products.length + ' products.');
}

run();
