import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
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
      <div className={`product-image-wrap ${getCatClass(product.category)}`}>
        <div className="category-pill">{product.category || 'Toys'}</div>
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-fallback">No Image</div>
        )}
      </div>
      
      <div className="product-content">
        <div className="product-rating">
          <div className="stars">
            <Star size={14} fill="#FF9F43" color="#FF9F43" />
            <Star size={14} fill="#FF9F43" color="#FF9F43" />
            <Star size={14} fill="#FF9F43" color="#FF9F43" />
            <Star size={14} fill="#FF9F43" color="#FF9F43" />
            <Star size={14} fill="#FF9F43" color="#FF9F43" />
          </div>
          <span className="rating-count">(24)</span>
        </div>
        
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        
        <div className="product-bottom">
          <div className="product-price">
            ${product.price?.toFixed(2)}
            {product.compareAtPrice && (
              <span className="price-compare">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="btn-add-cart" onClick={handleQuickAdd} title="Quick Add">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
}
