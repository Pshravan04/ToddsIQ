const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Fix mega-menu alignment to left instead of center
css = css.replace(
  /left: 50%;\s*transform: translateX\(-50%\) scale\(0\.96\) translateY\(-10px\);\s*transform-origin: top center;/g,
  `left: 0;
  transform: scale(0.96) translateY(-10px);
  transform-origin: top left;`
);

css = css.replace(
  /transform: translateX\(-50%\) scale\(1\) translateY\(0\);/g,
  `transform: scale(1) translateY(0);`
);

css = css.replace(
  /left: calc\(50% - 7px\);/g,
  `left: 48px;`
);

fs.writeFileSync('src/index.css', css);
console.log('Fixed mega menu alignment!');
