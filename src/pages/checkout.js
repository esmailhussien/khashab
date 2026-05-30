/* 🪵 Khashab Checkout Page View */

import { cart } from '../utils/cart.js';
import { products } from '../data/products.js';

export const Checkout = {
  render() {
    const items = cart.get();
    
    // If cart is empty, show cart-empty fallback
    if (items.length === 0) {
      return `
        <div class="page-container container">
          <div style="text-align: center; padding: 6rem 0;">
            <h2 style="font-family: var(--font-headings); font-size: 2.5rem; margin-bottom: 1.5rem;">Your Cart is Empty</h2>
            <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 2rem;">Please add some premium wooden pieces to your cart before checking out.</p>
            <a href="#/store" class="btn btn-primary">Return to Store</a>
          </div>
        </div>
      `;
    }

    const subtotal = cart.getTotal();
    const shipping = subtotal > 150 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return `
      <div class="page-container container" id="checkout-root">
        
        <!-- Progress Steps -->
        <div class="checkout-progress">
          <div class="progress-step active" id="progress-step-1">
            <span class="step-num">1</span>
            <span class="step-label">Shipping</span>
          </div>
          <div class="progress-step" id="progress-step-2">
            <span class="step-num">2</span>
            <span class="step-label">Payment</span>
          </div>
          <div class="progress-step" id="progress-step-3">
            <span class="step-num">3</span>
            <span class="step-label">Confirmation</span>
          </div>
        </div>

        <div class="checkout-grid">
          <!-- Checkout Step Panel (Left) -->
          <div class="checkout-step-content" id="checkout-step-container">
            
            <!-- STEP 1: SHIPPING INFORMATION -->
            <div class="checkout-step-pane" id="pane-shipping">
              <h3 class="step-title">Shipping Details</h3>
              <form id="form-shipping">
                <div class="form-grid">
                  <div class="form-group form-group-full">
                    <label class="form-label" for="ship-name">Full Name</label>
                    <input type="text" id="ship-name" class="form-input" required placeholder="John Doe">
                  </div>
                  <div class="form-group form-group-full">
                    <label class="form-label" for="ship-address">Street Address</label>
                    <input type="text" id="ship-address" class="form-input" required placeholder="123 Maple Avenue">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-city">City</label>
                    <input type="text" id="ship-city" class="form-input" required placeholder="New York">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-country">Country</label>
                    <select id="ship-country" class="form-input" required style="cursor: pointer; appearance: none; background-color: var(--color-bg);">
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Canada">Canada</option>
                      <option value="Japan">Japan</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-zip">ZIP / Postal Code</label>
                    <input type="text" id="ship-zip" class="form-input" required placeholder="10001">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="ship-phone">Phone Number</label>
                    <input type="tel" id="ship-phone" class="form-input" required placeholder="+1 (555) 123-4567">
                  </div>
                </div>
                
                <div class="checkout-actions">
                  <a href="#/store" class="btn btn-secondary">Back to Store</a>
                  <button type="submit" class="btn btn-primary">Continue to Payment</button>
                </div>
              </form>
            </div>

            <!-- STEP 2: PAYMENT INFORMATION -->
            <div class="checkout-step-pane" id="pane-payment" style="display: none;">
              <h3 class="step-title">Payment Method</h3>
              
              <!-- Card visual preview -->
              <div class="card-preview-wrapper">
                <div class="credit-card-mockup">
                  <div class="card-chip"></div>
                  <div class="card-number-display" id="card-num-preview">•••• •••• •••• ••••</div>
                  <div class="card-bottom-info">
                    <div>
                      <div class="card-label-small">Card Holder</div>
                      <div class="card-val-small" id="card-holder-preview">YOUR NAME</div>
                    </div>
                    <div style="text-align: right;">
                      <div class="card-label-small">Expires</div>
                      <div class="card-val-small" id="card-expiry-preview">MM/YY</div>
                    </div>
                  </div>
                </div>
              </div>

              <form id="form-payment">
                <div class="form-grid">
                  <div class="form-group form-group-full">
                    <label class="form-label" for="card-number">Card Number</label>
                    <input type="text" id="card-number" class="form-input" required placeholder="1234 5678 1234 5678" maxlength="19">
                  </div>
                  <div class="form-group form-group-full">
                    <label class="form-label" for="card-name">Name on Card</label>
                    <input type="text" id="card-name" class="form-input" required placeholder="JOHN DOE">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="card-expiry">Expiry Date</label>
                    <input type="text" id="card-expiry" class="form-input" required placeholder="MM/YY" maxlength="5">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="card-cvv">CVV</label>
                    <input type="password" id="card-cvv" class="form-input" required placeholder="***" maxlength="3">
                  </div>
                </div>
                
                <div class="checkout-actions">
                  <button type="button" class="btn btn-secondary" id="btn-back-shipping">Back to Shipping</button>
                  <button type="submit" class="btn btn-primary">Review & Confirm</button>
                </div>
              </form>
            </div>

            <!-- STEP 3: ORDER REVIEW & PLACE -->
            <div class="checkout-step-pane" id="pane-review" style="display: none;">
              <h3 class="step-title">Order Review</h3>
              
              <div style="margin-bottom: 2rem;">
                <h4 style="font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Shipping Address</h4>
                <p id="review-shipping-details" style="color: var(--color-text-muted); font-weight: 300; font-size: 0.95rem; line-height: 1.6;"></p>
              </div>

              <div style="margin-bottom: 3rem; border-top: 1px solid var(--color-border-light); padding-top: 1.5rem;">
                <h4 style="font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Payment Details</h4>
                <p id="review-payment-details" style="color: var(--color-text-muted); font-weight: 300; font-size: 0.95rem; line-height: 1.6;"></p>
              </div>

              <div class="checkout-actions">
                <button type="button" class="btn btn-secondary" id="btn-back-payment">Back to Payment</button>
                <button type="button" class="btn btn-accent" id="btn-place-order" style="padding-left: 3rem; padding-right: 3rem;">Place Order</button>
              </div>
            </div>
            
          </div>

          <!-- Order Summary Sidebar (Right) -->
          <aside class="order-summary-box">
            <h3 class="summary-title">Summary</h3>
            
            <!-- Items list -->
            <div class="summary-items">
              ${items.map(item => `
                <div class="summary-item-card">
                  <div class="summary-item-img">
                    <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                  </div>
                  <div class="summary-item-info">
                    <h4 class="summary-item-name">${item.name}</h4>
                    <span class="summary-item-meta">${item.woodType} / ${item.size} × ${item.quantity}</span>
                  </div>
                  <span class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
            </div>

            <!-- Discount/Promo Input -->
            <div class="promo-code-row">
              <input type="text" placeholder="Discount code" class="form-input" id="promo-code-input" style="padding: 0.6rem 1rem;">
              <button class="btn btn-secondary" id="btn-apply-promo" style="padding: 0.6rem 1.25rem; font-size: 0.8rem;">Apply</button>
            </div>
            <p id="promo-error-message" style="display:none; color: var(--color-error); font-size: 0.8rem; margin-top: -1.5rem; margin-bottom: 1.5rem;"></p>
            <p id="promo-success-message" style="display:none; color: var(--color-success); font-size: 0.8rem; margin-top: -1.5rem; margin-bottom: 1.5rem;"></p>

            <!-- Pricing Breakdown -->
            <div>
              <div class="calc-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div class="calc-row" id="summary-discount-row" style="display: none; color: var(--color-success);">
                <span>Discount (10% Off)</span>
                <span id="summary-discount-val">-$0.00</span>
              </div>
              <div class="calc-row">
                <span>Shipping</span>
                <span id="summary-shipping-val">${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div class="calc-row">
                <span>Estimated Tax (8%)</span>
                <span id="summary-tax-val">$${tax.toFixed(2)}</span>
              </div>
              <div class="calc-row calc-row-total">
                <span>Total</span>
                <span id="summary-total-val">$${total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);

    const items = cart.get();
    if (items.length === 0) return;

    // Checkout Navigation Panels
    const paneShipping = document.getElementById('pane-shipping');
    const panePayment = document.getElementById('pane-payment');
    const paneReview = document.getElementById('pane-review');

    // Steps Indicators
    const step1 = document.getElementById('progress-step-1');
    const step2 = document.getElementById('progress-step-2');
    const step3 = document.getElementById('progress-step-3');

    // Forms
    const formShipping = document.getElementById('form-shipping');
    const formPayment = document.getElementById('form-payment');
    const btnPlaceOrder = document.getElementById('btn-place-order');

    // Form data states
    let shippingData = {};
    let paymentData = {};
    let discountMultiplier = 1.0;

    // Discount code logic
    const promoInput = document.getElementById('promo-code-input');
    const applyPromoBtn = document.getElementById('btn-apply-promo');
    const promoError = document.getElementById('promo-error-message');
    const promoSuccess = document.getElementById('promo-success-message');

    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'WOOD10' || code === 'KHASHAB') {
          discountMultiplier = 0.9; // 10% off
          promoError.style.display = 'none';
          promoSuccess.innerText = 'Promo code applied successfully (10% Off)!';
          promoSuccess.style.display = 'block';
          promoInput.disabled = true;
          applyPromoBtn.disabled = true;
          
          this.recalculatePrices(discountMultiplier);
        } else {
          promoSuccess.style.display = 'none';
          promoError.innerText = 'Invalid discount code. Try "WOOD10"';
          promoError.style.display = 'block';
        }
      });
    }

    // Step 1: Shipping Submit
    if (formShipping) {
      formShipping.addEventListener('submit', (e) => {
        e.preventDefault();
        
        shippingData = {
          name: document.getElementById('ship-name').value,
          address: document.getElementById('ship-address').value,
          city: document.getElementById('ship-city').value,
          country: document.getElementById('ship-country').value,
          zip: document.getElementById('ship-zip').value,
          phone: document.getElementById('ship-phone').value,
        };

        // Transition to step 2
        paneShipping.style.display = 'none';
        panePayment.style.display = 'block';
        
        step1.classList.remove('active');
        step1.classList.add('completed');
        step2.classList.add('active');
        window.scrollTo(0, 0);
      });
    }

    // Dynamic Credit Card Preview Update
    const cardNumInput = document.getElementById('card-number');
    const cardNameInput = document.getElementById('card-name');
    const cardExpiryInput = document.getElementById('card-expiry');

    const cardNumPreview = document.getElementById('card-num-preview');
    const cardHolderPreview = document.getElementById('card-holder-preview');
    const cardExpiryPreview = document.getElementById('card-expiry-preview');

    if (cardNumInput) {
      cardNumInput.addEventListener('input', (e) => {
        // Formatter for card spacing: 1234 5678 1234 5678
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = '';
        for (let i = 0; i < val.length; i++) {
          if (i > 0 && i % 4 === 0) formatted += ' ';
          formatted += val[i];
        }
        e.target.value = formatted;
        cardNumPreview.innerText = formatted || '•••• •••• •••• ••••';
      });
    }

    if (cardNameInput) {
      cardNameInput.addEventListener('input', (e) => {
        cardHolderPreview.innerText = e.target.value.toUpperCase() || 'YOUR NAME';
      });
    }

    if (cardExpiryInput) {
      cardExpiryInput.addEventListener('input', (e) => {
        // Expiry formatter MM/YY
        let val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (val.length > 2) {
          e.target.value = val.slice(0, 2) + '/' + val.slice(2, 4);
        } else {
          e.target.value = val;
        }
        cardExpiryPreview.innerText = e.target.value || 'MM/YY';
      });
    }

    // Step 2 Back btn
    const btnBackShipping = document.getElementById('btn-back-shipping');
    if (btnBackShipping) {
      btnBackShipping.addEventListener('click', () => {
        panePayment.style.display = 'none';
        paneShipping.style.display = 'block';
        
        step2.classList.remove('active');
        step1.classList.remove('completed');
        step1.classList.add('active');
        window.scrollTo(0, 0);
      });
    }

    // Step 2: Payment Submit
    if (formPayment) {
      formPayment.addEventListener('submit', (e) => {
        e.preventDefault();

        paymentData = {
          number: cardNumInput.value,
          name: cardNameInput.value,
        };

        // Populate step 3 review text
        document.getElementById('review-shipping-details').innerHTML = `
          <strong>${shippingData.name}</strong><br>
          ${shippingData.address}<br>
          ${shippingData.city}, ${shippingData.zip}<br>
          ${shippingData.country}<br>
          Phone: ${shippingData.phone}
        `;

        document.getElementById('review-payment-details').innerHTML = `
          Card Holder: ${paymentData.name.toUpperCase()}<br>
          Card Number: •••• •••• •••• ${paymentData.number.slice(-4)}
        `;

        // Transition to step 3
        panePayment.style.display = 'none';
        paneReview.style.display = 'block';

        step2.classList.remove('active');
        step2.classList.add('completed');
        step3.classList.add('active');
        window.scrollTo(0, 0);
      });
    }

    // Step 3 Back btn
    const btnBackPayment = document.getElementById('btn-back-payment');
    if (btnBackPayment) {
      btnBackPayment.addEventListener('click', () => {
        paneReview.style.display = 'none';
        panePayment.style.display = 'block';

        step3.classList.remove('active');
        step2.classList.remove('completed');
        step2.classList.add('active');
        window.scrollTo(0, 0);
      });
    }

    // Step 3: Place Order (Final submit)
    if (btnPlaceOrder) {
      btnPlaceOrder.addEventListener('click', () => {
        // Generate mock order details
        const orderNum = 'KH-' + Math.floor(100000 + Math.random() * 900000);
        const subtotal = cart.getTotal();
        const discountVal = subtotal * (1 - discountMultiplier);
        const finalSubtotal = subtotal - discountVal;
        const shipping = finalSubtotal > 150 ? 0 : 15;
        const tax = finalSubtotal * 0.08;
        const total = finalSubtotal + shipping + tax;

        // Render success screen inside #checkout-root
        const root = document.getElementById('checkout-root');
        if (root) {
          root.innerHTML = `
            <div class="success-card">
              <div class="success-icon-wrapper">
                <svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2>Order Placed Successfully!</h2>
              <p class="success-desc">Thank you for supporting sustainable wood craftsmanship. We've sent a detailed receipt to your email address.</p>
              
              <div class="success-details">
                <div class="success-detail-row">
                  <span>Order Reference</span>
                  <strong>${orderNum}</strong>
                </div>
                <div class="success-detail-row">
                  <span>Shipping Address</span>
                  <span>${shippingData.name}, ${shippingData.city}, ${shippingData.country}</span>
                </div>
                <div class="success-detail-row">
                  <span>Total Amount Paid</span>
                  <strong style="color: var(--color-accent);">$${total.toFixed(2)}</strong>
                </div>
              </div>

              <a href="#/store" class="btn btn-primary" style="padding-left: 3rem; padding-right: 3rem;">Continue Shopping</a>
            </div>
          `;
        }

        // Clear shopping cart state and badges
        cart.clear();
        window.scrollTo(0, 0);
      });
    }
  },

  recalculatePrices(multiplier) {
    const subtotal = cart.getTotal();
    const discountVal = subtotal * (1 - multiplier);
    const finalSubtotal = subtotal - discountVal;
    
    const shipping = finalSubtotal > 150 ? 0 : 15;
    const tax = finalSubtotal * 0.08;
    const total = finalSubtotal + shipping + tax;

    // Update UI elements
    const discountRow = document.getElementById('summary-discount-row');
    const discountValText = document.getElementById('summary-discount-val');
    const shippingValText = document.getElementById('summary-shipping-val');
    const taxValText = document.getElementById('summary-tax-val');
    const totalValText = document.getElementById('summary-total-val');

    if (discountRow && discountValText) {
      discountValText.innerText = `-$${discountVal.toFixed(2)}`;
      discountRow.style.display = discountVal > 0 ? 'flex' : 'none';
    }

    if (shippingValText) {
      shippingValText.innerText = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    }

    if (taxValText) {
      taxValText.innerText = `$${tax.toFixed(2)}`;
    }

    if (totalValText) {
      totalValText.innerText = `$${total.toFixed(2)}`;
    }
  }
};
