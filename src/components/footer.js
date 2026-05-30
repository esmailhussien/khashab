/* 🪵 Khashab Footer Component */

export const Footer = {
  render() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column -->
            <div class="footer-col footer-brand">
              <a href="#/" class="logo">Khashab<span class="logo-dot">.</span></a>
              <p>Premium handcrafted wooden products designed for modern living. Crafted by nature, refined by hand.</p>
            </div>

            <!-- Quick Links -->
            <div class="footer-col">
              <h4>Shop</h4>
              <ul class="footer-links">
                <li><a href="#/store">All Products</a></li>
                <li><a href="#/store?category=cutting-serving">Serving Boards</a></li>
                <li><a href="#/store?category=butcher-blocks">Butcher Blocks</a></li>
                <li><a href="#/store?category=plates">Wooden Plates</a></li>
                <li><a href="#/store?category=care-maintenance">Care Products</a></li>
              </ul>
            </div>

            <!-- Explore Links -->
            <div class="footer-col">
              <h4>Company</h4>
              <ul class="footer-links">
                <li><a href="#/our-story">Our Story</a></li>
                <li><a href="#/discover">Discover Hub</a></li>
                <li><a href="#/discover?tab=care">Care & Maintenance</a></li>
                <li><a href="#/discover?tab=wiki">Wood Wiki</a></li>
                <li><a href="#/contact">Contact Us</a></li>
              </ul>
            </div>

            <!-- Newsletter -->
            <div class="footer-col footer-newsletter">
              <h4>Stay Connected</h4>
              <p>Subscribe to receive news of new arrivals, care guides, and sustainable wood insights.</p>
              <form class="newsletter-form" id="footer-newsletter-form">
                <input type="email" placeholder="Your email address" class="newsletter-input" required id="newsletter-email">
                <button type="submit" class="btn-newsletter-submit" aria-label="Subscribe">→</button>
              </form>
              <p class="success-message" id="newsletter-success" style="display:none; color: var(--color-success); font-size: 0.85rem; margin-top: 0.5rem;"></p>
            </div>
          </div>

          <!-- Bottom Footer -->
          <div class="footer-bottom">
            <p>&copy; 2026 Khashab. All rights reserved. Made from 100% natural wood.</p>
            <div class="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">Pinterest</a>
              <a href="mailto:sales@khashab.store" aria-label="Email">sales@khashab.store</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  init() {
    const form = document.getElementById('footer-newsletter-form');
    const successMsg = document.getElementById('newsletter-success');
    const emailInput = document.getElementById('newsletter-email');

    if (form && successMsg) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email) {
          successMsg.innerText = "Thank you! You've subscribed successfully.";
          successMsg.style.display = 'block';
          emailInput.value = '';
          
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
      });
    }
  }
};
