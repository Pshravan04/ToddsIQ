const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Product.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { from: /bg-primary\b/g, to: 'bg-coral' },
  { from: /text-on-primary\b/g, to: 'text-canvas' },
  { from: /bg-primary-container\b/g, to: 'bg-coral/20' },
  { from: /text-on-primary-container\b/g, to: 'text-coral' },
  { from: /bg-primary-fixed\b/g, to: 'bg-coral' },
  { from: /text-on-primary-fixed\b/g, to: 'text-canvas' },
  { from: /border-on-surface\b/g, to: 'border-ink' },
  { from: /text-on-surface\b/g, to: 'text-ink' },
  { from: /bg-surface-container\b/g, to: 'bg-[#F4F1EA]' }, // slightly darker canvas
  { from: /bg-surface\b/g, to: 'bg-canvas' },
  { from: /#1c1c18/g, to: '#1E2A38' } // ink color
];

replacements.forEach(({from, to}) => {
  content = content.replace(from, to);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Product.jsx tokens!');
