const fs = require('fs');

function convert() {
  const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/32cfc2f8-2c2c-46f2-8509-3e3157421aea/stitch_code.html', 'utf8');
  
  // Extract main
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let jsx = mainMatch ? mainMatch[1] : html;

  // Attributes
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/onclick=/g, 'onClick=');
  jsx = jsx.replace(/onchange=/g, 'onChange=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  
  // Styles
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const styles = styleStr.split(';').filter(s => s.trim()).map(s => {
      const parts = s.split(':');
      if (parts.length < 2) return '';
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts.slice(1).join(':').trim().replace(/'/g, "\\'");
      return `'${key}': '${value}'`;
    }).filter(s => s);
    return `style={{${styles.join(', ')}}}`;
  });

  // Self closing tags
  jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?!\/)>([^<]*)(?:<\/\1>)?/gi, '<$1$2 />');

  // Comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  fs.writeFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/32cfc2f8-2c2c-46f2-8509-3e3157421aea/scratch/converted_main.jsx', jsx);
  console.log('Conversion done, length:', jsx.length);
}

convert();
