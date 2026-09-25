const fs = require('fs');

const targetProducts = [
  "Thoson Bot - Full Pack",
  "Thoson Lizard - Play Pack",
  "Thoson MagTrack",
  "Thoson Magic Gel - 30 Pcs Full Pack",
  "NestWood - Full Pack",
  "Thoson SpiderRacer Duo",
  "TurboMonster Pack",
  "Thoson Blocks - Full Pack",
  "Count Crew - Full Pack",
  "Spell & Play - Full Pack",
  "Thoson AquaDoodle Book",
  "Thoson MicroScope Explorer"
];

const rawData = JSON.parse(fs.readFileSync('thoson_all_products.json', 'utf8'));

// Helper to clean HTML description and make short description
function cleanHtml(html) {
  return html.replace(/<[^>]*>?/gm, '').trim();
}

function getShortDescription(text) {
  const sentences = text.split('.');
  return sentences[0] ? sentences[0] + '.' : '';
}

function extractAgeRange(tags) {
  const ageTag = tags.find(t => t.startsWith('age:'));
  return ageTag ? ageTag.replace('age:', '') : '3+';
}

function extractCategories(tags) {
  const catTags = tags.filter(t => t.startsWith('cat:'));
  if (catTags.length === 0) return ['CREATIVE PLAY'];
  
  const mapping = {
    'arts': 'ARTS & CRAFTS',
    'stem': 'STEM & SCIENCE',
    'building': 'BUILD & CONSTRUCT',
    'sensory': 'SENSORY PLAY',
    'math': 'MATH & LOGIC',
    'learning': 'LEARNING'
  };
  
  return catTags.map(t => mapping[t.replace('cat:', '')] || 'CREATIVE PLAY');
}

const finalProducts = [];

targetProducts.forEach(tp => {
  const normTp = tp.replace(' - ', ' ').replace('30 Pcs ', '').toLowerCase();
  
  const matched = rawData.find(prod => {
    const normalizedTitle = prod.title.replace('™', '').replace('®', '').replace(' - ', ' ').toLowerCase();
    return normalizedTitle.includes(normTp) || normTp.includes(normalizedTitle);
  });

  if (matched) {
    const desc = cleanHtml(matched.body_html || '');
    const categories = extractCategories(matched.tags);
    
    // Map variants
    const variants = matched.variants.map(v => ({
      id: v.id.toString(),
      name: v.title,
      price: parseFloat(v.price),
      compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
      sku: v.sku,
      available: v.available
    }));
    
    const price = variants.length > 0 ? variants[0].price : 0;
    const compareAtPrice = variants.length > 0 ? variants[0].compareAtPrice : null;

    const images = matched.images.map(img => img.src);

    finalProducts.push({
      id: matched.id.toString(),
      slug: matched.handle,
      name: tp, // Use the ToddsIQ specific name
      category: categories[0],
      categories: categories,
      shortDescription: getShortDescription(desc),
      description: desc,
      price: price,
      compareAtPrice: compareAtPrice,
      currency: "USD",
      images: images,
      thumbnail: images[0] || null,
      variants: variants,
      ageRange: extractAgeRange(matched.tags),
      features: [
        "Screen-free interactive play",
        "Builds critical thinking skills",
        "Safe and durable materials"
      ],
      whatsIncluded: ["Main product components", "Instruction guide"],
      specifications: {
        "Materials": "Child-safe, non-toxic components",
        "Care": "Wipe clean with damp cloth"
      },
      availability: variants.some(v => v.available) ? "In Stock" : "Out of Stock",
      source: "thoson.com",
      authorizedAsset: true
    });
  } else {
    // Generate dummy product if not found
    finalProducts.push({
      id: "dummy_" + Math.random().toString(36).substr(2, 9),
      slug: tp.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: tp,
      category: 'CREATIVE PLAY',
      categories: ['CREATIVE PLAY'],
      shortDescription: 'Engaging, hands-on fun for curious minds.',
      description: 'A wonderful addition to your child\'s playtime. Engaging, hands-on fun designed for curious minds.',
      price: 39.99,
      compareAtPrice: 49.99,
      currency: "USD",
      images: ["https://placehold.co/800x800/e6e6fa/ffffff?text=" + encodeURIComponent(tp)],
      thumbnail: "https://placehold.co/800x800/e6e6fa/ffffff?text=" + encodeURIComponent(tp),
      variants: [{
        id: "var_dummy",
        name: "Standard",
        price: 39.99,
        compareAtPrice: null,
        sku: "DUMMY",
        available: true
      }],
      ageRange: "3+",
      features: [
        "Screen-free interactive play",
        "Builds critical thinking skills",
        "Safe and durable materials"
      ],
      whatsIncluded: ["Main product components", "Instruction guide"],
      specifications: {
        "Materials": "Child-safe, non-toxic components",
        "Care": "Wipe clean with damp cloth"
      },
      availability: "In Stock",
      source: "generated",
      authorizedAsset: false
    });
  }
});

// Create data directory if not exists
if (!fs.existsSync('./src/data')) {
  fs.mkdirSync('./src/data', { recursive: true });
}

fs.writeFileSync('./src/data/products.json', JSON.stringify(finalProducts, null, 2));
console.log('Processed and saved ' + finalProducts.length + ' products.');
