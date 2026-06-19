/* 🪵 Khashab Discover Hub View */

import { blogArticles } from '../data/articles.js';
import { woodsWiki } from '../data/woods.js';

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

export const Discover = {
  render() {
    const params = getHashParams();
    const activeTab = params.tab || '';
    const activeArticleId = params.article || '';

    // Render Full Article Details View
    if (activeArticleId) {
      const article = blogArticles.find(a => a.id === activeArticleId);
      if (!article) {
        return `
          <div class="page-container container">
            <div style="text-align: center; padding: 6rem 0;">
              <h2>Article Not Found</h2>
              <p style="color: var(--color-text-muted); margin-top: 1rem;">The article you are looking for does not exist.</p>
              <a href="#/discover" class="btn btn-primary" style="margin-top: 2rem;">Return to Discover Hub</a>
            </div>
          </div>
        `;
      }

      return `
        <div class="page-container container">
          <!-- Breadcrumbs -->
          <div class="product-breadcrumbs" style="margin-bottom: 2rem;">
            <a href="#/">Home</a> / <a href="#/discover">Discover</a> / <a href="#/discover?tab=${article.category}">${article.category === 'care' ? 'Care & Maintenance' : 'Blog'}</a> / <span>Article</span>
          </div>

          <article>
            <header class="article-detail-header">
              <span class="discover-card-badge">${article.category === 'care' ? 'Care Guide' : 'Journal'}</span>
              <h2 style="font-family: var(--font-headings); font-size: clamp(2.2rem, 5vw, 3.5rem); margin-top: 0.5rem; line-height: 1.2;">
                ${article.title}
              </h2>
              <div class="article-meta">
                Published on <strong>${article.date}</strong> by <strong>${article.author}</strong>
              </div>
            </header>

            <div class="article-hero-frame">
              <img src="${article.image || '/assets/hero.png'}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <div class="article-body-content">
              ${article.content}
              
              <div style="border-top: 1px solid var(--color-border-light); padding-top: 3rem; margin-top: 4rem; text-align: center;">
                <a href="#/discover?tab=${article.category}" class="btn btn-secondary">Back to ${article.category === 'care' ? 'Care Guides' : 'Blog'}</a>
              </div>
            </div>
          </article>
        </div>
      `;
    }

    // Render Tab Views
    if (activeTab === 'care' || activeTab === 'blog') {
      const isCare = activeTab === 'care';
      const articles = blogArticles.filter(a => a.category === activeTab);
      
      return `
        <div class="page-container container">
          <div class="section-header" style="text-align: left; margin-bottom: 3rem;">
            <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">
              ${isCare ? 'Care & Maintenance Guides' : 'Khashab Blog & News'}
            </h2>
            <p>${isCare ? 'Step-by-step articles to keep your handcrafted boards looking fresh for a lifetime.' : 'Insights, design ideas, and narratives from our woodworking journey.'}</p>
          </div>

          <!-- Category Pill Selection -->
          <div class="category-pills" style="margin-bottom: 3rem;">
            <a href="#/discover" class="category-pill">All Discover</a>
            <a href="#/discover?tab=care" class="category-pill ${isCare ? 'active' : ''}">Care & Maintenance</a>
            <a href="#/discover?tab=wiki" class="category-pill">Wood Wiki</a>
            <a href="#/discover?tab=blog" class="category-pill ${!isCare ? 'active' : ''}">Blog & News</a>
            <a href="#/discover?tab=videos" class="category-pill">Videos</a>
            <a href="#/discover?tab=faq" class="category-pill">FAQ</a>
          </div>

          <!-- Articles list grid -->
          <div class="grid grid-cols-3" style="margin-bottom: 5rem;">
            ${articles.map(art => `
              <div class="product-card" onclick="window.location.hash='#/discover?article=${art.id}'" style="cursor: pointer;">
                <div class="product-card-img-wrapper" style="padding-bottom: 45%;">
                  ${art.image 
                    ? `<img src="${art.image}" alt="${art.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">`
                    : `<div class="image-placeholder">
                        <svg class="icon" viewBox="0 0 24 24" style="width: 32px; height: 32px; margin-bottom: 0.5rem;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        <span>Read Article</span>
                      </div>`
                  }
                </div>
                <div class="product-card-info">
                  <span class="product-card-meta">${art.date} &bull; By ${art.author}</span>
                  <h3 class="product-card-title" style="font-size: 1.15rem; font-weight: 600; line-height: 1.4; margin-bottom: 0.75rem;">${art.title}</h3>
                  <p style="font-size: 0.9rem; color: var(--color-text-muted); font-weight: 300; line-height: 1.5; margin-bottom: 1.5rem;">${art.summary}</p>
                  <span class="btn-text" style="font-size: 0.8rem; margin-top: auto; align-self: flex-start;">Read Article →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'wiki') {
      return `
        <div class="page-container container">
          <div class="section-header" style="text-align: left; margin-bottom: 3rem;">
            <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">Wood Wiki & Materials</h2>
            <p>Learn about the characteristics, sourcing, and distinct advantages of the hardwoods we select.</p>
          </div>

          <!-- Category Pill Selection -->
          <div class="category-pills" style="margin-bottom: 3rem;">
            <a href="#/discover" class="category-pill">All Discover</a>
            <a href="#/discover?tab=care" class="category-pill">Care & Maintenance</a>
            <a href="#/discover?tab=wiki" class="category-pill active">Wood Wiki</a>
            <a href="#/discover?tab=blog" class="category-pill">Blog & News</a>
            <a href="#/discover?tab=videos" class="category-pill">Videos</a>
            <a href="#/discover?tab=faq" class="category-pill">FAQ</a>
          </div>

          <!-- Wood Comparison Module -->
          <div style="background-color: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2.5rem; margin-bottom: 4rem; box-shadow: 0 10px 25px rgba(0,0,0,0.01);">
            <h3 style="font-family: var(--font-headings); font-size: 1.6rem; margin-bottom: 0.5rem; font-weight: 500;">Interactive Wood Comparison</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 2rem; font-weight: 300;">Select any two premium hardwoods to inspect and compare their structural traits side-by-side.</p>
            
            <div style="display: flex; gap: 1.5rem; margin-bottom: 2rem; flex-wrap: wrap;">
              <div class="form-group" style="flex: 1; min-width: 220px;">
                <label class="form-label" for="compare-wood-1">Wood Type 1</label>
                <select id="compare-wood-1" class="form-input" style="background-color: var(--color-surface); cursor: pointer; appearance: none; background-image: url(&quot;data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem; padding-right: 2.5rem;">
                  ${woodsWiki.map(wood => `<option value="${wood.id}" ${wood.id === 'maple' ? 'selected' : ''}>${wood.name}</option>`).join('')}
                </select>
              </div>
              
              <div class="form-group" style="flex: 1; min-width: 220px;">
                <label class="form-label" for="compare-wood-2">Wood Type 2</label>
                <select id="compare-wood-2" class="form-input" style="background-color: var(--color-surface); cursor: pointer; appearance: none; background-image: url(&quot;data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem; padding-right: 2.5rem;">
                  ${woodsWiki.map(wood => `<option value="${wood.id}" ${wood.id === 'walnut' ? 'selected' : ''}>${wood.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Comparison Table -->
            <div style="overflow-x: auto; background-color: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem; min-width: 500px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--color-border); background-color: var(--color-bg-alt);">
                    <th style="padding: 1.25rem 1.5rem; font-weight: 600; width: 25%; color: var(--color-text);">Trait</th>
                    <th style="padding: 1.25rem 1.5rem; font-weight: 600; width: 37.5%; color: var(--color-accent);" id="compare-name-1">Maple</th>
                    <th style="padding: 1.25rem 1.5rem; font-weight: 600; width: 37.5%; color: var(--color-accent);" id="compare-name-2">American Walnut</th>
                  </tr>
                </thead>
                <tbody id="compare-table-body">
                  <!-- Generated dynamically via JS -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Search & Filter Controls -->
          <div class="wiki-controls" style="display: flex; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; align-items: center; justify-content: space-between; background: var(--color-bg-alt); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
            <!-- Search Input -->
            <div style="position: relative; flex: 1; min-width: 280px;">
              <svg class="icon" viewBox="0 0 24 24" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 1.1rem; height: 1.1rem; color: var(--color-text-muted); pointer-events: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="wiki-search" placeholder="Search wood by name, origin, traits..." class="form-input" style="padding-left: 2.8rem; width: 100%; border-radius: var(--radius-md); background: var(--color-surface); height: 42px; border: 1px solid var(--color-border);">
            </div>
            
            <!-- Filter Dropdowns -->
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; flex: 0 0 auto;">
              <!-- Filter by Origin Group -->
              <select id="wiki-filter-region" class="form-input" style="background-color: var(--color-surface); height: 42px; padding: 0.5rem 2.5rem 0.5rem 1rem; cursor: pointer; border-radius: var(--radius-md); border: 1px solid var(--color-border); appearance: none; background-image: url(&quot;data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem; width: 180px;">
                <option value="all">All Regions</option>
                <option value="african">African Woods</option>
                <option value="north american">North American</option>
                <option value="european">European</option>
                <option value="asian">Asian</option>
              </select>
              
              <!-- Filter by Price Tier -->
              <select id="wiki-filter-price" class="form-input" style="background-color: var(--color-surface); height: 42px; padding: 0.5rem 2.5rem 0.5rem 1rem; cursor: pointer; border-radius: var(--radius-md); border: 1px solid var(--color-border); appearance: none; background-image: url(&quot;data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 1rem center; background-size: 1rem; width: 180px;">
                <option value="all">All Prices</option>
                <option value="budget">Budget ($)</option>
                <option value="moderate">Moderate ($$ - $$$)</option>
                <option value="premium">Premium ($$$$)</option>
                <option value="exotic">Exotic & Rare ($$$$$)</option>
              </select>
            </div>
          </div>

          <div class="wiki-grid" id="wiki-cards-container">
            <!-- Rendered dynamically via JS -->
          </div>
        </div>
      `;
    }

    if (activeTab === 'videos') {
      const mockVideos = [
        { title: "Sourcing Natural Slabs", duration: "4:12", desc: "Follow our team as we select standing deadwood and sustainable oak trees from local forests." },
        { title: "End Grain Construction Magic", duration: "6:45", desc: "Watch the meticulous alignment, gluing, clamping, and cross-cutting that creates our self-healing blocks." },
        { title: "Final Polish & Conditioning", duration: "3:50", desc: "The satisfying final step: applying food-grade mineral oil and buffing local beeswax to reveal the rich wood colors." }
      ];

      return `
        <div class="page-container container">
          <div class="section-header" style="text-align: left; margin-bottom: 3rem;">
            <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">Craftsmanship Videos</h2>
            <p>Get a behind-the-scenes look at the raw process of bringing solid wood to life in our workshop.</p>
          </div>

          <!-- Category Pill Selection -->
          <div class="category-pills" style="margin-bottom: 3rem;">
            <a href="#/discover" class="category-pill">All Discover</a>
            <a href="#/discover?tab=care" class="category-pill">Care & Maintenance</a>
            <a href="#/discover?tab=wiki" class="category-pill">Wood Wiki</a>
            <a href="#/discover?tab=blog" class="category-pill">Blog & News</a>
            <a href="#/discover?tab=videos" class="category-pill active">Videos</a>
            <a href="#/discover?tab=faq" class="category-pill">FAQ</a>
          </div>

          <div class="video-grid">
            ${mockVideos.map(vid => `
              <div class="video-card">
                <div class="video-thumb-frame" onclick="alert('Playing Video: ${vid.title}. Simulated craft streaming starts.')">
                  <div class="image-placeholder" style="height: 100%; border-radius: 0;">
                    <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                  </div>
                  <div class="video-play-btn">
                    <svg class="icon icon-sm" viewBox="0 0 24 24" style="fill: currentColor; margin-left: 2px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
                <div class="video-info">
                  <h3 class="video-title">${vid.title} (${vid.duration})</h3>
                  <p class="video-desc">${vid.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'faq') {
      const faqs = [
        { q: "How often should I oil my wooden board?", a: "We recommend oiling your board once a month, or whenever it begins to look light or dry. Use USP food-grade mineral oil, never use vegetable, olive, or canola oils as they will spoil and create unpleasant odors." },
        { q: "Is the wood dishwasher safe?", a: "Absolutely not. The high heat, prolonged water contact, and harsh detergents of dishwashers will warp, expand, split, and completely ruin your wooden boards. Hand wash only with warm water and mild soap." },
        { q: "What is your return policy?", a: "Since all our wooden products are individually handcrafted from 100% natural wood, each piece is unique. If you receive a board with manufacturing defects, contact us within 14 days of delivery for a replacement or store credit." },
        { q: "Do you ship worldwide?", a: "Yes, we ship globally! Shipping rates and times are calculated automatically at checkout depending on the weight and country of delivery." }
      ];

      return `
        <div class="page-container container">
          <div class="section-header" style="text-align: left; margin-bottom: 3rem;">
            <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">Frequently Asked Questions</h2>
            <p>Find answers to common questions about wooden board care, ordering, delivery, and refund policies.</p>
          </div>

          <!-- Category Pill Selection -->
          <div class="category-pills" style="margin-bottom: 3rem;">
            <a href="#/discover" class="category-pill">All Discover</a>
            <a href="#/discover?tab=care" class="category-pill">Care & Maintenance</a>
            <a href="#/discover?tab=wiki" class="category-pill">Wood Wiki</a>
            <a href="#/discover?tab=blog" class="category-pill">Blog & News</a>
            <a href="#/discover?tab=videos" class="category-pill">Videos</a>
            <a href="#/discover?tab=faq" class="category-pill active">FAQ</a>
          </div>

          <div class="faq-container">
            <div class="product-accordions">
              ${faqs.map(faq => `
                <div class="accordion-item">
                  <button class="accordion-trigger">
                    <span>${faq.q}</span>
                    <span class="accordion-icon">▼</span>
                  </button>
                  <div class="accordion-content">
                    <div class="accordion-content-inner">
                      ${faq.a}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // DEFAULT HUB DASHBOARD (Renders cards for all 5 sub-sections)
    return `
      <div class="page-container container">
        <div class="section-header" style="text-align: left; margin-bottom: 3rem;">
          <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">Discover Khashab</h2>
          <p>Care advice, material wiki, blog logs, workshop videos, and common questions.</p>
        </div>

        <div class="discover-dashboard-grid">
          <!-- Card 1: Care & Maintenance -->
          <div class="discover-hero-card" onclick="window.location.hash='#/discover?tab=care'">
            <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
              <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
            </div>
            <div class="discover-card-overlay">
              <span class="discover-card-badge">Care & Maintenance</span>
              <h3 class="discover-card-title">How to care for wood</h3>
              <p class="discover-card-desc">Step-by-step guides on washing, drying, oiling, and buffing boards to extend their lifespan.</p>
              <span class="btn-text" style="color: #fff; border-color: #fff; font-size: 0.8rem;">Read Care Guides →</span>
            </div>
          </div>

          <!-- Card 2: Wood Wiki -->
          <div class="discover-hero-card" onclick="window.location.hash='#/discover?tab=wiki'">
            <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
              <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
            </div>
            <div class="discover-card-overlay">
              <span class="discover-card-badge">Wood Wiki</span>
              <h3 class="discover-card-title">Hardwood Sourcing</h3>
              <p class="discover-card-desc">Detailed guides explaining the densities, colors, grains, and advantages of Walnut, Oak, and Maple.</p>
              <span class="btn-text" style="color: #fff; border-color: #fff; font-size: 0.8rem;">Explore Sourcing Wiki →</span>
            </div>
          </div>

          <!-- Card 3: Blog & News -->
          <div class="discover-hero-card" onclick="window.location.hash='#/discover?tab=blog'">
            <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
              <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="discover-card-overlay">
              <span class="discover-card-badge">Blog & News</span>
              <h3 class="discover-card-title">The Craftsmanship Log</h3>
              <p class="discover-card-desc">Narratives, kitchen board designs, and woodcraft journal logs from our workshop team.</p>
              <span class="btn-text" style="color: #fff; border-color: #fff; font-size: 0.8rem;">Read Journal →</span>
            </div>
          </div>

          <!-- Card 4: Videos & FAQ (Combined or Videos) -->
          <div class="discover-hero-card" onclick="window.location.hash='#/discover?tab=videos'">
            <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
              <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px;"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            </div>
            <div class="discover-card-overlay">
              <span class="discover-card-badge">Videos & FAQ</span>
              <h3 class="discover-card-title">Workshop Craft Videos</h3>
              <p class="discover-card-desc">Watch our craftsmen select raw hardwood logs, glue end-grain blocks, and polish board finishes.</p>
              <span class="btn-text" style="color: #fff; border-color: #fff; font-size: 0.8rem;">Watch Workshop Videos →</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);

    // Wood comparison interactive logic (wiki tab)
    const wood1Select = document.getElementById('compare-wood-1');
    const wood2Select = document.getElementById('compare-wood-2');
    const name1Text = document.getElementById('compare-name-1');
    const name2Text = document.getElementById('compare-name-2');
    const tableBody = document.getElementById('compare-table-body');

    if (wood1Select && wood2Select && tableBody) {
      const updateComparison = () => {
        const id1 = wood1Select.value;
        const id2 = wood2Select.value;
        
        const w1 = woodsWiki.find(w => w.id === id1);
        const w2 = woodsWiki.find(w => w.id === id2);
        
        if (!w1 || !w2) return;

        if (name1Text) name1Text.innerText = w1.name;
        if (name2Text) name2Text.innerText = w2.name;

        const rows = [
          { label: "Scientific Name", val1: w1.scientific, val2: w2.scientific, italic: true },
          { label: "Geographic Origin", val1: w1.origin, val2: w2.origin },
          { label: "Classification", val1: w1.type, val2: w2.type },
          { label: "Price Range", val1: w1.price, val2: w2.price },
          { label: "Natural Color", val1: w1.color, val2: w2.color },
          { label: "Hardness & Durability", val1: w1.durability, val2: w2.durability },
          { label: "Grain Pattern", val1: w1.grain, val2: w2.grain },
          { label: "Best Uses", val1: w1.bestFor, val2: w2.bestFor },
          { label: "Care Suggestion", val1: w1.careTip, val2: w2.careTip }
        ];

        tableBody.innerHTML = rows.map(row => `
          <tr style="border-bottom: 1px solid var(--color-border-light);">
            <td style="padding: 1rem 1.5rem; font-weight: 500; background-color: var(--color-bg-alt); font-size: 0.85rem; text-transform: uppercase; color: var(--color-text-muted);">${row.label}</td>
            <td style="padding: 1rem 1.5rem; font-weight: 300; font-size: 0.95rem; ${row.italic ? 'font-style: italic;' : ''}">${row.val1}</td>
            <td style="padding: 1rem 1.5rem; font-weight: 300; font-size: 0.95rem; ${row.italic ? 'font-style: italic;' : ''}">${row.val2}</td>
          </tr>
        `).join('');
      };

      wood1Select.addEventListener('change', updateComparison);
      wood2Select.addEventListener('change', updateComparison);
      updateComparison();
    }

    // Wood Wiki Search and Filter logic
    const wikiSearch = document.getElementById('wiki-search');
    const wikiFilterRegion = document.getElementById('wiki-filter-region');
    const wikiFilterPrice = document.getElementById('wiki-filter-price');
    const wikiCardsContainer = document.getElementById('wiki-cards-container');

    if (wikiCardsContainer) {
      const renderWikiCards = (filtered) => {
        if (filtered.length === 0) {
          return `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--color-bg-alt); border-radius: var(--radius-lg); border: 1px dashed var(--color-border);">
              <svg class="icon" viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke-width: 1.2; color: var(--color-text-muted); margin-bottom: 1rem; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round;"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <h3 style="font-family: var(--font-headings); font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem;">No materials match your search or filters</h3>
              <p style="color: var(--color-text-muted); font-size: 0.9rem; font-weight: 300;">Try typing a different keyword or changing the region/price selectors.</p>
            </div>
          `;
        }

        return filtered.map(wood => `
          <div class="wiki-card">
            <div class="wiki-card-left">
              <div class="wiki-color-swatch" style="background: ${wood.swatch}"></div>
              <div>
                <h3 class="wiki-card-title">${wood.name}</h3>
                <span class="wiki-scientific">${wood.scientific}</span>
              </div>
              <div class="wiki-specs-badge-group">
                <div class="wiki-spec-badge">
                  <span class="badge-label">Origin</span>
                  <span class="badge-value">${wood.origin}</span>
                </div>
                <div class="wiki-spec-badge">
                  <span class="badge-label">Classification</span>
                  <span class="badge-value">${wood.type}</span>
                </div>
                <div class="wiki-spec-badge">
                  <span class="badge-label">Price Range</span>
                  <span class="badge-value price-tier">${wood.price}</span>
                </div>
              </div>
            </div>
            
            <div class="wiki-attrs">
              <p style="color: var(--color-text-muted); font-size: 1.05rem; line-height: 1.8; margin-bottom: 3.5rem; font-weight: 300;">${wood.description}</p>
              
              <div class="wiki-attr-row">
                <span class="wiki-attr-label">Natural Hue</span>
                <span class="wiki-attr-val">${wood.color}</span>
              </div>
              <div class="wiki-attr-row">
                <span class="wiki-attr-label">Durability & Hardness</span>
                <span class="wiki-attr-val">${wood.durability}</span>
              </div>
              <div class="wiki-attr-row">
                <span class="wiki-attr-label">Grain Structure</span>
                <span class="wiki-attr-val">${wood.grain}</span>
              </div>
              <div class="wiki-attr-row">
                <span class="wiki-attr-label">Best Applications</span>
                <span class="wiki-attr-val">${wood.bestFor}</span>
              </div>
              <div class="wiki-attr-row">
                <span class="wiki-attr-label">Care Recommendation</span>
                <span class="wiki-attr-val">${wood.careTip}</span>
              </div>
            </div>
          </div>
        `).join('');
      };

      const updateWikiGrid = () => {
        const query = wikiSearch ? wikiSearch.value.toLowerCase().trim() : '';
        const region = wikiFilterRegion ? wikiFilterRegion.value : 'all';
        const price = wikiFilterPrice ? wikiFilterPrice.value : 'all';

        const filtered = woodsWiki.filter(wood => {
          // Search query match
          const matchesSearch = !query || 
            wood.name.toLowerCase().includes(query) ||
            wood.scientific.toLowerCase().includes(query) ||
            wood.origin.toLowerCase().includes(query) ||
            wood.bestFor.toLowerCase().includes(query) ||
            wood.description.toLowerCase().includes(query);

          // Region filter match
          let matchesRegion = true;
          if (region !== 'all') {
            const originLower = wood.origin.toLowerCase();
            if (region === 'african') {
              matchesRegion = originLower.includes('african') || originLower.includes('madagascar') || originLower.includes('tunisian');
            } else if (region === 'north american') {
              matchesRegion = originLower.includes('north american') || originLower.includes('american');
            } else if (region === 'european') {
              matchesRegion = originLower.includes('european');
            } else if (region === 'asian') {
              matchesRegion = originLower.includes('asian') || originLower.includes('burmese');
            }
          }

          // Price filter match
          let matchesPrice = true;
          if (price !== 'all') {
            const priceText = wood.price.toLowerCase();
            if (price === 'budget') {
              matchesPrice = priceText.startsWith('$ ') && !priceText.includes('$$');
            } else if (price === 'moderate') {
              matchesPrice = priceText.includes('$$') && !priceText.includes('$$$$');
            } else if (price === 'premium') {
              matchesPrice = priceText.includes('$$$$') && !priceText.includes('$$$$$');
            } else if (price === 'exotic') {
              matchesPrice = priceText.includes('$$$$$');
            }
          }

          return matchesSearch && matchesRegion && matchesPrice;
        });

        wikiCardsContainer.innerHTML = renderWikiCards(filtered);
      };

      if (wikiSearch) wikiSearch.addEventListener('input', updateWikiGrid);
      if (wikiFilterRegion) wikiFilterRegion.addEventListener('change', updateWikiGrid);
      if (wikiFilterPrice) wikiFilterPrice.addEventListener('change', updateWikiGrid);

      // Perform initial render
      updateWikiGrid();
    }

    // Collapsible Accordion logic (for FAQ tab)
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const item = trig.closest('.accordion-item');
        item.classList.toggle('active');
      });
    });
  }
};
