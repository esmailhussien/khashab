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
import { Returns } from './pages/returns.js';
import { PageTransition } from './components/transitions.js';
import { products } from './data/products.js';
import { initScrollAnimations } from './utils/animations.js';

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
  '/configurator': Configurator,
  '/return-policy': Returns
};

const routeTitles = {
  '/': 'Khashab | Premium Handcrafted Wooden Boards & Tableware',
  '/store': 'Khashab Store | Artisanal Woodcraft Collection',
  '/discover': 'Khashab Discover | Wood Care, Wiki & Woodcraft Blog',
  '/our-story': 'Our Story | Khashab\'s Heritage & Sustainable Craft',
  '/contact': 'Contact Us | Khashab Custom Orders & Support',
  '/checkout': 'Checkout | Complete Your Khashab Order',
  '/wishlist': 'My Wishlist | Khashab Saved Items',
  '/configurator': 'Custom Board Configurator | Design Your Own Wood Board',
  '/return-policy': 'Return Policy | Khashab'
};

const placeholderPage = {
  render(params) {
    return `
      <div class="page-container" style="text-align: center; padding: 12rem 2rem 8rem 2rem;">
        <h2 style="font-size: 3rem; margin-bottom: 1rem; font-family: var(--font-headings);">Page Not Found</h2>
        <p style="color: var(--color-text-muted); margin-bottom: 2rem; font-weight: 300;">We couldn't find the page you are looking for.</p>
        <a href="#/" class="btn btn-primary" style="display: inline-block; padding: 0.75rem 2rem; background-color: var(--color-text); color: #fff; border-radius: var(--radius-md);">Return Home</a>
      </div>
    `;
  }
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

    const page = routes[routePath] || placeholderPage;
    
    // Set dynamic page title
    if (routePath === '/product' && params) {
      const product = products.find(p => p.id === params);
      if (product) {
        document.title = `${product.name} | Khashab`;
      } else {
        document.title = 'Product Not Found | Khashab';
      }
    } else {
      document.title = routeTitles[routePath] || 'Khashab | Premium Artisanal Woodcraft';
    }

    // Render with page container wrapper for transition animation
    const mainContent = document.querySelector('main');
    if (mainContent) {
      PageTransition.animate(
        mainContent,
        () => {
          mainContent.innerHTML = page.render(params);
        },
        () => {
          // Initialize page-specific scripts
          if (page.init) {
            page.init(params);
          }
          // Initialize scroll reveal animations for all components on the new page
          initScrollAnimations();
        }
      );
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
