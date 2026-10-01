const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const allFiles = walkSync(path.join(__dirname, 'src'));
const jsxFiles = allFiles.filter(f => f.endsWith('.jsx'));

const replacements = [
  { from: /bg-primary-container\b/g, to: 'bg-coral/20' },
  { from: /text-on-primary-container\b/g, to: 'text-coral' },
  { from: /bg-primary-fixed\b/g, to: 'bg-coral' },
  { from: /text-on-primary-fixed\b/g, to: 'text-canvas' },
  { from: /bg-primary\b/g, to: 'bg-coral' },
  { from: /text-on-primary\b/g, to: 'text-canvas' },
  { from: /border-on-surface\b/g, to: 'border-ink' },
  { from: /text-on-surface\b/g, to: 'text-ink' },
  { from: /text-on-surface-variant\b/g, to: 'text-ink/80' },
  { from: /bg-surface-container\b/g, to: 'bg-[#F4F1EA]' },
  { from: /bg-surface-container-high\b/g, to: 'bg-[#EAE5D9]' },
  { from: /bg-surface-container-low\b/g, to: 'bg-canvas' },
  { from: /bg-surface\b/g, to: 'bg-canvas' },
  { from: /#1c1c18/g, to: '#1E2A38' },
  { from: /text-primary\b/g, to: 'text-coral' }
];

jsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated tokens in: ${file}`);
  }
});
