const fs = require('fs');

// Fix Home.jsx
let code = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// Add id="catalog" to the Shop by Age section
code = code.replace(
  '<section className="w-full px-gutter py-space-2xl bg-canvas">',
  '<section id="catalog" className="w-full px-gutter py-space-2xl bg-canvas">'
);

// Replace href="#" with href="/collections"
code = code.replace(/href="#"/g, 'href="/collections"');
// We need to restore the previous fix for the badge that was undone by git checkout
code = code.replace(
  'bg-coral/20 text-canvas font-label-sm text-label-sm uppercase tracking-wider px-3 py-0.5 rounded-full border border-ink',
  'bg-coral text-canvas font-label-sm text-label-sm uppercase tracking-wider px-3 py-0.5 rounded-full border border-ink'
);
// Also the card button
code = code.replace(
  'bg-coral/20 text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] hover:bg-coral',
  'bg-coral text-canvas text-center font-label-md text-label-md rounded-xl border border-ink shadow-[2px_2px_0px_#1E2A38] hover:bg-[#E5503F]'
);

fs.writeFileSync('src/pages/Home.jsx', code);
console.log("Done updating Home.jsx");

// Fix Layout.jsx
let layoutCode = fs.readFileSync('src/components/Layout.jsx', 'utf-8');
layoutCode = layoutCode.replace(/href="#"/g, 'href="/collections"');
fs.writeFileSync('src/components/Layout.jsx', layoutCode);
console.log("Done updating Layout.jsx");
