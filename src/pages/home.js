import { imageAttributes } from '../utils/images.js';
import { products } from '../data/products.js';
import { ProductCard } from '../components/product-card.js';
import { escapeHtml as esc } from '../utils/html.js';

const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
const selection = () => products.filter(p => p.featured).slice(0, 4);
const materials = [
  { name: 'Oak', note: 'Light, expressive grain', image: '/assets/woods/oak.png' },
  { name: 'Walnut', note: 'Deep, warm character', image: '/assets/woods/walnut.png' },
  { name: 'Sapele', note: 'Rich, ribbon-like texture', image: '/assets/woods/sapele.png' },
];

// Annual-ring motif: drawn on reveal, decorative only.
const rings = (radii = [30, 54, 78, 102, 124]) => `
  <svg class="rings" viewBox="0 0 260 260" aria-hidden="true" focusable="false">
    ${radii.map(r => `<circle cx="130" cy="130" r="${r}"/>`).join('')}
  </svg>`;

export const Home = {
  render() {
    const hero = products.find(p => p.id === '3d-wooden-plate') || products[0];
    const collections = [
      { id: 'decorative-wooden-plate', title: 'The art of gathering', label: 'Round serving plates' },
      { id: '3d-oval-wooden-plate', title: 'A different dimension', label: 'Sculpted tableware' },
      { id: 'octagonal-serving-tray', title: 'Beautiful by design', label: 'Geometric serving trays' },
    ].map(item => ({ ...item, product: products.find(p => p.id === item.id) })).filter(item => item.product);
    return `
      <div class="page-container home-page">
        <section class="atelier-hero container" aria-labelledby="hero-title">
          <span class="hero-wash" aria-hidden="true"></span>
          <div class="atelier-hero-copy" data-reveal-group>
            <span class="eyebrow" data-reveal><span class="eyebrow-line"></span> The Khashab collection</span>
            <h1 id="hero-title" data-reveal>Nature’s character.<br>Made for <em>your <br>everyday.</em></h1>
            <p data-reveal>Thoughtfully carved tableware. Expressive natural wood. Pieces that make the simple act of gathering feel a little more special.</p>
            <div class="atelier-hero-actions" data-reveal>
              <a href="/store" class="btn btn-primary">Explore the collection ${arrow}</a>
              <a href="/our-story" class="editorial-link">Meet Khashab <span aria-hidden="true">↗</span></a>
            </div>
            <div class="hero-footnote" data-reveal><span aria-hidden="true">01 /</span> From natural grain to a place at your table.</div>
          </div>
          <div class="atelier-hero-visual" data-tilt data-reveal>
            <div class="tilt-plane">
              <div class="hero-frame">
                <img class="atelier-hero-img parallax-media" data-parallax="0.035" ${imageAttributes(hero?.image || '/assets/hero.webp', '(max-width: 760px) 100vw, 50vw')} alt="${esc(hero?.name || 'Wooden tableware in a natural setting')}" width="1000" height="1000" fetchpriority="high" decoding="async">
                <span class="grain" aria-hidden="true"></span>
                <span class="sheen" aria-hidden="true"></span>
              </div>
              <span class="hero-image-label">WOOD, WITH CHARACTER.</span>
              ${hero ? `<a class="hero-product-label" href="/product/${esc(hero.id)}"><span><small>In the spotlight</small><strong>${esc(hero.name)}</strong></span><span class="round-arrow" aria-hidden="true">↗</span></a>` : ''}
            </div>
          </div>
        </section>
        <div class="craft-strip"><div class="container craft-strip-inner" data-reveal-group>
          <span data-reveal><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M7 5c-5 5-4 12 5 13M17 5c5 5 4 12-5 13"/></svg> Natural hardwood</span>
          <span data-reveal><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l9-9m-3-5l4-4 8 8-4 4zM3 21l-1-5 5 1"/></svg> Carefully hand-finished</span>
          <span data-reveal><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M8 12l3 3 5-6"/></svg> No two grains alike</span>
          <a href="/discover?tab=care" data-reveal>Made to be cared for ${arrow}</a>
        </div></div>
        <section class="section selection-section container" aria-labelledby="selection-title">
          <div class="editorial-heading" data-reveal><div><span class="eyebrow">Considered pieces. Everyday rituals.</span><h2 id="selection-title">Find your natural favourite.</h2></div><a href="/store" class="editorial-link">Shop all pieces ${arrow}</a></div>
          <div class="signature-grid" data-reveal-group>${selection().map(product => ProductCard.render(product)).join('')}</div>
          <p class="selection-note" data-reveal>A note on nature: grain and colour vary from piece to piece. That’s part of what makes yours, yours.</p>
        </section>
        <section class="collection-section section" aria-labelledby="collection-title"><div class="container">
          <div class="editorial-heading" data-reveal><div><span class="eyebrow">A place in your home</span><h2 id="collection-title">For moments worth making.</h2></div><p>From the first coffee to the last conversation.<br>Bring something natural to the table.</p></div>
          <div class="occasion-grid" data-reveal-group>${collections.map((item, index) => `<a href="/product/${esc(item.id)}" class="occasion-card" data-tilt data-reveal><div class="tilt-plane"><div class="occasion-image"><img ${imageAttributes(item.product.image, '(max-width: 760px) 100vw, 33vw')} alt="${esc(item.product.name)}" width="640" height="640" loading="lazy"><span class="sheen" aria-hidden="true"></span></div><span class="occasion-index">0${index + 1}</span></div><div class="occasion-copy"><div><span class="eyebrow">${item.label}</span><h3>${item.title}</h3></div><span class="round-arrow" aria-hidden="true">↗</span></div></a>`).join('')}</div>
        </div></section>
        <section class="material-section section container" aria-labelledby="material-title">
          <div class="material-intro" data-reveal-group><span class="eyebrow" data-reveal>The material matters</span><h2 id="material-title" data-reveal>Good design starts<br>with <em>good wood.</em></h2><p data-reveal>Every species has its own palette, texture and personality. Discover the wood that feels at home with you.</p><a href="/discover?tab=wiki" class="editorial-link" data-reveal>Explore the wood library ${arrow}</a></div>
          <div class="material-grid" data-reveal-group>${materials.map(wood => `<a class="material-card" href="/store?wood=${wood.name}" data-tilt data-reveal><div class="tilt-plane"><div class="material-chip"><img ${imageAttributes(wood.image, '(max-width: 760px) 30vw, 200px')} alt="Natural ${wood.name.toLowerCase()} grain" width="300" height="380" loading="lazy"><span class="sheen" aria-hidden="true"></span></div><h3>${wood.name} <span aria-hidden="true">↗</span></h3><p>${wood.note}</p></div></a>`).join('')}</div>
        </section>
        <section class="atelier-story"><div class="atelier-story-image"><img class="parallax-media" data-parallax="0.045" ${imageAttributes('/assets/workshop.png', '(max-width: 760px) 100vw, 50vw')} alt="Woodworking tools and timber in the workshop" loading="lazy" width="1024" height="1024"></div><span class="grain grain-light" aria-hidden="true"></span><div class="atelier-story-copy" data-reveal-group><span class="eyebrow" data-reveal>The thinking behind the making</span><h2 data-reveal>Less ordinary.<br><em>More meaningful.</em></h2><p data-reveal>We believe everyday objects deserve thoughtful design. In the curve of a plate, the feel of an edge and the grain left visible, wood becomes something personal.</p><a href="/our-story" class="btn btn-light" data-reveal>Our story ${arrow}</a><a href="/configurator" class="story-custom-link" data-reveal>Have a piece in mind? Design your board <span aria-hidden="true">↗</span></a></div></section>
        <section class="care-note container">${rings()}<div data-reveal><span class="eyebrow">A little care goes a long way</span><h2>Keep the character. For years to come.</h2></div><a href="/discover?tab=care" class="editorial-link" data-reveal>Your wood care guide ${arrow}</a></section>
      </div>`;
  },
  init() {
    window.scrollTo(0, 0);
    const grid = document.querySelector('.signature-grid');
    if (grid) ProductCard.setupListeners(grid, selection());
  }
};
