import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Award, RefreshCcw, Headphones, Sparkles, Trophy, Brain, Palette, Star, Bot, BatteryCharging, Infinity } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import heroImage from '../assets/hero_toys_banner.jpg';
import creativePotentialImg from '../assets/creative_potential_robot.jpg';
import drawingCompanionImg from '../assets/drawing_companion_robot.jpg';

export default function Home() {
  const bestSellers = productsData.slice(0, 4);
  const findFavorite = productsData.slice(4, 12);

  return (
    <>
      <section className="toddsiq-hero">
        <div className="container">
          <div className="toddsiq-hero-inner">
            <div className="hero-left">
              <div className="hero-badge-kicker">
                <Sparkles size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-top' }} /> 
                NEW ARRIVALS 2026
              </div>
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
                  <div className="float-icon"><Trophy size={20} color="var(--color-text-main)" /></div>
                  <div className="float-text">
                    <strong>Award Winning</strong>
                    <span>STEM Toys</span>
                  </div>
                </div>
                
                <div className="floating-card bottom-left">
                  <div className="float-icon"><Brain size={20} color="var(--color-text-main)" /></div>
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

      <section className="trust-badges-section">
        <div className="container">
          <div className="trust-badges-grid">
            <div className="trust-badge">
              <div className="trust-icon-wrap" style={{ backgroundColor: 'var(--bg-creative)' }}>
                <Truck size={24} strokeWidth={2} color="var(--color-primary)" />
              </div>
              <h4 className="trust-title">Free Shipping</h4>
              <p className="trust-desc">On orders over $59</p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon-wrap" style={{ backgroundColor: 'var(--bg-sensory)' }}>
                <ShieldCheck size={24} strokeWidth={2} color="#10B981" />
              </div>
              <h4 className="trust-title">Secure Payment</h4>
              <p className="trust-desc">100% Safe & Secure</p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon-wrap" style={{ backgroundColor: 'var(--bg-learning)' }}>
                <Award size={24} strokeWidth={2} color="#06B6D4" />
              </div>
              <h4 className="trust-title">Premium Quality</h4>
              <p className="trust-desc">Safe & Non-Toxic</p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon-wrap" style={{ backgroundColor: 'var(--bg-active)' }}>
                <RefreshCcw size={24} strokeWidth={2} color="#F59E0B" />
              </div>
              <h4 className="trust-title">Easy Returns</h4>
              <p className="trust-desc">30-Day Hassle Free</p>
            </div>
            
            <div className="trust-badge">
              <div className="trust-icon-wrap" style={{ backgroundColor: 'var(--bg-building)' }}>
                <Headphones size={24} strokeWidth={2} color="#8B5CF6" />
              </div>
              <h4 className="trust-title">24/7 Support</h4>
              <p className="trust-desc">We're here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Split Content Section 1 */}
      <section className="creative-section section-1 mb-8">
        <div className="container">
          <div className="creative-inner">
            <div className="creative-text">
              <div className="creative-icon-wrap">
                <Sparkles size={28} color="var(--color-primary)" className="pulse-anim" />
              </div>
              <h2 className="creative-title">The Secret to Unlocking Your Child's <span className="highlight">Creative Potential</span></h2>
              <p className="creative-desc">
                When kids struggle with drawing, it can lower their confidence and hold back their imagination. ToddsIQ™ helps by guiding their hands through fun and engaging illustrations — boosting their artistic confidence with every sketch.
              </p>
              <Link to="/products/drawing-robot" className="btn btn-primary creative-btn">
                Shop Now <ArrowRight size={18} />
              </Link>
            </div>
            <div className="creative-image-wrap">
              <div className="blob-shape blob-1"></div>
              <div className="blob-shape blob-2"></div>
              <img src={creativePotentialImg} alt="Child drawing with robot" className="creative-image img-blob-1" />
              {/* Floating vector icons */}
              <div className="floating-vector fv-1">
                <Star size={48} color="#FF9F43" fill="#FF9F43" />
              </div>
              <div className="floating-vector fv-2">
                <Palette size={48} color="#10B981" fill="#10B981" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Split Content Section 2 */}
      <section className="creative-section section-2 mb-8">
        <div className="container">
          <div className="creative-inner reverse">
            <div className="creative-text">
              <div className="creative-icon-wrap bg-white">
                <Palette size={28} color="var(--color-primary)" className="bounce-anim" />
              </div>
              <h2 className="creative-title">ToddsIQ™ – Your Child's <span className="highlight-2">Creative Companion!</span></h2>
              <p className="creative-desc">
                Using smart technology and adorable design, ToddsIQ™ transforms screen time into creative time. It helps kids bring their ideas to life, guiding them through step-by-step drawings with incredible accuracy.
              </p>
              <Link to="/products/drawing-robot" className="btn btn-primary creative-btn">
                Shop Now <ArrowRight size={18} />
              </Link>
            </div>
            <div className="creative-image-wrap">
               <div className="blob-shape blob-3"></div>
              <img src={drawingCompanionImg} alt="ToddsIQ drawing robot" className="creative-image img-blob-2" />
              {/* Floating vector icons */}
              <div className="floating-vector fv-3">
                <Bot size={48} color="#3B82F6" fill="#3B82F6" />
              </div>
              <div className="floating-vector fv-4">
                <Sparkles size={64} color="#F59E0B" fill="#F59E0B" />
              </div>
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
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container text-center">
          <h2 className="section-title">Built for <span className="highlight">Real Play</span></h2>
          <p className="section-subtitle">No screens. No subscriptions. Just high-quality tools that let kids be kids.</p>
          
          <div className="play-features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap icon-brain">
                <Brain size={40} color="var(--color-primary)" fill="rgba(255,107,107,0.2)" className="pulse-anim" />
              </div>
              <h3 className="feature-title">Brain-Building</h3>
              <p className="feature-desc">Develops spatial reasoning, logic, and creative problem solving naturally.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrap icon-battery">
                <BatteryCharging size={40} color="#10B981" fill="rgba(16,185,129,0.2)" className="bounce-anim" />
              </div>
              <h3 className="feature-title">Long-Lasting</h3>
              <p className="feature-desc">Premium materials designed to survive real play and be passed down.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrap icon-infinity">
                <Infinity size={40} color="#3B82F6" className="spin-anim-slow" />
              </div>
              <h3 className="feature-title">Open-Ended</h3>
              <p className="feature-desc">There's no wrong way to play. We provide the tools, they provide the imagination.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
