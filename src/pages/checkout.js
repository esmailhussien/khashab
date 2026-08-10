/* Khashab pre-launch checkout */

import { cart } from '../utils/cart.js';
import { analytics } from '../utils/analytics.js';

const formatEGP = (value) => `${Number(value || 0).toLocaleString()} EGP`;

export const Checkout = {
  render() {
    const items = cart.get();

    if (items.length === 0) {
      return `
        <div class="page-container container">
          <div style="text-align: center; padding: 6rem 0;">
            <h1 style="font-family: var(--font-headings); font-size: 2.5rem; margin-bottom: 1.5rem;">Your Cart is Empty</h1>
            <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 2rem;">Add a handcrafted piece before continuing to checkout.</p>
            <a href="/store" class="btn btn-primary">Return to Store</a>
          </div>
        </div>
      `;
    }

    const subtotal = cart.getTotal();
    const freeShippingLimit = 1500;
    const shipping = subtotal >= freeShippingLimit ? 0 : 150;
    const total = subtotal + shipping;

    return `
      <div class="page-container container" id="checkout-root">
        <div class="checkout-progress" aria-label="Checkout progress">
          <div class="progress-step active"><span class="step-num">1</span><span class="step-label">Delivery details</span></div>
          <div class="progress-step"><span class="step-num">2</span><span class="step-label">Secure payment</span></div>
        </div>

        <div class="checkout-grid">
          <section class="checkout-step-content">
            <p class="checkout-prelaunch-note"><strong>Pre-launch checkout.</strong> Card and wallet details are not collected on this website until the approved payment gateway is connected.</p>
            <h1 class="step-title">Delivery details</h1>
            <form id="form-shipping">
              <div class="form-grid">
                <div class="form-group form-group-full">
                  <label class="form-label" for="ship-name">Full name</label>
                  <input type="text" id="ship-name" class="form-input" autocomplete="name" required placeholder="Ahmed Mohamed">
                </div>
                <div class="form-group form-group-full">
                  <label class="form-label" for="ship-email">Email address</label>
                  <input type="email" id="ship-email" class="form-input" autocomplete="email" required placeholder="name@example.com">
                  <small class="checkout-field-help">Order confirmation and delivery updates will be sent here.</small>
                </div>
                <div class="form-group">
                  <label class="form-label" for="ship-phone">Egyptian mobile number</label>
                  <input type="tel" id="ship-phone" class="form-input" autocomplete="tel" required placeholder="01X XXX XXXX">
                </div>
                <div class="form-group">
                  <label class="form-label" for="ship-city">Governorate / city</label>
                  <input type="text" id="ship-city" class="form-input" autocomplete="address-level1" required placeholder="Cairo">
                </div>
                <div class="form-group form-group-full">
                  <label class="form-label" for="ship-address">Address</label>
                  <input type="text" id="ship-address" class="form-input" autocomplete="street-address" required placeholder="Building, street, district">
                </div>
                <div class="form-group">
                  <label class="form-label" for="ship-country">Country</label>
                  <input type="text" id="ship-country" class="form-input" value="Egypt" readonly>
                </div>
                <div class="form-group">
                  <label class="form-label" for="ship-zip">Postal code <span style="font-weight: 400; text-transform: none;">(optional)</span></label>
                  <input type="text" id="ship-zip" class="form-input" autocomplete="postal-code" placeholder="11511">
                </div>
              </div>

              <div class="checkout-actions">
                <a href="/store" class="btn btn-secondary">Back to store</a>
                <button type="submit" class="btn btn-primary">Save delivery details</button>
              </div>
              <p id="checkout-save-message" class="checkout-save-message" aria-live="polite"></p>
            </form>
          </section>

          <aside class="order-summary-box">
            <h2 class="summary-title">Order summary</h2>
            <div class="summary-items">
              ${items.map(item => `
                <div class="summary-item-card">
                  <div class="summary-item-img" style="width: 50px; height: 50px; border-radius: var(--radius-sm); overflow: hidden; position: relative;">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
                  </div>
                  <div class="summary-item-info">
                    <h3 class="summary-item-name">${item.name}</h3>
                    <span class="summary-item-meta">${item.woodType} / ${item.size} × ${item.quantity}</span>
                  </div>
                  <span class="summary-item-price">${formatEGP(item.price * item.quantity)}</span>
                </div>
              `).join('')}
            </div>
            <div>
              <div class="calc-row"><span>Subtotal</span><span>${formatEGP(subtotal)}</span></div>
              <div class="calc-row"><span>Delivery</span><span>${shipping === 0 ? 'Free' : formatEGP(shipping)}</span></div>
              <div class="calc-row"><span>Taxes</span><span>Confirmed at launch</span></div>
              <div class="calc-row calc-row-total"><span>Estimated total</span><span>${formatEGP(total)}</span></div>
            </div>
            <p class="checkout-summary-note">Free delivery for orders of ${formatEGP(freeShippingLimit)} or more. Final delivery availability will be confirmed before payment.</p>
          </aside>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);
    const form = document.getElementById('form-shipping');
    const message = document.getElementById('checkout-save-message');
    const items = cart.get();

    analytics.track('begin_checkout', {
      currency: 'EGP',
      value: cart.getTotal(),
      items: items.map(item => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity }))
    });

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (message) {
        message.textContent = 'Delivery details are ready. Secure payment will be enabled when the approved gateway is connected.';
      }
    });
  }
};
