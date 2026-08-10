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
import { Admin } from './pages/admin.js';
import { PageTransition } from './components/transitions.js';
import { products } from './data/products.js';
import { initScrollAnimations } from './utils/animations.js';
import { analytics } from './utils/analytics.js';

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
  '/return-policy': Returns,
  '/admin': Admin
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
  '/return-policy': 'Return Policy | Khashab',
  '/admin': 'Catalog Studio | Khashab'
};

const placeholderPage = {
  render(params) {
    return `
      <div class="page-container" style="text-align: center; padding: 12rem 2rem 8rem 2rem;">
        <h2 style="font-size: 3rem; margin-bottom: 1rem; font-family: var(--font-headings);">Page Not Found</h2>
        <p style="color: var(--color-text-muted); margin-bottom: 2rem; font-weight: 300;">We couldn't find the page you are looking for.</p>
        <a href="/" class="btn btn-primary" style="display: inline-block; padding: 0.75rem 2rem; background-color: var(--color-text); color: #fff; border-radius: var(--radius-md);">Return Home</a>
      </div>
    `;
  }
};

export const router = {
  init() {
    if (window.location.hash.startsWith('#/')) {
      window.history.replaceState(null, '', window.location.hash.slice(1));
    }

    window.addEventListener('popstate', () => this.handleRoute());

    // Intercept internal navigation so paths remain real URLs without a reload.
    document.body.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      const target = href.startsWith('#/') ? href.slice(1) : href;
      const url = new URL(target, window.location.origin);

      if (url.origin === window.location.origin && !href.startsWith('#') && !url.pathname.startsWith('/assets/')) {
        e.preventDefault();
        this.navigate(`${url.pathname}${url.search}`);
      }
    });

    window.KhashabNavigate = (path) => this.navigate(path);
    this.handleRoute();
  },

  handleRoute() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    const currentPath = window.location.pathname === '/index.html' ? '/' : window.location.pathname;
    const routeWithQuery = `${currentPath}${window.location.search}`;
    const qIndex = routeWithQuery.indexOf('?');
    const pathWithoutQuery = qIndex === -1 ? routeWithQuery : routeWithQuery.slice(0, qIndex);
    
    // Parse route and potential parameters (e.g. #/product/artisan-serving-paddle)
    let routePath = pathWithoutQuery;
    let params = null;
    
    if (pathWithoutQuery.startsWith('/product/')) {
      routePath = '/product';
      params = pathWithoutQuery.split('/product/')[1];
    }

    const page = routes[routePath] || placeholderPage;
    
    // Default Meta info
    let title = routeTitles[routePath] || 'Khashab | Premium Artisanal Woodcraft';
    let description = "Discover premium handcrafted wooden serving boards, butcher blocks, decorative items, and care products. 100% natural hardwood, designed for modern living.";
    let image = "/assets/hero.png";
    let productForSchema = null;

    // Set dynamic page title and meta
    if (routePath === '/product' && params) {
      const product = products.find(p => p.id === params);
      if (product) {
        title = `${product.name} | Khashab`;
        description = product.description.substring(0, 150) + '...';
        image = product.image;
        productForSchema = product;
      } else {
        title = 'Product Not Found | Khashab';
      }
    } else if (routePath === '/store') {
      description = "Browse our full collection of sustainable, handcrafted wooden products. Filter by wood type and price.";
    } else if (routePath === '/configurator') {
      description = "Design your custom wooden board. Choose your wood, size, and personalization options.";
    }

    // Update DOM Meta Tags
    document.title = title;
    
    const metaDesc = document.getElementById('meta-description');
    const metaOgTitle = document.getElementById('meta-og-title');
    const metaOgDesc = document.getElementById('meta-og-description');
    const metaOgImage = document.getElementById('meta-og-image');
    
    if (metaDesc) metaDesc.setAttribute('content', description);
    if (metaOgTitle) metaOgTitle.setAttribute('content', title);
    if (metaOgDesc) metaOgDesc.setAttribute('content', description);
    if (metaOgImage) metaOgImage.setAttribute('content', image);

    const canonical = document.getElementById('canonical-url');
    const canonicalUrl = `https://www.khashab.store${pathWithoutQuery}`;
    if (canonical) canonical.setAttribute('href', canonicalUrl);

    const schemaScript = document.getElementById('structured-data');
    if (schemaScript) {
      const schema = productForSchema ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productForSchema.name,
        description: productForSchema.description,
        image: [new URL(productForSchema.image, 'https://www.khashab.store').href],
        sku: productForSchema.id,
        brand: { '@type': 'Brand', name: 'Khashab' },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: productForSchema.currency || 'EGP',
          price: String(productForSchema.price),
          availability: productForSchema.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      } : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Khashab',
        url: 'https://www.khashab.store/'
      };

      schemaScript.textContent = JSON.stringify(schema);
    }

    analytics.track('page_view', { page_path: `${pathWithoutQuery}${window.location.search}` });
    if (productForSchema) {
      analytics.track('view_item', {
        currency: productForSchema.currency || 'EGP',
        value: productForSchema.price,
        items: [{ item_id: productForSchema.id, item_name: productForSchema.name, price: productForSchema.price, quantity: 1 }]
      });
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
          this.upgradeLegacyLinks();
        }
      );
    }
    
    this.updateActiveNavLinks(routePath);
  },

  updateActiveNavLinks(path) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === path || href === `#${path}`)) {
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

  upgradeLegacyLinks() {
    document.querySelectorAll('a[href^="#/"]').forEach(link => {
      link.setAttribute('href', link.getAttribute('href').slice(1));
    });
  },

  navigate(path) {
    const destination = path.startsWith('/') ? path : `/${path}`;
    if (`${window.location.pathname}${window.location.search}` !== destination) {
      window.history.pushState(null, '', destination);
    }
    this.handleRoute();
  }
};
