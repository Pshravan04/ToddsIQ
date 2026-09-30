async function run() {
  try {
    const res = await fetch('https://thoson.com/products.json?limit=5');
    const data = await res.json();
    console.log(JSON.stringify(data.products.map(p => ({ title: p.title, images: p.images.slice(0, 1), handle: p.handle })), null, 2));
  } catch (e) {
    console.error(e);
  }
}
run();
