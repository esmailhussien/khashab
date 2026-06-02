/* 🪵 Khashab Homepage View */

import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { ProductCard } from '../components/product-card.js';

export const Home = {
  render() {
    // Get featured items
    const featuredProducts = products.filter(p => p.featured);
    
    // Pick 3 representative categories for homepage grid (Cutting Boards, Butcher Blocks, Plates)
    const featuredCats = categories.filter(c => ['cutting-serving', 'butcher-blocks', 'plates'].includes(c.id));

    return `
      <div class="page-container">
        <!-- Hero Section -->
        <section class="hero">
          <div class="container hero-grid">
            <div class="hero-content">
              <span class="hero-badge">Artisanal Woodcraft</span>
              <h2>Crafted by nature.<br>Refined by hand.</h2>
              <p class="hero-desc">
                100% natural, hand-finished wooden boards and home accessories designed to bring organic warmth and lifetime durability to your modern kitchen.
              </p>
              <div class="hero-actions">
                <a href="#/store" class="btn btn-primary">Explore The Store</a>
                <a href="#/our-story" class="btn btn-secondary">Our Story</a>
              </div>
            </div>
            
            <div class="hero-image-frame">
              <!-- Using the premium restored image -->
              <img src="/assets/hero.png" alt="Khashab Premium Wooden Boards" class="hero-img">
            </div>
          </div>
        </section>

        <!-- Category Grid Showcase -->
        <section class="section category-section">
          <div class="container">
            <div class="section-header reveal-on-scroll reveal-slide-up">
              <h2>Elegance in Every Detail</h2>
              <p>Explore our thoughtfully curated collections of functional kitchen art and tablewares.</p>
            </div>
            
            <div class="grid grid-cols-3">
              ${featuredCats.map(cat => `
                <div class="category-card reveal-on-scroll reveal-slide-up stagger-item" onclick="window.location.hash='#/store?category=${cat.id}'">
                  <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke-width: 1.2;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                    <span style="font-size: 0.9rem; font-weight: 500; margin-top: 1rem; color: var(--color-text);">${cat.name}</span>
                  </div>
                  <div class="category-card-overlay">
                    <h3 class="category-title">${cat.name}</h3>
                    <span class="category-link">Shop Collection →</span>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 3rem;" class="reveal-on-scroll reveal-fade">
              <a href="#/store" class="btn btn-text">View All 6 Categories</a>
            </div>
          </div>
        </section>

        <!-- Featured Bestsellers Carousel -->
        <section class="section featured-section">
          <div class="container">
            <div class="section-header reveal-on-scroll reveal-slide-up">
              <h2>The Bestsellers</h2>
              <p>Hand-selected pieces loved by professional chefs and home cooks alike.</p>
            </div>
            
            <div class="featured-carousel-wrapper reveal-on-scroll reveal-fade">
              <div class="featured-carousel" id="featured-carousel">
                ${featuredProducts.map(product => ProductCard.render(product)).join('')}
              </div>
              
              <!-- Slider Controls -->
              <div class="carousel-controls">
                <button class="carousel-btn" id="carousel-prev" aria-label="Previous Featured Product">
                  <svg class="icon" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="carousel-btn" id="carousel-next" aria-label="Next Featured Product">
                  <svg class="icon" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);
    
    const carousel = document.getElementById('featured-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    // Horizontal Scroll Logic for Carousel
    if (carousel && prevBtn && nextBtn) {
      const scrollAmount = 320; // width of card + gap
      
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    // Set up product card event listeners
    const main = document.querySelector('main');
    const featuredProducts = products.filter(p => p.featured);
    if (main) {
      ProductCard.setupListeners(main, featuredProducts);
    }
  }
};
