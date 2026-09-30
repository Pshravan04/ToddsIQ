const fs = require('fs');

// Mock high-quality data mimicking the requested categories and structure
const imagesPool = [
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/relay1.png?v=1790182797",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/Screenshot2026-09-18at9.44.48AM.png?v=1789739103",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/thoson-squishy-advent-01.png?v=1789972844",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/81C9-rNwEBL._AC_SL1500.avif?v=1789240802",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/hf_20260205_215043_23e2763a-851d-4d12-9455-1dd47e177044.jpg?v=1770329157",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/c081e7dcd2f33e7311ce838274621532.jpg?v=1762025724",
  "https://cdn.shopify.com/s/files/1/0916/9852/8593/files/a0ce02a2989848088175136d47c86f3b.jpg?v=1762029471"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const categories = [
  { name: "Best Sellers", ageBand: "3-12" },
  { name: "Toddler", ageBand: "1-3" },
  { name: "Preschool", ageBand: "3-5" },
  { name: "Big Kids", ageBand: "5+" }
];

const adjectives = ["MagTrack", "Relay", "Run", "Squishy", "Blitz", "DrawBot", "CodeMaster", "Lingo", "Chime", "Pippo"];
const testimonies = [
  "Absolutely incredible! My kids haven't touched their iPads in a week. They love it! - Sarah M.",
  "The build quality is fantastic, and it actually teaches them useful skills. Highly recommend. - James T.",
  "Worth every penny. We use it every single day for learning time. - Amanda R.",
  "My 4-year-old was able to figure this out so quickly. So intuitive! - David K.",
  "Finally a toy that challenges them without frustrating them. - Elena P."
];

const products = [];

categories.forEach(cat => {
  for (let i = 0; i < 5; i++) {
    const title = `ToddsIQ ${getRandom(adjectives)}™`;
    products.push({
      id: `toddsiq-${cat.name.toLowerCase().replace(/ /g, '-')}-${i}`,
      title: title,
      price: Math.floor(Math.random() * (120 - 39) + 39) + 0.99,
      compareAtPrice: Math.floor(Math.random() * (169 - 130) + 130) + 0.99,
      ageBand: cat.ageBand,
      categories: [cat.name, "STEM & Learning"],
      rating: +(4.5 + Math.random() * 0.4).toFixed(1),
      reviews: Math.floor(Math.random() * 2000) + 150,
      thumbnail: getRandom(imagesPool),
      images: [getRandom(imagesPool), getRandom(imagesPool)],
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      testimony: getRandom(testimonies),
      options: [
        {
          name: "Edition",
          values: ["Standard", "Deluxe Pack"]
        }
      ],
      description: `The ${title} is designed specifically for ${cat.ageBand} to promote screen-free learning, spatial reasoning, and critical thinking. Made with premium, child-safe materials.`
    });
  }
});

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 2));
console.log('Wrote 20 products to src/data/products.json');
