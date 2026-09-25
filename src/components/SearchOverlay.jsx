import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const matches = productsData.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.categories && p.categories.some(c => c.toLowerCase().includes(q)))
      );
      setResults(matches);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (slug) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  if (!isSearchOpen) return null;

  return (
    <div className={`search-overlay ${isSearchOpen ? 'open' : ''}`}>
      <button className="search-close btn-icon" onClick={() => setIsSearchOpen(false)}>
        <X size={32} />
      </button>
      <div className="search-input-wrap">
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search for toys, categories..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search size={32} style={{ position: 'absolute', right: 0, top: '1.2rem', color: 'var(--color-text-muted)' }} />
      </div>

      <div className="search-results">
        {results.length > 0 && (
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
            {results.map(prod => (
              <div key={prod.id} style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleProductClick(prod.slug)}>
                <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
                  <img src={prod.thumbnail} alt={prod.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'contain' }} />
                </div>
                <h4 style={{ fontWeight: 700 }}>{prod.name}</h4>
                <div style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>${prod.price}</div>
              </div>
            ))}
          </div>
        )}
        {query.length > 1 && results.length === 0 && (
          <div className="text-center mt-8">
            <h3 style={{ color: 'var(--color-text-muted)' }}>No results found for "{query}"</h3>
          </div>
        )}
      </div>
    </div>
  );
}
