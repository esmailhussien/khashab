/* 🪵 Khashab Cart Panel Component (Slide-out drawer) */

import { cart } from '../utils/cart.js';

export const CartPanel = {
  render() {
    return `
      <!-- Overlay Backdrop -->
      <div class="side-panel-overlay" id="cart-panel-overlay"></div>
      
      <!-- Side Drawer -->
      <div class="side-panel" id="cart-panel">
        <div class="side-panel-header">
          <h3>Shopping Cart</h3>
          <button class="side-panel-close" id="btn-cart-close" aria-label="Close Cart">&times;</button>
        </div>
        
        <div class="side-panel-body" id="cart-panel-body">
          <!-- Cart items list will be dynamically rendered here -->
        </div>
        
        <div class="side-panel-footer">
          <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-weight: 500;">
            <span>Subtotal</span>
            <span id="cart-subtotal">$0.00</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1.5rem; font-weight: 300;">
            Shipping and taxes calculated at checkout.
          </p>
          <a href="#/checkout" class="btn btn-primary" style="width: 100%; text-align: center;" id="btn-cart-checkout">
            Proceed to Checkout
          </a>
          <button class="btn btn-text" style="width: 100%; margin-top: 1rem; justify-content: center;" id="btn-cart-continue">
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
        <div style="text-align: center; padding: 3rem 0; color: var(--color-text-muted);">
          <svg class="icon icon-lg" style="margin-bottom: 1rem; stroke-width: 1.2;" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p style="font-weight: 300;">Your cart is currently empty.</p>
          <a href="#/store" class="btn btn-secondary" style="margin-top: 1.5rem; font-size: 0.8rem; padding: 0.6rem 1.5rem;" id="btn-empty-shop">Start Shopping</a>
        </div>
      `;
      subtotalText.innerText = `$0.00`;
      if (checkoutBtn) {
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
      checkoutBtn.style.pointerEvents = 'auto';
      checkoutBtn.style.opacity = '1';
    }

    // Render items list
    body.innerHTML = items.map(item => {
      const currency = item.currency || 'USD';
      const itemPriceStr = currency === 'EGP' ? `${(item.price * item.quantity).toLocaleString()} EGP` : `$${(item.price * item.quantity).toFixed(2)}`;
      
      return `
        <div class="cart-item" data-id="${item.cartItemId}" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border-light); padding-bottom: 1.5rem;">
          <div style="width: 80px; height: 80px; flex-shrink: 0; background-color: var(--color-bg-alt); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border-light); position: relative;">
            ${item.image && !item.image.includes('hero.png') ? `
              <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
            ` : `
              <div class="image-placeholder" style="padding: 0.5rem;">
                <svg class="icon" viewBox="0 0 24 24" style="width: 20px; height: 20px; margin-bottom: 0.25rem;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                <span style="font-size: 0.5rem;">Wood</span>
              </div>
            `}
          </div>
          
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="font-family: var(--font-body); font-size: 0.95rem; font-weight: 500; margin-bottom: 0.25rem;">${item.name}</h4>
              <p style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 300;">
                ${item.woodType} / ${item.size}
              </p>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <!-- Quantity Control -->
              <div style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-sm); overflow: hidden;">
                <button class="cart-qty-btn decrease-qty" data-id="${item.cartItemId}" style="background: none; border: none; padding: 0.25rem 0.6rem; cursor: pointer; font-weight: 600;">-</button>
                <span style="padding: 0 0.5rem; font-size: 0.85rem; font-weight: 500;">${item.quantity}</span>
                <button class="cart-qty-btn increase-qty" data-id="${item.cartItemId}" style="background: none; border: none; padding: 0.25rem 0.6rem; cursor: pointer; font-weight: 600;">+</button>
              </div>
              
              <div style="text-align: right;">
                <span style="font-weight: 500; font-size: 0.95rem; color: var(--color-accent);">${itemPriceStr}</span>
                <button class="remove-cart-item" data-id="${item.cartItemId}" style="background: none; border: none; color: var(--color-text-light); cursor: pointer; font-size: 0.75rem; display: block; margin-left: auto; margin-top: 0.25rem; font-weight: 300; text-decoration: underline;">
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
