import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  const results = query.trim().length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || (p.category || '').toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const TRENDING = ['Drawing Robot', 'STEM Kit', 'Building Blocks', 'Puzzle Sets'];

  return (
    <div className={`search-overlay${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:'var(--text-muted)',flexShrink:0}}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Search for toys, age groups, interests…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-close" onClick={onClose} aria-label="Close search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div className="search-suggestions">
        {results.length > 0 ? (
          <>
            <p style={{fontSize:'.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:'var(--text-muted)',marginBottom:'.75rem'}}>Results</p>
            {results.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} onClick={onClose} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'.75rem',borderRadius:'var(--r-md)',transition:'background var(--t-fast)'}}>
                <img src={p.images?.[0] || p.image} alt={p.name} style={{width:48,height:48,objectFit:'cover',borderRadius:'var(--r-sm)',background:'var(--bg-subtle)'}}/>
                <div>
                  <p style={{fontWeight:600,color:'var(--ink-navy)',fontSize:'.9375rem'}}>{p.name}</p>
                  <p style={{fontSize:'.8rem',color:'var(--text-muted)'}}>$${p.price}</p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <p style={{fontSize:'.75rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:'var(--text-muted)',marginBottom:'.75rem'}}>Trending</p>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {TRENDING.map(t => (
                <button key={t} onClick={() => setQuery(t)} style={{padding:'.375rem .875rem',background:'var(--bg-subtle)',border:'none',borderRadius:'var(--r-pill)',fontSize:'.8rem',fontWeight:500,cursor:'pointer',color:'var(--text-secondary)'}}>
                  {t}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}