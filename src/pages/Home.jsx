import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Award, RefreshCcw, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import heroImage from '../assets/hero_toys_banner.jpg';

export default function Home() {
  const bestSellers = productsData.slice(0, 4);
  const findFavorite = productsData.slice(4, 12);

  return (
    <>
      <section className="toddsiq-hero">
        <div className="container">
          <div className="toddsiq-hero-inner">
            <div className="hero-left">
              <div className="hero-badge-kicker">✨ NEW ARRIVALS 2026</div>
              <h1 className="hero-title">Screen-Free Play That Powers <span>Little Minds</span>.</h1>
              <p className="hero-desc">
                Ditch the tablets. Our premium, durable toys are designed by educators to spark curiosity, build spatial reasoning, and provide hours of open-ended fun.
              </p>
              
              <div className="hero-actions">
                <Link to="/collections/best-sellers" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.125rem' }}>
                  Shop Best Sellers
                </Link>
                <Link to="/collections/stem-science" className="btn btn-outline" style={{ padding: '16px 32px', fontSize: '1.125rem', borderColor: '#e0e0e0', color: 'var(--color-text-main)' }}>
                  Take the Quiz
                </Link>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <strong>50k+</strong>
                  <span>Happy Parents</span>
                </div>
                <div className="stat-item">
                  <strong>4.9/5</strong>
                  <span>Average Rating</span>
                </div>
                <div className="stat-item">
                  <strong>100%</strong>
                  <span>Kid Approved</span>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <img src={heroImage} alt="Hero Toys" className="hero-main-image" />
                
                {/* Floating Elements */}
                <div className="floating-card top-right">
                  <div className="float-icon">🏆</div>
                  <div className="float-text">
                    <strong>Award Winning</strong>
                    <span>STEM Toys</span>
                  </div>
                </div>
                
                <div className="floating-card bottom-left">
                  <div className="float-icon">🧠</div>
                  <div className="float-text">
                    <strong>Brain Building</strong>
                    <span>Logic & Math</span>
                  </div>
                </div>
                
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-bar">
        <div className="container features-grid">
          <div className="feature-item">
            <Truck size={32} strokeWidth={1.5} className="feature-icon" />
            <div className="feature-text">
              <span className="feature-title">FREE SHIPPING</span>
              <span className="feature-desc">On Orders Over $59</span>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={32} strokeWidth={1.5} className="feature-icon" />
            <div className="feature-text">
              <span className="feature-title">SECURE PAYMENT</span>
              <span className="feature-desc">100% Safe & Secure</span>
            </div>
          </div>
          <div className="feature-item">
            <Award size={32} strokeWidth={1.5} className="feature-icon" />
            <div className="feature-text">
              <span className="feature-title">PREMIUM QUALITY</span>
              <span className="feature-desc">Safe & Non-Toxic</span>
            </div>
          </div>
          <div className="feature-item">
            <RefreshCcw size={32} strokeWidth={1.5} className="feature-icon" />
            <div className="feature-text">
              <span className="feature-title">EASY RETURNS</span>
              <span className="feature-desc">30-Day Hassle Free Returns</span>
            </div>
          </div>
          <div className="feature-item">
            <Headphones size={32} strokeWidth={1.5} className="feature-icon" />
            <div className="feature-text">
              <span className="feature-title">CUSTOMER SUPPORT</span>
              <span className="feature-desc">We're Here To Help</span>
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
