/* 🪵 Khashab Reusable Product Card Component */

import { wishlist } from '../utils/wishlist.js';
import { cart } from '../utils/cart.js';

export const ProductCard = {
  render(product) {
    const isFav = wishlist.has(product.id);
    const hasDiscount = product.originalPrice !== null;
    const currency = product.currency || 'USD';
    const formatPrice = (val) => currency === 'EGP' ? `${val.toLocaleString()} EGP` : `$${val.toFixed(2)}`;
    
    return `
      <div class="product-card" data-id="${product.id}">
        <!-- Sale Badge -->
        ${hasDiscount ? `<span class="product-card-badge">Sale</span>` : ''}
        
        <!-- Wishlist Button -->
        <button class="product-card-wishlist ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="Add to Wishlist">
          <svg class="icon icon-sm ${isFav ? 'icon-filled' : ''}" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <!-- Product Image Frame -->
        <a href="#/product/${product.id}" class="product-card-img-wrapper">
          ${product.image && !product.image.includes('hero.png') ? `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          ` : `
            <div class="image-placeholder">
              <svg class="icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              <span>[ ${product.woodType} Wood ]</span>
            </div>
          `}
        </a>

        <!-- Product Info -->
        <div class="product-card-info">
          <span class="product-card-meta">${product.woodType} / ${product.dimensions}</span>
          <h3 class="product-card-title">
            <a href="#/product/${product.id}">${product.name}</a>
          </h3>
          
          <div class="product-card-price-row">
            <span class="product-card-price">
              ${formatPrice(product.price)}
              ${hasDiscount ? `<span class="product-card-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </span>
            
            <button class="btn-card-add" data-id="${product.id}" aria-label="Add to Cart">
              <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  setupListeners(container, productsList) {
    // Handle Wishlist Toggle clicks
    container.querySelectorAll('.product-card-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        const added = wishlist.toggle(id);
        
        btn.classList.toggle('active', added);
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.classList.toggle('icon-filled', added);
        }
      });
    });

    // Handle Quick Add to Cart clicks
    container.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        const product = productsList.find(p => p.id === id);
        
        if (product) {
          cart.add(product, 1, {
            size: product.sizes ? product.sizes[0] : 'Standard',
            wood: product.woods ? product.woods[0] : product.woodType
          });
          
          // Animate button success state
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg class="icon icon-sm" viewBox="0 0 24 24" style="stroke: var(--color-success);"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          btn.style.borderColor = 'var(--color-success)';
          
          // Auto open cart panel to show the added item
          setTimeout(() => {
            const panel = document.getElementById('cart-panel');
            const overlay = document.getElementById('cart-panel-overlay');
            if (panel && overlay) {
              panel.classList.add('active');
              overlay.classList.add('active');
            }
            
            // Restore button styling
            btn.innerHTML = originalHTML;
            btn.style.borderColor = '';
          }, 600);
        }
      });
    });
  }
};
