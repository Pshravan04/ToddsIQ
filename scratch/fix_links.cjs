const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.jsx', 'utf-8');

// Add id="catalog" to the Shop by Age section
code = code.replace(
  '<section className="w-full px-gutter py-space-2xl bg-canvas">',
  '<section id="catalog" className="w-full px-gutter py-space-2xl bg-canvas">'
);

// We need to carefully replace <a href="#"> with <Link to="/collections">
// Since there are multiple <a> tags, replacing ALL <a > with <Link > might be risky if some are external links.
// Let's check if there are any external links in Home.jsx.
// The safe way is to replace only the ones that have href="#" or href="#catalog".
// Actually, href="#catalog" is already correct! Wait, it's <a ... href="#catalog">. Since it's an anchor link on the same page, standard <a> tag is actually PERFECT for `#catalog`. Don't change it to <Link>!
// Wait, react-router-dom <Link> also supports hash links.
// Let's just find `href="#"` and replace it with `to="/collections"` and change `<a ` to `<Link ` and `</a>` to `</Link>` for those specific lines.

const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('href="#"')) {
    lines[i] = lines[i].replace('href="#"', 'to="/collections"').replace('<a ', '<Link ').replace('</a>', '</Link>');
  }
}

fs.writeFileSync('src/pages/Home.jsx', lines.join('\n'));
console.log("Done updating Home.jsx");

// Also check Layout.jsx
let layoutCode = fs.readFileSync('src/components/Layout.jsx', 'utf-8');
const layoutLines = layoutCode.split('\n');
for (let i = 0; i < layoutLines.length; i++) {
  if (layoutLines[i].includes('href="#"')) {
    layoutLines[i] = layoutLines[i].replace('href="#"', 'to="/collections"').replace('<a ', '<Link ').replace('</a>', '</Link>');
  }
}
fs.writeFileSync('src/components/Layout.jsx', layoutLines.join('\n'));
console.log("Done updating Layout.jsx");
