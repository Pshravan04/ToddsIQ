const fs = require('fs');
const filePath = 'd:\\TGM - sites\\toddsiq-newww\\src\\pages\\Home.jsx';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

let newLines = [];
let skip = false;
for (let line of lines) {
    if (line.includes('<FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-t-2 border-ink">')) {
        skip = true;
    } else if (line.includes('<FadeInUp><section className="w-full px-gutter py-space-2xl bg-canvas">')) {
        skip = true;
    }
    
    if (!skip) {
        newLines.push(line);
    }
    
    if (skip && line.includes('</section></FadeInUp>')) {
        skip = false;
    }
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Done!');
