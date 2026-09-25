import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Product() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = productsData.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedVariant(found.variants[0]);
      setActiveImage(0);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!product) {
    return <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}><h2>Product not found</h2></div>;
  }

  // Related products logic
  const related = productsData
    .filter(p => p.id !== product.id && p.categories.some(c => product.categories.includes(c)))
    .slice(0, 4);

  return (
    <div className="container pdp-container">
      {/* Gallery */}
      <div>
        <div className="pdp-gallery" style={{ backgroundColor: `var(--bg-${product.categories[0].toLowerCase().split(' ')[0]})` }}>
          <img src={product.images[activeImage]} alt={product.name} />
        </div>
        {product.images.length > 1 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', overflowX: 'auto' }}>
            {product.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                style={{ 
                  width: 80, height: 80, borderRadius: '8px', padding: '4px', cursor: 'pointer',
                  border: activeImage === idx ? '2px solid var(--color-primary)' : '2px solid transparent',
                  backgroundColor: '#f5f5f5'
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pdp-info">
        <div className="pdp-category">{product.category}</div>
        <h1 className="pdp-title">{product.name}</h1>
        
        <div className="pdp-price-wrap">
          <span className="pdp-price">${selectedVariant?.price.toFixed(2)}</span>
          {selectedVariant?.compareAtPrice && (
            <span className="price-compare">${selectedVariant.compareAtPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="pdp-desc">{product.shortDescription}</p>
        
        {product.variants.length > 1 && (
          <div className="pdp-variant-selector">
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Options</div>
            {product.variants.map(v => (
              <button 
                key={v.id} 
                className={`variant-btn ${selectedVariant?.id === v.id ? 'selected' : ''}`}
                onClick={() => setSelectedVariant(v)}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className="pdp-actions">
          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(product, selectedVariant, 1)}
            disabled={!selectedVariant?.available}
          >
            {selectedVariant?.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {/* Why they'll love it */}
        <div className="pdp-section">
          <h3 className="pdp-section-title">Why they'll love it</h3>
          <ul className="feature-list">
            {product.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        {/* What's Included */}
        <div className="pdp-section">
          <h3 className="pdp-section-title">What's included</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--color-text-light)' }}>
            {product.whatsIncluded.map((w, i) => <li key={i} style={{ marginBottom: '8px' }}>{w}</li>)}
          </ul>
        </div>
        
        {/* Product Details */}
        <div className="pdp-section" style={{ borderBottom: 'none' }}>
          <h3 className="pdp-section-title">Product Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px 20px', color: 'var(--color-text-light)' }}>
            <div style={{ fontWeight: 700 }}>Age</div>
            <div>{product.ageRange}</div>
            {Object.entries(product.specifications).map(([k, v]) => (
              <React.Fragment key={k}>
                <div style={{ fontWeight: 700 }}>{k}</div>
                <div>{v}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ gridColumn: '1 / -1', marginTop: '4rem' }}>
          <h2 className="section-title text-center mb-8">You may also like</h2>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
