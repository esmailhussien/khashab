/* 🪵 Khashab Navbar Component */

import { cart } from '../utils/cart.js';
import { wishlist } from '../utils/wishlist.js';

export const Navbar = {
  render() {
    const cartCount = cart.getCount();
    const wishlistCount = wishlist.getCount();

    return `
      <header class="navbar" id="navbar">
        <div class="container">
          <!-- Logo -->
          <a href="#/" class="logo">
            Khashab<span class="logo-dot">.</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav">
            <ul class="nav-links">
              <li><a href="#/" class="nav-link" id="nav-link-home">Home</a></li>
              <li class="nav-item-dropdown">
                <a href="#/store" class="nav-link" id="nav-link-store">The Store <span class="nav-link-dropdown-arrow">▼</span></a>
                <ul class="dropdown-menu">
                  <li><a href="#/store" class="dropdown-link">All Products</a></li>
                  <li><a href="#/store?category=cutting-serving" class="dropdown-link">Cutting & Serving Boards</a></li>
                  <li><a href="#/store?category=butcher-blocks" class="dropdown-link">Butcher Blocks</a></li>
                  <li><a href="#/store?category=plates" class="dropdown-link">Wooden Plates</a></li>
                  <li><a href="#/store?category=kitchen-accessories" class="dropdown-link">Kitchen Accessories</a></li>
                  <li><a href="#/store?category=decorative" class="dropdown-link">Decorative Items</a></li>
                  <li><a href="#/store?category=care-maintenance" class="dropdown-link">Care & Maintenance</a></li>
                  <li class="dropdown-divider" style="border-top: 1px solid var(--color-border); margin: 6px 0;"></li>
                  <li><a href="#/configurator" class="dropdown-link" style="font-weight: 600; color: var(--color-accent);">Build Your Board 🎨</a></li>
                </ul>
              </li>
              <li class="nav-item-dropdown">
                <a href="#/discover" class="nav-link" id="nav-link-discover">Discover <span class="nav-link-dropdown-arrow">▼</span></a>
                <ul class="dropdown-menu">
                  <li><a href="#/discover" class="dropdown-link">Discover Hub</a></li>
                  <li><a href="#/discover?tab=care" class="dropdown-link">Care & Maintenance</a></li>
                  <li><a href="#/discover?tab=wiki" class="dropdown-link">Wood Wiki / Materials</a></li>
                  <li><a href="#/discover?tab=blog" class="dropdown-link">Blog & News</a></li>
                  <li><a href="#/discover?tab=videos" class="dropdown-link">Videos</a></li>
                  <li><a href="#/discover?tab=faq" class="dropdown-link">FAQ</a></li>
                </ul>
              </li>
              <li><a href="#/our-story" class="nav-link" id="nav-link-story">Our Story</a></li>
              <li><a href="#/contact" class="nav-link" id="nav-link-contact">Contact</a></li>
            </ul>
          </nav>

          <!-- Nav Actions (Search, Wishlist, Cart) -->
          <div class="nav-actions">
            <!-- Search -->
            <div class="search-container" id="nav-search-container">
              <div class="search-input-wrapper">
                <input type="text" placeholder="Search products..." class="search-input" id="nav-search-input">
              </div>
              <button class="nav-btn" id="btn-search-toggle" aria-label="Search">
                <svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>

            <!-- Wishlist -->
            <a href="#/wishlist" class="nav-btn" id="btn-wishlist-nav" aria-label="Wishlist">
              <svg class="icon" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span class="badge-count" id="wishlist-badge" style="display: ${wishlistCount > 0 ? 'flex' : 'none'}">${wishlistCount}</span>
            </a>

            <!-- Cart -->
            <button class="nav-btn" id="btn-cart-toggle" aria-label="Cart">
              <svg class="icon" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span class="badge-count" id="cart-badge" style="display: ${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
            </button>

            <!-- Mobile Toggle -->
            <button class="mobile-nav-toggle" id="btn-mobile-toggle" aria-label="Menu">
              <svg class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" id="mobile-drawer">
        <ul class="nav-links" style="display: flex;">
          <li><a href="#/" class="nav-link">Home</a></li>
          <li>
            <a href="#/store" class="nav-link" style="font-weight: 500;">The Store</a>
            <ul class="mobile-sub-links">
              <li><a href="#/store" class="mobile-sub-link">All Products</a></li>
              <li><a href="#/store?category=cutting-serving" class="mobile-sub-link">Cutting Boards</a></li>
              <li><a href="#/store?category=butcher-blocks" class="mobile-sub-link">Butcher Blocks</a></li>
              <li><a href="#/store?category=plates" class="mobile-sub-link">Plates</a></li>
              <li><a href="#/store?category=kitchen-accessories" class="mobile-sub-link">Accessories</a></li>
              <li><a href="#/store?category=decorative" class="mobile-sub-link">Decorative</a></li>
              <li><a href="#/store?category=care-maintenance" class="mobile-sub-link">Care & Oil</a></li>
              <li style="border-top: 1px dashed var(--color-border); margin: 4px 0; padding-top: 4px;"><a href="#/configurator" class="mobile-sub-link" style="font-weight: 600; color: var(--color-accent);">Build Your Board 🎨</a></li>
            </ul>
          </li>
          <li>
            <a href="#/discover" class="nav-link" style="font-weight: 500;">Discover</a>
            <ul class="mobile-sub-links">
              <li><a href="#/discover" class="mobile-sub-link">Discover Hub</a></li>
              <li><a href="#/discover?tab=care" class="mobile-sub-link">Care & Maintenance</a></li>
              <li><a href="#/discover?tab=wiki" class="mobile-sub-link">Wood Wiki</a></li>
              <li><a href="#/discover?tab=blog" class="mobile-sub-link">Blog & News</a></li>
              <li><a href="#/discover?tab=videos" class="mobile-sub-link">Videos</a></li>
              <li><a href="#/discover?tab=faq" class="mobile-sub-link">FAQ</a></li>
            </ul>
          </li>
          <li><a href="#/our-story" class="nav-link">Our Story</a></li>
          <li><a href="#/contact" class="nav-link">Contact</a></li>
        </ul>
      </div>
    `;
  },

  init() {
    const navbar = document.getElementById('navbar');
    const searchContainer = document.getElementById('nav-search-container');
    const searchToggle = document.getElementById('btn-search-toggle');
    const searchInput = document.getElementById('nav-search-input');
    const mobileToggle = document.getElementById('btn-mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const cartToggle = document.getElementById('btn-cart-toggle');

    // Sticky Transparent-to-Solid scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Expandable Search Bar toggle
    if (searchToggle && searchContainer && searchInput) {
      searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
          searchInput.focus();
        }
      });

      // Close search when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
          searchContainer.classList.remove('active');
        }
      });

      // Trigger product search on Enter
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            window.location.hash = `#/store?search=${encodeURIComponent(query)}`;
            searchInput.value = '';
            searchContainer.classList.remove('active');
          }
        }
      });
    }

    // Mobile Hamburger toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
        // Toggle mobile hamburger icon
        if (mobileDrawer.classList.contains('open')) {
          mobileToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        } else {
          mobileToggle.innerHTML = '<svg class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        }
      });
    }

    // Toggle Cart Drawer
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        const cartPanel = document.getElementById('cart-panel');
        const cartOverlay = document.getElementById('cart-panel-overlay');
        if (cartPanel && cartOverlay) {
          cartPanel.classList.add('active');
          cartOverlay.classList.add('active');
        }
      });
    }

    // Listen to Cart updates to update count badge reactively
    window.addEventListener('cart-updated', () => {
      this.updateBadges();
    });

    // Listen to Wishlist updates to update count badge reactively
    window.addEventListener('wishlist-updated', () => {
      this.updateBadges();
    });

    // Initial badge update
    this.updateBadges();
  },

  updateBadges() {
    const cartBadge = document.getElementById('cart-badge');
    const wishlistBadge = document.getElementById('wishlist-badge');
    
    if (cartBadge) {
      const count = cart.getCount();
      cartBadge.innerText = count;
      cartBadge.style.display = count > 0 ? 'flex' : 'none';
    }
    
    if (wishlistBadge) {
      const count = wishlist.getCount();
      wishlistBadge.innerText = count;
      wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};
