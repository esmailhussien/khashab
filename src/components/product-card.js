import { imageAttributes } from '../utils/images.js';
import { escapeHtml as esc } from '../utils/html.js';
import { wishlist } from '../utils/wishlist.js';
import { cart } from '../utils/cart.js';
import { analytics } from '../utils/analytics.js';
import { initMotion } from '../utils/motion.js';

export const productPrice = product => Math.min(product.price, ...Object.values(product.variants || {}).map(v => v.price));
export const ProductCard = {
  render(product) {
    const isFav = wishlist.has(product.id);
    const price = productPrice(product);
    const hasOptions = product.woods?.length > 1 || product.sizes?.length > 1;
    const hasDiscount = Number(product.originalPrice) > price;
    const name = esc(product.name);
    const href = `/product/${encodeURIComponent(product.id)}`;
    const woods = product.woods || [product.woodType];
    const badge = !product.inStock ? 'Currently unavailable' : hasDiscount ? 'Sale' : '';
    return `<article class="product-card" data-id="${esc(product.id)}" data-reveal>
      <button class="product-card-wishlist ${isFav ? 'active' : ''}" data-id="${esc(product.id)}" aria-label="${isFav ? 'Remove' : 'Save'} ${name} ${isFav ? 'from' : 'to'} wishlist" aria-pressed="${isFav}"><svg class="icon icon-sm ${isFav ? 'icon-filled' : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
      <a href="${href}" class="product-card-img-wrapper"><img ${imageAttributes(product.image)} alt="${name}" width="600" height="600" loading="lazy" decoding="async">${badge ? `<span class="product-card-badge">${badge}</span>` : ''}</a>
      <div class="product-card-info"><span class="product-card-meta">${woods.length > 1 ? `${woods.length} wood finishes` : `${esc(product.woodType)} wood`}</span><h3 class="product-card-title"><a href="${href}">${name}</a></h3><p class="product-card-dimensions">${esc(product.dimensions)}</p>
      <div class="product-card-price-row"><span class="product-card-price">${hasOptions ? '<small>From </small>' : ''}${price.toLocaleString('en-EG')} <small>EGP</small>${hasDiscount ? `<s class="product-card-price-original">${product.originalPrice.toLocaleString('en-EG')}</s>` : ''}</span></div>
      ${hasOptions || !product.inStock ? `<a class="card-action" href="${href}">${product.inStock ? 'Choose your piece' : 'View details'} <span aria-hidden="true">↗</span></a>` : `<button class="card-action btn-card-add" data-id="${esc(product.id)}">Add to bag <span aria-hidden="true">+</span></button>`}
      </div></article>`;
  },
  setupListeners(container, productsList) {
    container.querySelectorAll('.product-card-wishlist').forEach(button => button.addEventListener('click', () => {
      const added = wishlist.toggle(button.dataset.id);
      const product = productsList.find(item => item.id === button.dataset.id);
      button.classList.toggle('active', added);
      button.setAttribute('aria-pressed', String(added));
      button.setAttribute('aria-label', `${added ? 'Remove' : 'Save'} ${product?.name || 'piece'} ${added ? 'from' : 'to'} wishlist`);
      button.querySelector('svg')?.classList.toggle('icon-filled', added);
      button.classList.remove('is-popping');
      void button.offsetWidth;
      button.classList.add('is-popping');
    }));
    container.querySelectorAll('.btn-card-add').forEach(button => button.addEventListener('click', () => {
      const product = productsList.find(item => item.id === button.dataset.id);
      if (!product?.inStock) return;
      cart.add(product, 1, { size: product.sizes?.[0] || 'Standard', wood: product.woods?.[0] || product.woodType });
      analytics.track('add_to_cart', { currency: 'EGP', value: product.price, items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }] });
      document.getElementById('cart-panel')?.classList.add('active');
      document.getElementById('cart-panel-overlay')?.classList.add('active');
    }));
    // Grids re-render on filter, sort and wishlist changes — hand the fresh
    // cards to the motion system so their reveal never gets stranded.
    initMotion(container);
  }
};
