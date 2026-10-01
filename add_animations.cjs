const fs = require('fs');
let f = fs.readFileSync('src/pages/Home.jsx', 'utf8');

if (!f.includes('AnimatedSection')) {
  f = "import { FadeInUp, StaggerContainer, StaggerItem } from '../components/AnimatedSection';\n" + f;
  f = f.replace(/<section/g, '<FadeInUp><section');
  f = f.replace(/<\/section>/g, '</section></FadeInUp>');
  fs.writeFileSync('src/pages/Home.jsx', f);
  console.log('Home.jsx updated');
}

let p = fs.readFileSync('src/pages/Product.jsx', 'utf8');
if (!p.includes('AnimatedSection')) {
  p = "import { FadeInUp } from '../components/AnimatedSection';\n" + p;
  // Wrap main content
  p = p.replace(/<div className="flex flex-col lg:flex-row gap-space-2xl">/, '<FadeInUp className="w-full"><div className="flex flex-col lg:flex-row gap-space-2xl">');
  // Need to close it before the first section
  p = p.replace(/<section className="mt-space-2xl border-t-2 border-ink pt-space-xl">/, '</FadeInUp>\n      <section className="mt-space-2xl border-t-2 border-ink pt-space-xl">');
  
  // Wrap sections
  p = p.replace(/<section /g, '<FadeInUp><section ');
  p = p.replace(/<\/section>/g, '</section></FadeInUp>');
  fs.writeFileSync('src/pages/Product.jsx', p);
  console.log('Product.jsx updated');
}
