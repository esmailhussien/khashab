/* 🪵 Khashab Client-side Router (Hash-based) */

import { Home } from './pages/home.js';
import { Store } from './pages/store.js';
import { Product } from './pages/product.js';
import { Checkout } from './pages/checkout.js';
import { Wishlist } from './pages/wishlist.js';
import { Discover } from './pages/discover.js';
import { Story } from './pages/story.js';
import { Contact } from './pages/contact.js';
import { Configurator } from './pages/configurator.js';

const routes = {
  '': Home,
  '/': Home,
  '/store': Store,
  '/product': Product,
  '/discover': Discover,
  '/our-story': Story,
  '/contact': Contact,
  '/checkout': Checkout,
  '/wishlist': Wishlist,
  '/configurator': Configurator
};

export const router = {
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
    
    // Intercept clicks on anchor tags for smooth routing
    document.body.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#/')) {
        // Normal hash navigation handles this
      }
    });
  },

  handleRoute() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    // Get current hash, remove '#'
    let hash = window.location.hash.slice(1) || '/';
    
    // Strip query parameters for routing lookup
    let pathWithoutQuery = hash;
    const qIndex = hash.indexOf('?');
    if (qIndex !== -1) {
      pathWithoutQuery = hash.slice(0, qIndex);
    }
    
    // Parse route and potential parameters (e.g. #/product/artisan-serving-paddle)
    let routePath = pathWithoutQuery;
    let params = null;
    
    if (pathWithoutQuery.startsWith('/product/')) {
      routePath = '/product';
      params = pathWithoutQuery.split('/product/')[1];
    }

    const page = routes[routePath] || placeholderRender('Page Not Found');
    
    // Render with page container wrapper for transition animation
    const mainContent = document.querySelector('main');
    if (mainContent) {
      // Trigger out animation or just update HTML and re-animate
      mainContent.innerHTML = page.render(params);
      if (page.init) {
        page.init(params);
      }
    }
    
    this.updateActiveNavLinks(routePath);
  },

  updateActiveNavLinks(path) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === `#${path}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Close mobile menu drawer if open
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
    }
  },

  navigate(path) {
    window.location.hash = `#${path}`;
  }
};
