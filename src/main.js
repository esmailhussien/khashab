/* 🪵 Khashab Main JavaScript Entrypoint */

import './styles/main.css';
import { Navbar } from './components/navbar.js';
import { Footer } from './components/footer.js';
import { CartPanel } from './components/cart-panel.js';
import { Lightbox } from './components/lightbox.js';
import { ConsentBanner } from './components/consent-banner.js';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Render the static page shell
  appContainer.innerHTML = `
    <!-- Navbar Container -->
    <div id="navbar-container"></div>
    
    <!-- Main Dynamically Routed Content -->
    <main id="main-content"></main>
    
    <!-- Cart Slide-out Panel Container -->
    <div id="cart-panel-container"></div>
    
    <!-- Footer Container -->
    <div id="footer-container"></div>
    
    <!-- Global Lightbox Zoom Container -->
    <div id="lightbox-container"></div>

    <!-- Optional analytics consent -->
    <div id="consent-container"></div>
  `;

  // Render static components inside their containers
  document.getElementById('navbar-container').innerHTML = Navbar.render();
  document.getElementById('cart-panel-container').innerHTML = CartPanel.render();
  document.getElementById('footer-container').innerHTML = Footer.render();
  document.getElementById('lightbox-container').innerHTML = Lightbox.render();
  document.getElementById('consent-container').innerHTML = ConsentBanner.render();

  // Initialize interactive javascript handlers for static components
  Navbar.init();
  CartPanel.init();
  Footer.init();
  Lightbox.init();
  ConsentBanner.init();

  // Initialize Router to render active page in <main>
  router.init();
});
