import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Home() {
  const bestSellers = productsData.slice(0, 4);
  const findFavorite = productsData.slice(4, 12);

  return (
    <>
      <section className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          <div className="hero-content">
            <h1>Curiosity,<br/>meet play.</h1>
            <p>Hands-on, screen-free experiences designed to turn "I don't know" into "Look what I made!"</p>
            <Link to="/collections/best-sellers" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.25rem' }}>
              Shop Best Sellers
            </Link>
          </div>
          <div style={{ flex: 1, maxWidth: '500px', display: 'flex', justifyContent: 'center' }}>
            {/* The primary ToddsIQ hero product from Stitch, here represented by a featured image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1', backgroundColor: 'var(--bg-creative)', borderRadius: '50%', padding: '2rem' }}>
              <img src={productsData[0]?.images[0]} alt="Hero Product" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transform: 'scale(1.2)' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-8">
        <div className="text-center">
          <h2 className="section-title">THEY KEEP COMING BACK FOR THESE.</h2>
          <p className="section-subtitle">Screen-free favorites designed to turn curiosity into hands-on play.</p>
        </div>
        <div className="product-grid">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/collections/best-sellers" className="btn btn-outline">
            View All Best Sellers <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="container mb-8" style={{ marginTop: '6rem' }}>
        <div className="text-center">
          <h2 className="section-title">FIND THEIR NEXT FAVORITE</h2>
          <p className="section-subtitle">A curated selection of our most engaging experiences across all categories.</p>
        </div>
        <div className="product-grid">
          {findFavorite.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <section style={{ backgroundColor: 'var(--bg-learning)', padding: '6rem 0', margin: '4rem 0 0', borderRadius: '48px 48px 0 0' }}>
        <div className="container text-center">
          <h2 className="section-title">Built for Real Play</h2>
          <p className="section-subtitle">No screens. No subscriptions. Just high-quality tools that let kids be kids.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Brain-Building</h3>
              <p style={{ color: 'var(--color-text-light)' }}>Develops spatial reasoning, logic, and creative problem solving naturally.</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔋</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Long-Lasting</h3>
              <p style={{ color: 'var(--color-text-light)' }}>Premium materials designed to survive real play and be passed down.</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✨</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Open-Ended</h3>
              <p style={{ color: 'var(--color-text-light)' }}>There's no wrong way to play. We provide the tools, they provide the imagination.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
