import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { ProductCard, productPrice } from '../components/product-card.js';
import { escapeHtml as esc } from '../utils/html.js';
const prices = [
  { id: 'under-1000', label: 'Under 1,000 EGP', match: value => value < 1000 },
  { id: '1000-1500', label: '1,000–1,499 EGP', match: value => value >= 1000 && value < 1500 },
  { id: '1500-plus', label: '1,500 EGP & above', match: value => value >= 1500 },
];
const readState = () => {
  const query = new URLSearchParams(window.location.search);
  return { category: query.get('category') || 'all', search: query.get('search') || '', woods: query.getAll('wood'), prices: query.getAll('price'), sort: query.get('sort') || 'featured' };
};
const getWoods = () => [...new Set(products.flatMap(product => product.woods || [product.woodType]))].sort();
const getCategories = () => categories.filter(category => products.some(product => product.category === category.id));
export const Store = {
  render() {
    const state = readState();
    return `<div class="page-container container collection-page">
      <header class="page-header"><div class="page-header-body"><span class="eyebrow">The Khashab collection</span><h1>Objects with character.</h1><p>Natural grain. Sculpted forms. Find a piece that feels like you.</p></div><a href="/configurator" class="editorial-link">Make it your own <span aria-hidden="true">↗</span></a></header>
      <form class="store-search-form" id="store-search-form" role="search"><label class="sr-only" for="store-search">Search the collection</label><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input type="search" id="store-search" name="search" value="${esc(state.search)}" placeholder="Search a piece, a wood, a detail…"><button type="submit">Search</button></form>
      <div class="store-toolbar"><div class="category-pills" aria-label="Product categories"><button class="category-pill ${state.category === 'all' ? 'active' : ''}" data-cat="all" aria-pressed="${state.category === 'all'}">All pieces</button>${getCategories().map(category => `<button class="category-pill ${state.category === category.id ? 'active' : ''}" data-cat="${esc(category.id)}" aria-pressed="${state.category === category.id}">${esc(category.name)}</button>`).join('')}</div><div class="sort-container"><button class="btn btn-secondary mobile-filter-toggle" id="btn-mobile-filter" aria-expanded="false" aria-controls="store-filters">Filters</button><label for="store-sort" class="sort-label">Sort</label><select id="store-sort" class="sort-select select-input"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></div></div>
      <div class="store-container"><aside class="store-sidebar" id="store-filters" aria-label="Filter products">
        <fieldset class="filter-group"><legend class="filter-title">Wood finish</legend><div class="filter-list">${getWoods().map(wood => `<label class="filter-checkbox-label"><input type="checkbox" value="${esc(wood)}" class="filter-checkbox filter-wood" ${state.woods.includes(wood) ? 'checked' : ''}>${esc(wood)}</label>`).join('')}</div></fieldset>
        <fieldset class="filter-group"><legend class="filter-title">Starting price</legend><div class="filter-list">${prices.map(price => `<label class="filter-checkbox-label"><input type="checkbox" value="${price.id}" class="filter-checkbox filter-price" ${state.prices.includes(price.id) ? 'checked' : ''}>${price.label}</label>`).join('')}</div><p class="filter-help">All prices in Egyptian pounds. Your chosen finish may change the price.</p></fieldset>
        <a href="/discover?tab=wiki" class="filter-guide">Not sure which wood?<br><strong>Explore the wood library ↗</strong></a>
      </aside><div class="store-content"><p class="store-info-count" id="store-item-count" role="status" aria-live="polite"></p><div class="active-filters" id="active-filter-tags"></div><div class="grid grid-cols-3" id="store-products-grid"></div><div class="store-empty" id="store-empty-state" hidden><span class="eyebrow">A different starting point</span><h2>No matching pieces yet.</h2><p>Try another wood, a wider price range, or a different search.</p><button class="btn btn-primary" id="btn-reset-filters">View all pieces</button></div></div></div>
      <div class="store-bottom-note"><p>Looking for a particular shape or size?</p><a class="editorial-link" href="/contact">Let’s talk about your piece <span aria-hidden="true">↗</span></a></div>
    </div>`;
  },
  init() {
    window.scrollTo(0, 0);
    let state = readState();
    const root = document.querySelector('.collection-page');
    const sort = root.querySelector('#store-sort');
    sort.value = ['featured', 'price-low', 'price-high', 'name'].includes(state.sort) ? state.sort : 'featured';
    const update = (push = true) => {
      if (push) {
        const query = new URLSearchParams();
        if (state.category !== 'all') query.set('category', state.category);
        if (state.search) query.set('search', state.search);
        state.woods.forEach(wood => query.append('wood', wood));
        state.prices.forEach(price => query.append('price', price));
        if (state.sort !== 'featured') query.set('sort', state.sort);
        const path = `/store${query.size ? `?${query}` : ''}`;
        if (path !== `${location.pathname}${location.search}`) history.pushState(null, '', path);
      }
      let filtered = products.filter(product => {
        const text = [product.name, product.description, product.woodType, ...(product.woods || [])].join(' ').toLowerCase();
        return (state.category === 'all' || product.category === state.category) &&
          (!state.search || text.includes(state.search.toLowerCase())) &&
          (!state.woods.length || state.woods.some(wood => (product.woods || [product.woodType]).includes(wood))) &&
          (!state.prices.length || state.prices.some(id => prices.find(price => price.id === id)?.match(productPrice(product))));
      });
      filtered.sort(state.sort === 'price-low' ? (a,b) => productPrice(a)-productPrice(b) : state.sort === 'price-high' ? (a,b) => productPrice(b)-productPrice(a) : state.sort === 'name' ? (a,b) => a.name.localeCompare(b.name) : (a,b) => Number(b.featured)-Number(a.featured));
      const grid = root.querySelector('#store-products-grid');
      grid.innerHTML = filtered.map(product => ProductCard.render(product)).join('');
      grid.hidden = !filtered.length;
      root.querySelector('#store-empty-state').hidden = Boolean(filtered.length);
      root.querySelector('#store-item-count').textContent = `${filtered.length} piece${filtered.length === 1 ? '' : 's'}${state.search ? ` matching “${state.search}”` : ' in the collection'}`;
      ProductCard.setupListeners(grid, products);
      root.querySelectorAll('[data-cat]').forEach(button => { const active = button.dataset.cat === state.category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
      const tags = [...(state.search ? [`Search: ${state.search}`] : []), ...(state.category !== 'all' ? [categories.find(c => c.id === state.category)?.name || state.category] : []), ...state.woods, ...state.prices.map(id => prices.find(price => price.id === id)?.label || id)];
      root.querySelector('#active-filter-tags').innerHTML = tags.length ? `${tags.map(tag => `<span class="filter-tag">${esc(tag)}</span>`).join('')}<button class="clear-filters" id="clear-store-filters">Clear all</button>` : '';
      root.querySelector('#clear-store-filters')?.addEventListener('click', reset);
    };
    const reset = () => {
      state = { category: 'all', search: '', woods: [], prices: [], sort: 'featured' };
      root.querySelectorAll('.filter-checkbox').forEach(input => input.checked = false);
      root.querySelector('#store-search').value = '';
      sort.value = 'featured';
      update();
    };
    root.querySelectorAll('[data-cat]').forEach(button => button.addEventListener('click', () => { state.category = button.dataset.cat; update(); }));
    root.querySelectorAll('.filter-checkbox').forEach(input => input.addEventListener('change', () => { state.woods = [...root.querySelectorAll('.filter-wood:checked')].map(el => el.value); state.prices = [...root.querySelectorAll('.filter-price:checked')].map(el => el.value); update(); }));
    sort.addEventListener('change', () => { state.sort = sort.value; update(); });
    root.querySelector('#store-search-form').addEventListener('submit', event => { event.preventDefault(); state.search = root.querySelector('#store-search').value.trim(); update(); });
    root.querySelector('#btn-reset-filters').addEventListener('click', reset);
    root.querySelector('#btn-mobile-filter').addEventListener('click', event => { const active = root.querySelector('#store-filters').classList.toggle('active'); event.currentTarget.setAttribute('aria-expanded', String(active)); });
    update(false);
  }
};
