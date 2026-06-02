/* 🪵 Khashab Store View */

import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { ProductCard } from '../components/product-card.js';

// Parse query params from the hash URL
function getHashParams() {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return {};
  
  const queryStr = hash.slice(qIndex + 1);
  const pairs = queryStr.split('&');
  const params = {};
  pairs.forEach(pair => {
    const [key, val] = pair.split('=');
    params[key] = decodeURIComponent(val || '');
  });
  return params;
}

export const Store = {
  render() {
    const params = getHashParams();
    const activeCategory = params.category || 'all';
    const searchQuery = params.search || '';

    return `
      <div class="page-container container">
        
        <!-- Seasonal Collection Spotlight with Countdown -->
        <section class="store-promo-banner">
          <div class="promo-content">
            <span class="promo-badge">Limited Edition</span>
            <h3>The Olive Wood Collection</h3>
            <p>Carved from centuries-old, sustainably sourced Tunisian olive trees. Extremely rich grains, highly limited stock.</p>
          </div>
          
          <div class="promo-countdown" id="promo-countdown">
            <div class="countdown-box">
              <span class="countdown-num" id="cd-days">02</span>
              <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-box">
              <span class="countdown-num" id="cd-hours">14</span>
              <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-box">
              <span class="countdown-num" id="cd-mins">35</span>
              <span class="countdown-label">Mins</span>
            </div>
            <div class="countdown-box">
              <span class="countdown-num" id="cd-secs">48</span>
              <span class="countdown-label">Secs</span>
            </div>
          </div>
        </section>

        <!-- Store Header & Top Bar -->
        <div class="store-top-bar">
          <div>
            <h2 style="font-family: var(--font-headings); font-size: 2.2rem; font-weight: 500;">
              ${searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Our Shop'}
            </h2>
            <p class="store-info-count" id="store-item-count">Showing 0 products</p>
          </div>

          <!-- Sorting Selector -->
          <div class="sort-container">
            <label for="store-sort" class="sort-label">Sort by:</label>
            <select id="store-sort" class="sort-select">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Average Rating</option>
            </select>
          </div>
        </div>

        <!-- Horizontal Category Pills -->
        <div class="category-pills">
          <button class="category-pill ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">All Products</button>
          ${categories.map(cat => `
            <button class="category-pill ${activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Main Store Layout -->
        <div class="store-container">
          <!-- Sidebar Filters -->
          <aside class="store-sidebar">
            <!-- Filter by Wood Type -->
            <div class="filter-group">
              <h4 class="filter-title">Wood Type</h4>
              <ul class="filter-list">
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Walnut" class="filter-checkbox filter-wood">
                    Walnut
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Oak" class="filter-checkbox filter-wood">
                    Oak
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Maple" class="filter-checkbox filter-wood">
                    Maple
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Olive Wood" class="filter-checkbox filter-wood">
                    Olive Wood
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Teak" class="filter-checkbox filter-wood">
                    Teak
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Sapele" class="filter-checkbox filter-wood">
                    Sapele
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Wenge" class="filter-checkbox filter-wood">
                    Wenge
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Padauk" class="filter-checkbox filter-wood">
                    Padauk
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="Zebrawood" class="filter-checkbox filter-wood">
                    Zebrawood
                  </label>
                </li>
              </ul>
            </div>

            <!-- Filter by Price -->
            <div class="filter-group">
              <h4 class="filter-title">Price Range</h4>
              <ul class="filter-list">
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="under-50" class="filter-checkbox filter-price">
                    Under $50
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="50-100" class="filter-checkbox filter-price">
                    $50 to $100
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="100-150" class="filter-checkbox filter-price">
                    $100 to $150
                  </label>
                </li>
                <li>
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="over-150" class="filter-checkbox filter-price">
                    $150 & Above
                  </label>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Product Listing Grid -->
          <div class="store-content">
            <!-- Active filter tags display -->
            <div class="active-filters" id="active-filter-tags" style="display: none;"></div>

            <div class="grid grid-cols-3" id="store-products-grid">
              <!-- Rendered via JavaScript -->
            </div>
            
            <div class="store-empty" id="store-empty-state" style="display: none;">
              <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <h3>No products found</h3>
              <p>Try resetting your filters or adjusting your search query.</p>
              <button class="btn btn-primary" id="btn-reset-filters">Clear All Filters</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);
    
    // Setup Countdown Timer
    this.initCountdown();

    // Setup filtering and rendering state
    this.setupFiltering();
  },

  initCountdown() {
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');
    
    if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

    // Set end date to 2 days 14 hours 35 minutes from now for demonstration
    const endTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (35 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = endTime - now;
      
      if (diff <= 0) {
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      cdDays.innerText = String(days).padStart(2, '0');
      cdHours.innerText = String(hours).padStart(2, '0');
      cdMins.innerText = String(mins).padStart(2, '0');
      cdSecs.innerText = String(secs).padStart(2, '0');
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Clear interval when switching pages (handled by router reload, but good habit)
    window.addEventListener('hashchange', () => clearInterval(timerInterval), { once: true });
  },

  setupFiltering() {
    const pills = document.querySelectorAll('.category-pill');
    const woodCheckboxes = document.querySelectorAll('.filter-wood');
    const priceCheckboxes = document.querySelectorAll('.filter-price');
    const sortSelect = document.getElementById('store-sort');
    const resetBtn = document.getElementById('btn-reset-filters');
    const activeFiltersBar = document.getElementById('active-filter-tags');

    // Parse state from URL
    const params = getHashParams();
    let currentCategory = params.category || 'all';
    let searchQuery = params.search || '';
    
    // Filter variables
    let selectedWoods = [];
    let selectedPrices = [];
    let currentSort = 'featured';

    const filterAndRender = () => {
      let filtered = [...products];

      // 1. Category Filter
      if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
      }

      // 2. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.woodType.toLowerCase().includes(query)
        );
      }

      // 3. Wood Type Filter
      if (selectedWoods.length > 0) {
        filtered = filtered.filter(p => 
          selectedWoods.some(wood => {
            const wLower = wood.toLowerCase();
            const mainMatches = p.woodType.toLowerCase().includes(wLower);
            const listMatches = p.woods && p.woods.some(w => w.toLowerCase().includes(wLower));
            return mainMatches || listMatches;
          })
        );
      }

      // 4. Price Filter
      if (selectedPrices.length > 0) {
        filtered = filtered.filter(p => {
          return selectedPrices.some(priceRange => {
            if (priceRange === 'under-50') return p.price < 50;
            if (priceRange === '50-100') return p.price >= 50 && p.price <= 100;
            if (priceRange === '100-150') return p.price >= 100 && p.price <= 150;
            if (priceRange === 'over-150') return p.price > 150;
            return true;
          });
        });
      }

      // 5. Sorting
      if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else {
        // 'featured' - keep original catalog sorting order, but prefer featured products first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      // Render items
      const grid = document.getElementById('store-products-grid');
      const emptyState = document.getElementById('store-empty-state');
      const itemCountText = document.getElementById('store-item-count');

      if (itemCountText) {
        itemCountText.innerText = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
      }

      if (filtered.length === 0) {
        if (grid) grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        if (grid) {
          grid.style.display = 'grid';
          grid.innerHTML = filtered.map(p => ProductCard.render(p)).join('');
          ProductCard.setupListeners(grid, products);
        }
      }

      this.renderActiveFilterTags(selectedWoods, selectedPrices, () => {
        // Reset callback
        woodCheckboxes.forEach(cb => cb.checked = false);
        priceCheckboxes.forEach(cb => cb.checked = false);
        selectedWoods = [];
        selectedPrices = [];
        filterAndRender();
      });
    };

    // Category Pill clicks
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.cat;
        
        // Update URL hash parameter silently without page reload triggers
        const newHash = currentCategory === 'all' 
          ? `#/store` 
          : `#/store?category=${currentCategory}`;
        
        window.history.pushState(null, '', newHash);
        
        filterAndRender();
      });
    });

    // Checkbox Listeners
    woodCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        selectedWoods = Array.from(woodCheckboxes)
          .filter(c => c.checked)
          .map(c => c.value);
        filterAndRender();
      });
    });

    priceCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        selectedPrices = Array.from(priceCheckboxes)
          .filter(c => c.checked)
          .map(c => c.value);
        filterAndRender();
      });
    });

    // Sorting select listener
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndRender();
      });
    }

    // Reset button inside empty state
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        woodCheckboxes.forEach(cb => cb.checked = false);
        priceCheckboxes.forEach(cb => cb.checked = false);
        selectedWoods = [];
        selectedPrices = [];
        currentCategory = 'all';
        searchQuery = '';
        
        pills.forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
        window.history.pushState(null, '', `#/store`);
        
        filterAndRender();
      });
    }

    // Initial Filter Run
    filterAndRender();
  },

  renderActiveFilterTags(woods, prices, clearAllCallback) {
    const container = document.getElementById('active-filter-tags');
    if (!container) return;

    if (woods.length === 0 && prices.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'flex';
    
    let tagsHTML = '';
    woods.forEach(wood => {
      tagsHTML += `
        <span class="filter-tag">
          Wood: ${wood}
        </span>
      `;
    });

    prices.forEach(price => {
      let label = '';
      if (price === 'under-50') label = 'Under $50';
      if (price === '50-100') label = '$50 - $100';
      if (price === '100-150') label = '$100 - $150';
      if (price === 'over-150') label = '$150 & Above';
      
      tagsHTML += `
        <span class="filter-tag">
          Price: ${label}
        </span>
      `;
    });

    tagsHTML += `
      <button class="btn-text" id="btn-clear-tags" style="font-size: 0.75rem; text-decoration: none; margin-left: 0.5rem; border: none; outline: none;">
        Clear All
      </button>
    `;

    container.innerHTML = tagsHTML;

    // Hook up clear all tag button
    const clearBtn = document.getElementById('btn-clear-tags');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAllCallback);
    }
  }
};
