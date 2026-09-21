/* 🪵 Khashab Discover — the timber guide and support hub */

import { blogArticles } from '../data/articles.js';
import { woodsWiki } from '../data/woods.js';
import { escapeHtml as esc } from '../utils/html.js';

const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';

const tabs = [
  { id: '', label: 'All' },
  { id: 'wiki', label: 'The wood library' },
  { id: 'care', label: 'Care & maintenance' },
  { id: 'blog', label: 'Stories & guides' },
  { id: 'videos', label: 'Workshop films' },
  { id: 'faq', label: 'Your questions' }
];

const regions = [
  { id: 'all', label: 'Every region' },
  { id: 'african', label: 'African woods', match: o => /african|madagascar|tunisian/.test(o) },
  { id: 'north american', label: 'North American', match: o => /american/.test(o) },
  { id: 'european', label: 'European', match: o => /european/.test(o) },
  { id: 'asian', label: 'Asian', match: o => /asian|burmese/.test(o) }
];

// Currency-free bands: the guide describes how scarce a timber is, not a price
// the shop would then have to keep in sync.
const rarities = ['Everyday', 'Premium', 'Rare', 'Exceptional'];

const getParams = () => Object.fromEntries(new URLSearchParams(window.location.search));

const tabNav = (active) => `
  <nav class="category-pills discover-tabs" aria-label="Discover sections">
    ${tabs.map(tab => `<a href="/discover${tab.id ? `?tab=${tab.id}` : ''}" class="category-pill ${tab.id === active ? 'active' : ''}"${tab.id === active ? ' aria-current="page"' : ''}>${tab.label}</a>`).join('')}
  </nav>`;

const pageHeader = (eyebrow, title, lede, action) => `
  <header class="page-header">
    <div class="page-header-body">
      <span class="eyebrow"><span class="eyebrow-line"></span> ${eyebrow}</span>
      <h1>${title}</h1>
      <p>${lede}</p>
    </div>
    ${action || ''}
  </header>`;

const articleCard = (article) => `
  <a class="discover-article" href="/discover?article=${esc(article.id)}" data-reveal>
    <div class="discover-article-frame">
      ${article.image
        ? `<img src="${esc(article.image)}" alt="${esc(article.title)}" loading="lazy" decoding="async">`
        : '<span class="discover-article-fallback" aria-hidden="true"></span>'}
    </div>
    <div class="discover-article-body">
      <span class="eyebrow">${esc(article.date)} · ${esc(article.author)}</span>
      <h3>${esc(article.title)}</h3>
      <p>${esc(article.summary)}</p>
      <span class="editorial-link">Read the guide ${arrow}</span>
    </div>
  </a>`;

const woodCard = (wood) => `
  <article class="wiki-card" data-reveal>
    <div class="wiki-card-aside">
      <span class="wiki-swatch" style="background: ${wood.swatch}" aria-hidden="true"></span>
      <h3>${esc(wood.name)}</h3>
      <span class="wiki-scientific">${esc(wood.scientific)}</span>
      <dl class="wiki-facts">
        <div><dt>Origin</dt><dd>${esc(wood.origin)}</dd></div>
        <div><dt>Classification</dt><dd>${esc(wood.type)}</dd></div>
        <div><dt>Availability</dt><dd><span class="wiki-rarity" data-rarity="${esc(wood.rarity)}">${esc(wood.rarity)}</span></dd></div>
      </dl>
    </div>
    <div class="wiki-card-body">
      <p class="wiki-lede">${esc(wood.description)}</p>
      <dl class="wiki-attrs">
        <div><dt>Natural hue</dt><dd>${esc(wood.color)}</dd></div>
        <div><dt>Durability &amp; hardness</dt><dd>${esc(wood.durability)}</dd></div>
        <div><dt>Grain structure</dt><dd>${esc(wood.grain)}</dd></div>
        <div><dt>Best applications</dt><dd>${esc(wood.bestFor)}</dd></div>
        <div><dt>Care recommendation</dt><dd>${esc(wood.careTip)}</dd></div>
      </dl>
    </div>
  </article>`;

const faqs = [
  {
    q: 'How often should I oil my board?',
    a: 'Once a month, or whenever the surface starts to look pale and dry. Use food-grade mineral oil — never vegetable, olive or canola oil, which turn rancid and leave an odour.'
  },
  {
    q: 'Can I put it in the dishwasher?',
    a: 'No. Sustained heat, standing water and harsh detergent will warp, split and eventually ruin a wooden piece. Hand wash with warm water and mild soap, then dry immediately.'
  },
  {
    q: 'Where do you deliver?',
    a: 'We deliver across Egypt. Delivery is free on orders over 1,500 EGP, and 150 EGP below that. We confirm timing with you before your order is dispatched.'
  },
  {
    q: 'What if something arrives damaged?',
    a: 'Tell us within 48 hours of delivery with photographs of the piece and the box, and we will arrange a replacement or a full refund. For other returns, contact us within 15 days of receiving your order. <a href="/return-policy">Read the full return policy ↗</a>'
  },
  {
    q: 'Why does my piece look different from the photograph?',
    a: 'Because it is a different piece of wood. Grain, figure and colour vary between boards cut from the same species, and even between two cut from the same board. The photographs show a representative piece, not the exact one you receive.'
  }
];

export const Discover = {
  render() {
    const params = getParams();
    const activeTab = params.tab || '';
    const activeArticleId = params.article || '';

    /* ---------------------------------------------------------- Article --- */
    if (activeArticleId) {
      const article = blogArticles.find(a => a.id === activeArticleId);
      if (!article) {
        return `
          <div class="page-container container">
            ${pageHeader('Discover', 'Article not found', 'The article you are looking for does not exist or has moved.',
              '<a href="/discover" class="editorial-link">Back to Discover <span aria-hidden="true">↗</span></a>')}
          </div>`;
      }

      const isCare = article.category === 'care';
      return `
        <div class="page-container container">
          <div class="product-breadcrumbs">
            <a href="/">Home</a> / <a href="/discover">Discover</a> /
            <a href="/discover?tab=${esc(article.category)}">${isCare ? 'Care &amp; maintenance' : 'Stories &amp; guides'}</a> /
            <span>${esc(article.title)}</span>
          </div>

          <article class="discover-article-page">
            ${pageHeader(isCare ? 'Care guide' : 'Journal', esc(article.title), esc(article.summary))}
            <p class="discover-article-meta">Published ${esc(article.date)} by ${esc(article.author)}</p>

            ${article.image ? `
              <div class="discover-article-hero" data-reveal>
                <img src="${esc(article.image)}" alt="${esc(article.title)}" decoding="async">
                <span class="grain" aria-hidden="true"></span>
              </div>` : ''}

            <div class="discover-prose">${article.content}</div>

            <div class="discover-article-foot">
              <a href="/discover?tab=${esc(article.category)}" class="editorial-link">More ${isCare ? 'care guides' : 'stories'} ${arrow}</a>
              <a href="/store" class="editorial-link">Shop the collection ${arrow}</a>
            </div>
          </article>
        </div>`;
    }

    /* ------------------------------------------------- Care and journal --- */
    if (activeTab === 'care' || activeTab === 'blog') {
      const isCare = activeTab === 'care';
      const articles = blogArticles.filter(a => a.category === activeTab);

      return `
        <div class="page-container container">
          ${pageHeader(
            isCare ? 'Care &amp; maintenance' : 'Stories &amp; guides',
            isCare ? 'Keep the character.' : 'From the workshop.',
            isCare
              ? 'Step-by-step guides to washing, drying, oiling and buffing, so a piece keeps its grain and colour for years.'
              : 'Notes on design, material and process from the people making the pieces.',
            '<a href="/store" class="editorial-link">Shop the collection <span aria-hidden="true">↗</span></a>'
          )}
          ${tabNav(activeTab)}
          ${articles.length ? `
            <div class="discover-article-grid" data-reveal-group>${articles.map(articleCard).join('')}</div>
          ` : `
            <div class="discover-empty">
              <h2>Nothing published here yet.</h2>
              <p>New ${isCare ? 'care guides' : 'stories'} are added as they are written.</p>
              <a href="/discover" class="btn btn-primary">Back to Discover ${arrow}</a>
            </div>`}
        </div>`;
    }

    /* ------------------------------------------------------ Wood library --- */
    if (activeTab === 'wiki') {
      return `
        <div class="page-container container">
          ${pageHeader(
            'The wood library',
            'Know the timber.',
            'Every species has its own colour, density, grain and temperament. This is what we look for, and what each one is good at.',
            '<a href="/contact" class="editorial-link">Ask about a species <span aria-hidden="true">↗</span></a>'
          )}
          ${tabNav('wiki')}

          <section class="wiki-compare" aria-labelledby="compare-title" data-reveal>
            <div class="editorial-heading">
              <div>
                <span class="eyebrow">Side by side</span>
                <h2 id="compare-title">Compare two timbers</h2>
              </div>
            </div>
            <div class="wiki-compare-selects">
              <div class="form-group">
                <label class="form-label" for="compare-wood-1">First timber</label>
                <select id="compare-wood-1" class="form-input select-input">
                  ${woodsWiki.map(wood => `<option value="${esc(wood.id)}"${wood.id === 'maple' ? ' selected' : ''}>${esc(wood.name)}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="compare-wood-2">Second timber</label>
                <select id="compare-wood-2" class="form-input select-input">
                  ${woodsWiki.map(wood => `<option value="${esc(wood.id)}"${wood.id === 'walnut' ? ' selected' : ''}>${esc(wood.name)}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="wiki-compare-scroll">
              <table class="wiki-compare-table">
                <thead>
                  <tr>
                    <th scope="col">Trait</th>
                    <th scope="col" id="compare-name-1">Maple</th>
                    <th scope="col" id="compare-name-2">American Walnut</th>
                  </tr>
                </thead>
                <tbody id="compare-table-body"></tbody>
              </table>
            </div>
          </section>

          <div class="wiki-controls">
            <div class="wiki-search">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg>
              <label class="sr-only" for="wiki-search">Search the wood library</label>
              <input type="search" id="wiki-search" placeholder="Search a name, origin or use…">
            </div>
            <div class="wiki-filters">
              <label class="sr-only" for="wiki-filter-region">Filter by region</label>
              <select id="wiki-filter-region" class="form-input select-input">
                ${regions.map(region => `<option value="${region.id}">${region.label}</option>`).join('')}
              </select>
              <label class="sr-only" for="wiki-filter-rarity">Filter by availability</label>
              <select id="wiki-filter-rarity" class="form-input select-input">
                <option value="all">Any availability</option>
                ${rarities.map(rarity => `<option value="${rarity}">${rarity}</option>`).join('')}
              </select>
            </div>
          </div>

          <p class="wiki-count" id="wiki-count" role="status" aria-live="polite"></p>
          <div class="wiki-grid" id="wiki-cards-container" data-reveal-group></div>
        </div>`;
    }

    /* ---------------------------------------------------- Workshop films --- */
    if (activeTab === 'videos') {
      return `
        <div class="page-container container">
          ${pageHeader(
            'Inside the workshop',
            'Workshop films.',
            'Selecting a slab, shaping it, and the final oiling — filmed as each piece is made.',
            '<a href="/our-story" class="editorial-link">Read our story <span aria-hidden="true">↗</span></a>'
          )}
          ${tabNav('videos')}
          <div class="discover-empty" data-reveal>
            <span class="eyebrow">In production</span>
            <h2>The films are still being shot.</h2>
            <p>We would rather publish nothing than publish a stock clip. Until the first film is cut, the care guides cover the same ground in writing.</p>
            <a href="/discover?tab=care" class="btn btn-primary">Read the care guides ${arrow}</a>
          </div>
        </div>`;
    }

    /* --------------------------------------------------------------- FAQ --- */
    if (activeTab === 'faq') {
      return `
        <div class="page-container container">
          ${pageHeader(
            'Support',
            'Your questions, answered.',
            'Care, delivery and returns — the things people ask before and after ordering.',
            '<a href="/contact" class="editorial-link">Ask us something else <span aria-hidden="true">↗</span></a>'
          )}
          ${tabNav('faq')}
          <div class="faq-container">
            <div class="product-accordions">
              ${faqs.map((faq, index) => `
                <div class="accordion-item${index === 0 ? ' active' : ''}">
                  <button class="accordion-trigger" type="button" aria-expanded="${index === 0}">
                    <span>${esc(faq.q)}</span>
                    <span class="accordion-icon" aria-hidden="true">▼</span>
                  </button>
                  <div class="accordion-content">
                    <div class="accordion-content-inner">${faq.a}</div>
                  </div>
                </div>`).join('')}
            </div>
            <aside class="faq-aside" data-reveal>
              <span class="eyebrow">Still stuck?</span>
              <h2>Talk to a person.</h2>
              <p>If your question is about a specific piece or an order, write to us and we will answer directly.</p>
              <a href="/contact" class="btn btn-primary">Get in touch ${arrow}</a>
            </aside>
          </div>
        </div>`;
    }

    /* ---------------------------------------------------------------- Hub --- */
    const sections = [
      { tab: 'wiki', label: 'The wood library', title: 'Know the timber', desc: `Colour, density, grain and temperament for ${woodsWiki.length} species we work with.` },
      { tab: 'care', label: 'Care &amp; maintenance', title: 'Keep the character', desc: 'Washing, drying, oiling and buffing — what a wooden piece needs, and how often.' },
      { tab: 'blog', label: 'Stories &amp; guides', title: 'From the workshop', desc: 'Notes on design, material and process from the people making the pieces.' },
      { tab: 'faq', label: 'Support', title: 'Your questions, answered', desc: 'Care, delivery and returns, in plain terms.' }
    ];

    return `
      <div class="page-container container">
        ${pageHeader(
          'Everything about the wood',
          'The timber guide.',
          'What the wood is, how to look after it, and how we work — the reference behind every piece we make.',
          '<a href="/store" class="editorial-link">Shop the collection <span aria-hidden="true">↗</span></a>'
        )}
        ${tabNav('')}
        <div class="discover-hub-grid" data-reveal-group>
          ${sections.map((section, index) => `
            <a class="discover-hub-card" href="/discover?tab=${section.tab}" data-reveal>
              <span class="discover-hub-index" aria-hidden="true">0${index + 1}</span>
              <span class="eyebrow">${section.label}</span>
              <h2>${section.title}</h2>
              <p>${section.desc}</p>
              <span class="editorial-link">Open ${arrow}</span>
            </a>`).join('')}
        </div>
      </div>`;
  },

  init() {
    window.scrollTo(0, 0);

    /* Comparison table */
    const wood1 = document.getElementById('compare-wood-1');
    const wood2 = document.getElementById('compare-wood-2');
    const tableBody = document.getElementById('compare-table-body');

    if (wood1 && wood2 && tableBody) {
      const updateComparison = () => {
        const a = woodsWiki.find(w => w.id === wood1.value);
        const b = woodsWiki.find(w => w.id === wood2.value);
        if (!a || !b) return;

        document.getElementById('compare-name-1').textContent = a.name;
        document.getElementById('compare-name-2').textContent = b.name;

        const rows = [
          ['Scientific name', a.scientific, b.scientific, true],
          ['Geographic origin', a.origin, b.origin],
          ['Classification', a.type, b.type],
          ['Availability', a.rarity, b.rarity],
          ['Natural colour', a.color, b.color],
          ['Hardness & durability', a.durability, b.durability],
          ['Grain pattern', a.grain, b.grain],
          ['Best uses', a.bestFor, b.bestFor],
          ['Care suggestion', a.careTip, b.careTip]
        ];

        tableBody.innerHTML = rows.map(([label, left, right, italic]) => `
          <tr>
            <th scope="row">${esc(label)}</th>
            <td${italic ? ' class="is-scientific"' : ''}>${esc(left)}</td>
            <td${italic ? ' class="is-scientific"' : ''}>${esc(right)}</td>
          </tr>`).join('');
      };

      wood1.addEventListener('change', updateComparison);
      wood2.addEventListener('change', updateComparison);
      updateComparison();
    }

    /* Wood library search and filters */
    const search = document.getElementById('wiki-search');
    const filterRegion = document.getElementById('wiki-filter-region');
    const filterRarity = document.getElementById('wiki-filter-rarity');
    const grid = document.getElementById('wiki-cards-container');
    const count = document.getElementById('wiki-count');

    if (grid) {
      const update = () => {
        const query = (search?.value || '').toLowerCase().trim();
        const region = filterRegion?.value || 'all';
        const rarity = filterRarity?.value || 'all';

        const filtered = woodsWiki.filter(wood => {
          const haystack = [wood.name, wood.scientific, wood.origin, wood.bestFor, wood.description].join(' ').toLowerCase();
          const matchesRegion = region === 'all' || Boolean(regions.find(r => r.id === region)?.match(wood.origin.toLowerCase()));
          return (!query || haystack.includes(query)) && matchesRegion && (rarity === 'all' || wood.rarity === rarity);
        });

        grid.innerHTML = filtered.length
          ? filtered.map(woodCard).join('')
          : `<div class="discover-empty">
               <h2>No timber matches that.</h2>
               <p>Try a different keyword, another region, or a wider availability band.</p>
               <button class="btn btn-secondary" id="wiki-reset" type="button">Show every species</button>
             </div>`;

        if (count) count.textContent = `${filtered.length} of ${woodsWiki.length} species`;

        document.getElementById('wiki-reset')?.addEventListener('click', () => {
          if (search) search.value = '';
          if (filterRegion) filterRegion.value = 'all';
          if (filterRarity) filterRarity.value = 'all';
          update();
        });
      };

      search?.addEventListener('input', update);
      filterRegion?.addEventListener('change', update);
      filterRarity?.addEventListener('change', update);
      update();
    }

    /* FAQ accordions */
    document.querySelectorAll('.faq-container .accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const open = item.classList.toggle('active');
        trigger.setAttribute('aria-expanded', String(open));
      });
    });
  }
};
