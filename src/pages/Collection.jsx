import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const COLLECTION_MAP = {
  'best-sellers': {
    title: "THEY'RE LOVING THESE.",
    subtitle: "Our top-rated, most-played-with favorites."
  },
  'stem-science': {
    title: "STEM & SCIENCE",
    subtitle: "Hands-on learning that feels like pure play."
  },
  'creative-play': {
    title: "CREATIVE PLAY",
    subtitle: "Open-ended tools for endless imagination."
  },
  'build-construct': {
    title: "BUILD & CONSTRUCT",
    subtitle: "Engineer their own worlds, one piece at a time."
  }
};

export default function Collection() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('featured');
  
  const collectionInfo = COLLECTION_MAP[id] || {
    title: id.replace('-', ' ').toUpperCase(),
    subtitle: "Explore our collection"
  };

  useEffect(() => {
    let filtered = [...productsData];
    
    // Filter logic based on collection id
    if (id === 'stem-science') {
      filtered = filtered.filter(p => p.categories.includes('STEM & SCIENCE'));
    } else if (id === 'creative-play') {
      filtered = filtered.filter(p => p.categories.includes('CREATIVE PLAY') || p.categories.includes('ARTS & CRAFTS'));
    } else if (id === 'build-construct') {
      filtered = filtered.filter(p => p.categories.includes('BUILD & CONSTRUCT'));
    }
    // best-sellers just shows all top products for now
    
    // Sort logic
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      // Dummy logic for newest, reverse array
      filtered.reverse();
    }
    
    setProducts(filtered);
  }, [id, sort]);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>{collectionInfo.title}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)' }}>{collectionInfo.subtitle}</p>
        </div>
      </div>
      
      <div className="container">
        <div className="filters-bar">
          <div style={{ fontWeight: 600 }}>{products.length} Products</div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        
        {products.length > 0 ? (
          <div className="product-grid mb-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center mb-8" style={{ padding: '4rem 0' }}>
            <h3>No products found in this collection.</h3>
          </div>
        )}
      </div>
    </>
  );
}
