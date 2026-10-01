const fs = require('fs');

let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

// Remove Before & After Slider
const beforeAfterStart = content.indexOf('{/* INTERACTIVE BEFORE & AFTER SLIDER');
if (beforeAfterStart !== -1) {
  const sectionStart = content.indexOf('<section', beforeAfterStart);
  const sectionEnd = content.indexOf('</section>', sectionStart) + 10;
  content = content.substring(0, beforeAfterStart) + content.substring(sectionEnd);
  console.log('Removed Before & After Slider');
}

fs.writeFileSync('src/pages/Product.jsx', content);
