import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const getCatClass = (cat) => {
    if (!cat) return 'cat-default';
    const mapping = {
      'STEM & SCIENCE': 'cat-stem',
      'ARTS & CRAFTS': 'cat-creative',
      'BUILD & CONSTRUCT': 'cat-building',
      'SENSORY PLAY': 'cat-sensory',
      'MATH & LOGIC': 'cat-math',
      'ACTIVE PLAY': 'cat-active',
      'LEARNING': 'cat-learning',
      'CREATIVE PLAY': 'cat-creative'
    };
    return mapping[cat] || 'cat-default';
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) {
      addToCart(product, product.variants[0], 1);
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className={`product-image-container ${getCatClass(product.category)}`}>
        <div className="category-badge">{product.category}</div>
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc'}}>No Image</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        <div className="product-footer">
          <div className="product-price">
            ${product.price?.toFixed(2)}
            {product.compareAtPrice && (
              <span className="price-compare">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="add-to-cart-quick" onClick={handleQuickAdd} title="Quick Add">
            <Plus size={24} />
          </button>
        </div>
      </div>
    </Link>
  );
}
