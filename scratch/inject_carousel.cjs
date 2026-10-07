const fs = require('fs');

let homeStr = fs.readFileSync('src/pages/Home.jsx', 'utf8');

if (!homeStr.includes("import VideoCarousel")) {
  // Add import
  homeStr = homeStr.replace(
    "import ProductCard from '../components/ProductCard';",
    "import ProductCard from '../components/ProductCard';\nimport VideoCarousel from '../components/VideoCarousel';"
  );
  
  // Inject component
  const searchPattern = '<FadeInUp><section className="w-full px-gutter py-space-2xl bg-[#F4F1EA]-low border-y-2 border-ink">';
  const injectIndex = homeStr.indexOf(searchPattern);
  
  if (injectIndex !== -1) {
    const newComponent = `
  <FadeInUp>
    <section className="w-full bg-canvas py-8">
      <div className="max-w-[1400px] mx-auto">
        <VideoCarousel />
      </div>
    </section>
  </FadeInUp>
  
  `;
    homeStr = homeStr.slice(0, injectIndex) + newComponent + homeStr.slice(injectIndex);
    fs.writeFileSync('src/pages/Home.jsx', homeStr);
    console.log("Injected VideoCarousel successfully!");
  } else {
    console.log("Could not find insertion point!");
  }
} else {
  console.log("VideoCarousel already imported.");
}
