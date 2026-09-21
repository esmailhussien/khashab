/* 🪵 Khashab Cart Panel Component (Slide-out drawer) */

import { cart } from '../utils/cart.js';

export const CartPanel = {
  render() {
    return `
      <!-- Overlay Backdrop -->
      <div class="side-panel-overlay" id="cart-panel-overlay"></div>
      
      <!-- Side Drawer -->
      <div class="side-panel" id="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" inert>
        <div class="side-panel-header">
          <h3 id="cart-title">Your bag</h3>
          <button class="side-panel-close" id="btn-cart-close" aria-label="Close Cart">&times;</button>
        </div>
        
        <div class="side-panel-body" id="cart-panel-body">
          <!-- Cart items list will be dynamically rendered here -->
        </div>
        
        <div class="side-panel-footer">
          <div class="cart-subtotal-row">
            <span>Subtotal</span>
            <span id="cart-subtotal">0 EGP</span>
          </div>
          <p class="cart-tax-note">
            Shipping and taxes calculated at checkout.
          </p>
          <a href="/checkout" class="btn btn-primary cart-btn-block" id="btn-cart-checkout">
            Proceed to Checkout
          </a>
          <button class="btn btn-text cart-btn-block cart-btn-continue" id="btn-cart-continue">
            Continue Shopping
          </button>
        </div>
      </div>
    `;
  },

  init() {
    const closeBtn = document.getElementById('btn-cart-close');
    const continueBtn = document.getElementById('btn-cart-continue');
    const overlay = document.getElementById('cart-panel-overlay');
    const panel = document.getElementById('cart-panel');
    const checkoutBtn = document.getElementById('btn-cart-checkout');

    const closeCart = () => {
      panel.classList.remove('active');
      overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (continueBtn) continueBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        closeCart();
      });
    }

    let previousFocus = null;
    let wasOpen = false;
    new MutationObserver(() => {
      const open = panel.classList.contains('active');
      if (open === wasOpen) return;
      wasOpen = open;
      panel.inert = !open;
      document.body.classList.toggle('cart-open', open);
      if (open) previousFocus = document.activeElement;
      ['main-content', 'navbar-container', 'footer-container'].forEach(id => { const element = document.getElementById(id); if (element) element.inert = open; });
      if (open) closeBtn.focus();
      else if (previousFocus?.isConnected) previousFocus.focus();
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', event => {
      if (!panel.classList.contains('active')) return;
      if (event.key === 'Escape') closeCart();
      if (event.key === 'Tab') {
        const controls = [...panel.querySelectorAll('button, a[href]')].filter(element => !element.disabled && element.getAttribute('tabindex') !== '-1' && element.getClientRects().length);
        if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
      }
    });
    // Handle updates
    window.addEventListener('cart-updated', () => {
      this.updateCartList();
    });

    // Initial render
    this.updateCartList();
  },

  updateCartList() {
    const body = document.getElementById('cart-panel-body');
    const subtotalText = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('btn-cart-checkout');
    
    if (!body || !subtotalText) return;

    const items = cart.get();
    
    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <svg class="icon icon-lg cart-empty-icon" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your bag is currently empty.</p>
          <a href="/store" class="btn btn-secondary cart-empty-action" id="btn-empty-shop">Start shopping</a>
        </div>
      `;
      subtotalText.innerText = `0 EGP`;
      if (checkoutBtn) {
        checkoutBtn.setAttribute('aria-disabled', 'true');
        checkoutBtn.setAttribute('tabindex', '-1');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5';
      }

      // Add listener to empty shop button to close cart drawer
      const emptyShopBtn = document.getElementById('btn-empty-shop');
      if (emptyShopBtn) {
        emptyShopBtn.addEventListener('click', () => {
          const panel = document.getElementById('cart-panel');
          const overlay = document.getElementById('cart-panel-overlay');
          panel.classList.remove('active');
          overlay.classList.remove('active');
        });
      }
      return;
    }

    if (checkoutBtn) {
      checkoutBtn.removeAttribute('aria-disabled');
      checkoutBtn.removeAttribute('tabindex');
      checkoutBtn.style.pointerEvents = 'auto';
      checkoutBtn.style.opacity = '1';
    }

    // Render items list
    body.innerHTML = items.map(item => {
      const currency = item.currency || 'EGP';
      const itemPriceStr = currency === 'EGP' ? `${(item.price * item.quantity).toLocaleString()} EGP` : `$${(item.price * item.quantity).toFixed(2)}`;
      
      return `
        <div class="cart-item" data-id="${item.cartItemId}">
          <div class="cart-item-media">
            ${item.image && !item.image.includes('hero.png') ? `
              <img src="${item.image}" alt="${item.name}">
            ` : `
              <div class="image-placeholder cart-item-placeholder">
                <svg class="icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                <span>Wood</span>
              </div>
            `}
          </div>
          
          <div class="cart-item-body">
            <div>
              <h4 class="cart-item-name">${item.name}</h4>
              <p class="cart-item-meta">
                ${item.woodType} / ${item.size}
              </p>
            </div>
            
            <div class="cart-item-controls">
              <!-- Quantity Control -->
              <div class="cart-qty">
                <button class="cart-qty-btn decrease-qty" data-id="${item.cartItemId}" type="button" aria-label="Decrease quantity">-</button>
                <span class="cart-qty-val">${item.quantity}</span>
                <button class="cart-qty-btn increase-qty" data-id="${item.cartItemId}" type="button" aria-label="Increase quantity">+</button>
              </div>
              
              <div class="cart-item-price-col">
                <span class="cart-item-price">${itemPriceStr}</span>
                <button class="remove-cart-item" data-id="${item.cartItemId}" type="button">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const hasEGP = items.some(item => item.currency === 'EGP');
    const total = cart.getTotal();
    subtotalText.innerText = hasEGP ? `${total.toLocaleString()} EGP` : `$${total.toFixed(2)}`;

    // Set up item event listeners (quantity +/- and remove)
    body.querySelectorAll('.decrease-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = items.find(i => i.cartItemId === id);
        if (item) cart.updateQuantity(id, item.quantity - 1);
      });
    });

    body.querySelectorAll('.increase-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const item = items.find(i => i.cartItemId === id);
        if (item) cart.updateQuantity(id, item.quantity + 1);
      });
    });

    body.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        cart.remove(id);
      });
    });
  }
};
