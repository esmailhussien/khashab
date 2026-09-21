/* 🪵 Khashab Wishlist Page View */

import { products } from '../data/products.js';
import { wishlist } from '../utils/wishlist.js';
import { ProductCard } from '../components/product-card.js';

export const Wishlist = {
  render() {
    const list = wishlist.get();
    const favProducts = products.filter(p => list.includes(p.id));

    if (favProducts.length === 0) {
      return `
        <div class="page-container container">
          <div class="wishlist-empty-state">
            <svg class="icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <h3>Your Wishlist is Empty</h3>
            <p>You haven't saved any handcrafted pieces yet. Explore our store to find your perfect match.</p>
            <a href="/store" class="btn btn-primary">Discover the collection</a>
          </div>
        </div>
      `;
    }

    return `
      <div class="page-container container">
        <header class="page-header">
          <div class="page-header-body">
            <span class="eyebrow"><span class="eyebrow-line"></span> Saved for later</span>
            <h1>Your Wishlist</h1>
            <p>You have saved ${favProducts.length} unique piece${favProducts.length === 1 ? '' : 's'}.</p>
          </div>
          <a href="/store" class="editorial-link">Back to the collection <span aria-hidden="true">↗</span></a>
        </header>
        
        <div class="grid grid-cols-4" id="wishlist-products-grid">
          ${favProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);

    const grid = document.getElementById('wishlist-products-grid');
    if (grid) {
      // Re-use ProductCard listeners (wishlist toggle & quick add)
      ProductCard.setupListeners(grid, products);

      // On this page, clicking wishlist heart should also remove the card from the DOM
      grid.querySelectorAll('.product-card-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.dataset.id;
          const isFavNow = wishlist.has(id);
          
          if (!isFavNow) {
            // Remove the card visually
            const card = btn.closest('.product-card');
            if (card) {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.9)';
              setTimeout(() => {
                card.remove();
                
                // If it was the last item, re-render empty state
                const remaining = wishlist.get();
                if (remaining.length === 0) {
                  const mainContent = document.querySelector('main');
                  if (mainContent) {
                    mainContent.innerHTML = Wishlist.render();
                    Wishlist.init();
                  }
                }
              }, 300);
            }
          }
        });
      });
    }
  }
};
