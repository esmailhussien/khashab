import { cart } from '../utils/cart.js';
import { wishlist } from '../utils/wishlist.js';
const searchIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>';
const menuIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>';
const closeIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>';
const deliveryIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="16.5" cy="18" r="1.6"/></svg>';
const grainIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 5c-5 5-4 12 5 13M17 5c5 5 4 12-5 13"/></svg>';
const handIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l9-9m-3-5l4-4 8 8-4 4zM3 21l-1-5 5 1"/></svg>';

// Service promises the storefront can actually keep — the free-delivery
// threshold mirrors the one checkout applies.
const announcements = [
  `${deliveryIcon} Free delivery on orders over 1,500 EGP`,
  `${grainIcon} Natural hardwood — no two pieces alike`,
  `${handIcon} Hand-finished, delivered across Egypt`
];
export const Navbar = {
  render() {
    return `<div class="announcement-bar"><div class="container"><div class="announcement-ticker" id="announcement-ticker">${announcements.map((item, index) => `<span ${index === 0 ? 'data-active' : 'aria-hidden="true"'}>${item}</span>`).join('')}</div><a href="/discover?tab=care">A little care, a lasting story <span aria-hidden="true">↗</span></a></div></div>
    <header class="navbar" id="navbar"><div class="container">
      <a href="/" class="logo" aria-label="Khashab home"><img src="/assets/khashablogo.png" alt="Khashab" width="140" height="52"></a>
      <nav class="desktop-nav" aria-label="Main navigation"><ul class="nav-links">
        <li><a href="/store" class="nav-link">The collection</a></li>
        <li><a href="/configurator" class="nav-link">Design your board</a></li>
        <li class="nav-item-dropdown"><a href="/discover" class="nav-link">Discover <span class="nav-link-dropdown-arrow" aria-hidden="true">⌄</span></a><ul class="dropdown-menu">
          <li><a href="/discover?tab=wiki" class="dropdown-link">The wood library</a></li><li><a href="/discover?tab=care" class="dropdown-link">Care & maintenance</a></li><li><a href="/discover?tab=blog" class="dropdown-link">Stories & guides</a></li><li><a href="/discover?tab=videos" class="dropdown-link">Workshop films</a></li><li><a href="/discover?tab=faq" class="dropdown-link">Your questions, answered</a></li>
        </ul></li>
        <li><a href="/our-story" class="nav-link">Our story</a></li>
      </ul></nav>
      <div class="nav-actions">
        <div class="search-container" id="nav-search-container"><form class="search-input-wrapper" id="nav-search-form" role="search"><label class="sr-only" for="nav-search-input">Search products</label><input type="search" placeholder="Find your next piece…" class="search-input" id="nav-search-input"><button class="nav-btn" type="submit" aria-label="Submit search">${searchIcon}</button></form><button class="nav-btn" id="btn-search-toggle" aria-label="Search" aria-expanded="false" aria-controls="nav-search-form">${searchIcon}</button></div>
        <a href="/wishlist" class="nav-btn" aria-label="Wishlist"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="badge-count" id="wishlist-badge"></span></a>
        <button class="nav-btn" id="btn-cart-toggle" aria-label="Shopping bag"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7zm3 0V5a4 4 0 0 1 8 0v2"/></svg><span class="badge-count" id="cart-badge"></span></button>
        <button class="mobile-nav-toggle" id="btn-mobile-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">${menuIcon}</button>
      </div>
    </div></header>
    <nav class="mobile-drawer" id="mobile-drawer" aria-label="Mobile navigation" inert><span class="eyebrow">Explore Khashab</span><ul class="nav-links drawer-links">
      <li><a href="/" class="nav-link">Home</a></li><li><a href="/store" class="nav-link">The collection</a></li><li><a href="/configurator" class="nav-link">Design your board</a></li><li><a href="/discover?tab=wiki" class="nav-link">The wood library</a></li><li><a href="/discover?tab=care" class="nav-link">Care & guides</a></li><li><a href="/our-story" class="nav-link">Our story</a></li><li><a href="/contact" class="nav-link">Get in touch</a></li>
    </ul></nav>`;
  },
  closeMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('btn-mobile-toggle');
    drawer?.classList.remove('open');
    if (drawer) drawer.inert = true;
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); toggle.innerHTML = menuIcon; }
    document.body.classList.remove('menu-open');
  },
  initTicker() {
    const ticker = document.getElementById('announcement-ticker');
    if (!ticker) return;
    const slides = [...ticker.children];
    if (slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let index = 0;
    let paused = false;
    ticker.addEventListener('pointerenter', () => { paused = true; });
    ticker.addEventListener('pointerleave', () => { paused = false; });

    setInterval(() => {
      if (paused || document.hidden) return;
      slides[index].removeAttribute('data-active');
      slides[index].setAttribute('aria-hidden', 'true');
      index = (index + 1) % slides.length;
      slides[index].setAttribute('data-active', '');
      slides[index].removeAttribute('aria-hidden');
    }, 5200);
  },
  init() {
    this.initTicker();
    const drawer = document.getElementById('mobile-drawer');
    const toggle = document.getElementById('btn-mobile-toggle');
    const search = document.getElementById('nav-search-container');
    const searchToggle = document.getElementById('btn-search-toggle');
    const searchInput = document.getElementById('nav-search-input');
    const closeSearch = () => { search.classList.remove('active'); searchToggle.setAttribute('aria-expanded', 'false'); document.getElementById('nav-search-form').inert = true; };
    closeSearch();
    searchToggle.addEventListener('click', () => {
      if (search.classList.contains('active')) closeSearch();
      else { this.closeMenu(); search.classList.add('active'); searchToggle.setAttribute('aria-expanded', 'true'); document.getElementById('nav-search-form').inert = false; searchInput.focus(); }
    });
    document.getElementById('nav-search-form').addEventListener('submit', event => { event.preventDefault(); const query = searchInput.value.trim(); if (query) { window.KhashabNavigate(`/store?search=${encodeURIComponent(query)}`); closeSearch(); } });
    document.addEventListener('click', event => { if (!search.contains(event.target)) closeSearch(); });
    toggle.addEventListener('click', () => {
      if (drawer.classList.contains('open')) this.closeMenu();
      else { closeSearch(); drawer.inert = false; drawer.classList.add('open'); document.body.classList.add('menu-open'); toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Close menu'); toggle.innerHTML = closeIcon; drawer.querySelector('a').focus(); }
    });
    drawer.addEventListener('click', event => { if (event.target.closest('a')) this.closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { if (drawer.classList.contains('open')) { this.closeMenu(); toggle.focus(); } if (search.classList.contains('active')) { closeSearch(); searchToggle.focus(); } }
      if (event.key === 'Tab' && drawer.classList.contains('open')) {
        const links = [...drawer.querySelectorAll('a')];
        if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); toggle.focus(); }
        else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); toggle.focus(); }
        else if (document.activeElement === toggle) { event.preventDefault(); (event.shiftKey ? links.at(-1) : links[0]).focus(); }
      }
    });
    window.addEventListener('popstate', () => this.closeMenu());
    window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) this.closeMenu(); });
    document.getElementById('btn-cart-toggle').addEventListener('click', () => { document.getElementById('cart-panel')?.classList.add('active'); document.getElementById('cart-panel-overlay')?.classList.add('active'); });
    ['cart-updated', 'wishlist-updated'].forEach(name => window.addEventListener(name, () => this.updateBadges()));
    this.updateBadges();
  },
  updateBadges() {
    [['cart-badge', cart.getCount()], ['wishlist-badge', wishlist.getCount()]].forEach(([id, count]) => { const badge = document.getElementById(id); if (badge) { badge.textContent = count; badge.style.display = count ? 'flex' : 'none'; } });
  }
};
