const fs = require('fs');
let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

// Remove sliding pill entirely
content = content.replace(/<div className="absolute top-1\.5 bottom-1\.5 left-1\.5 rounded-full bg-ink transition-all duration-300 pointer-events-none" id="sliding-pill"[^>]*><\/div>\r?\n/g, '');

// Update each button to use bg-ink directly when active
content = content.replace(
  /\className=\{`tab-btn relative z-10 px-5 py-2\.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \$\{activeTab === '([^']+)' \? 'text-white' : 'text-ink-muted hover:text-ink'\}`\}/g,
  `className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === '$1' ? 'text-white bg-ink shadow-md' : 'text-ink-muted hover:text-ink bg-transparent'}\`}`
);

fs.writeFileSync('src/pages/Product.jsx', content);
console.log('Fixed tabs!');
