import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const {
    id, name, price, compareAtPrice, images, image, category,
    badge, rating = 4.8, reviewCount = 128, isNew
  } = product;

  const img = images?.[0] || image;
  const savings = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image: img });
  };

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-img-wrap">
        <img src={img} alt={name} loading="lazy" />
        {badge && <span className={`product-badge badge-${badge.toLowerCase().replace(' ','-')}`}>{badge}</span>}
        {!badge && isNew && <span className="product-badge badge-new">NEW</span>}
        {!badge && !isNew && compareAtPrice && <span className="product-badge badge-sale">SALE</span>}
        <button className="product-quick-add" onClick={handleAddToCart} aria-label="Quick add to cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>

      <div className="product-body">
        {category && <span className="product-cat">{category}</span>}
        <h3 className="product-name">{name}</h3>
        <div className="product-stars">
          {Array.from({length: 5}).map((_, i) => (
            <StarIcon key={i} style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }} />
          ))}
          <span className="review-count">({reviewCount})</span>
        </div>
        <div className="product-price-row">
          <span className="price-now">$${Number(price).toFixed(2)}</span>
          {compareAtPrice && <span className="price-was">$${Number(compareAtPrice).toFixed(2)}</span>}
          {savings > 0 && <span className="price-save">Save {savings}%</span>}
        </div>
      </div>

      <div className="product-card-foot">
        <button className="btn-atc" onClick={handleAddToCart}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Bag
        </button>
      </div>
    </Link>
  );
}