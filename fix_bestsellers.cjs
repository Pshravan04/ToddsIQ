const fs = require('fs');

let f = fs.readFileSync('src/pages/Home.jsx', 'utf8');

if (!f.includes('const [bestsellerFilter')) {
  f = f.replace(/const \[quizAge, setQuizAge\] = useState\('3-4'\);/, "const [quizAge, setQuizAge] = useState('3-4');\n  const [bestsellerFilter, setBestsellerFilter] = useState('All Ages');");
  f = f.replace(/const bestsellers = productsData\.slice\(0, 4\);/, "const bestsellers = productsData.filter(p => bestsellerFilter === 'All Ages' || (bestsellerFilter === '3-5' ? (p.ageBand === '3-5' || p.ageBand === '3-8') : p.ageBand === bestsellerFilter)).slice(0, 4);");
  
  const newBtns = `{['All Ages', '1-3', '3-5', '5+'].map(age => (
    <button
      key={age}
      onClick={() => setBestsellerFilter(age)}
      className={\`px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors font-bold \${
        bestsellerFilter === age 
        ? 'bg-white text-ink border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' 
        : 'bg-canvas hover:bg-[#F4F1EA] text-ink-variant border border-outline'
      }\`}
    >
      {age === 'All Ages' ? age : \`Ages \${age}\`}
    </button>
  ))}`;
  
  // Need to replace the whole block of 4 buttons
  f = f.replace(/<div className="flex items-center gap-2 flex-wrap">[\s\S]*?<\/div>/, '<div className="flex items-center gap-2 flex-wrap">\n  ' + newBtns + '\n  </div>');
  
  fs.writeFileSync('src/pages/Home.jsx', f);
  console.log('Home.jsx bestsellers filter updated');
} else {
  console.log('Already updated');
}
