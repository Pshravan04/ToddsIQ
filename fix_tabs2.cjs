const fs = require('fs');
let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

const tabs = ['overview', 'included', 'how-to-use', 'clinical', 'safety'];

for (const tab of tabs) {
  const target = "${activeTab === '" + tab + "' ? 'text-white' : 'text-ink-muted hover:text-ink'}";
  const replacement = "${activeTab === '" + tab + "' ? 'text-white bg-ink shadow-md' : 'text-ink-muted hover:text-ink bg-transparent'}";
  content = content.replace(target, replacement);
}

fs.writeFileSync('src/pages/Product.jsx', content);
console.log('Tabs correctly updated!');
