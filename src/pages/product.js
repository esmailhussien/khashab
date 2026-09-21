/* 🪵 Khashab Product Detail Page View */

import { products } from '../data/products.js';
import { woodsWiki } from '../data/woods.js';
import { cart } from '../utils/cart.js';
import { wishlist } from '../utils/wishlist.js';
import { Lightbox } from '../components/lightbox.js';
import { ProductCard } from '../components/product-card.js';
import { analytics } from '../utils/analytics.js';
import { initMotion } from '../utils/motion.js';
import { escapeHtml as esc } from '../utils/html.js';

/* Editorial image grid: the first photo leads full width, the rest pair up
   beneath it. Replaces the old single-image-plus-thumbnails layout, which left
   the column far shorter than the buy box beside it. */
const galleryMarkup = (images, name, wood) => {
  const label = wood ? `${wood} wood` : 'Natural wood';
  if (!images.length) {
    return `<figure class="gallery-figure gallery-figure--lead">
        <div class="tilt-plane"><div class="gallery-frame">
          <div class="image-placeholder"><svg class="icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><span>${esc(label)}</span></div>
        </div></div>
      </figure>`;
  }

  return images.map((src, index) => {
    const alt = `${name} — ${label}, view ${index + 1}`;
    return `<figure class="gallery-figure${index === 0 ? ' gallery-figure--lead' : ''}" data-tilt data-reveal
        data-src="${esc(src)}" data-alt="${esc(alt)}" tabindex="0" role="button" aria-label="Enlarge ${esc(alt)}">
        <div class="tilt-plane">
          <div class="gallery-frame">
            <img src="${esc(src)}" alt="${esc(alt)}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
            <span class="grain" aria-hidden="true"></span>
            <span class="sheen" aria-hidden="true"></span>
          </div>
          <figcaption class="gallery-caption">${esc(label)} <span aria-hidden="true">·</span> View ${index + 1}</figcaption>
        </div>
      </figure>`;
  }).join('');
};

export const Product = {
  render(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      return `
        <div class="page-container container">
          <div class="page-message">
            <h2>Product not found</h2>
            <p>The piece you are looking for does not exist or has been removed.</p>
            <a href="/store" class="btn btn-primary">Return to Store</a>
          </div>
        </div>
      `;
    }

    const isFav = wishlist.has(product.id);
    const reviewCount = product.reviews.length;
    const reviewRating = reviewCount ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount : 0;
    const hasDiscount = product.originalPrice !== null;
    
    // Pick related products (excluding current, same category first, limit to 4)
    let related = products.filter(p => p.category === product.category && p.id !== product.id);
    if (related.length < 4) {
      const extra = products.filter(p => p.category !== product.category && p.id !== product.id);
      related = [...related, ...extra].slice(0, 4);
    } else {
      related = related.slice(0, 4);
    }

    // Swatch colors helper based on wood name
    const getWoodColor = (wood) => {
      const name = wood.toLowerCase();
      if (name.includes('walnut')) return '#4E3629';
      if (name.includes('oak')) return '#C0A37E';
      if (name.includes('maple')) return '#E6D2B8';
      if (name.includes('teak')) return '#9E7446';
      if (name.includes('cherry')) return '#8c3515';
      if (name.includes('beech')) return '#EAD2B2';
      if (name.includes('sapele')) return '#8D3C1B';
      if (name.includes('wenge')) return '#23160F';
      if (name.includes('padauk')) return '#B94A24';
      if (name.includes('zebra')) return '#A28259';
      if (name.includes('lati')) return '#E5C483';
      return '#B8860B'; // fallback wood gold
    };

    const getWoodSwatchStyle = (wood) => {
      const nameLower = wood.toLowerCase().trim();

      // Special multicolor swatch with 5-stripe gradient
      if (nameLower.includes('multicolor')) {
        return `background: linear-gradient(135deg, #d2b48c 0%, #d2b48c 20%, #c4965a 20%, #c4965a 40%, #a0522d 40%, #a0522d 60%, #3e2723 60%, #3e2723 80%, #8b2500 80%, #8b2500 100%);`;
      }
      
      const findWikiWood = (str) => {
        return woodsWiki.find(w => {
          const wikiName = w.name.toLowerCase();
          const wikiId = w.id.toLowerCase();
          return wikiName.includes(str) || str.includes(wikiName) || wikiId.includes(str) || str.includes(wikiId);
        });
      };

      const separators = ['&', 'and', '+', '/'];
      let parts = [nameLower];
      for (const sep of separators) {
        if (nameLower.includes(sep)) {
          parts = nameLower.split(sep).map(p => p.trim());
          break;
        }
      }

      const matchedWoods = parts.map(p => findWikiWood(p)).filter(Boolean);

      if (matchedWoods.length === 0) {
        return `background-color: ${getWoodColor(wood)};`;
      }

      if (matchedWoods.length === 1) {
        return `background: ${matchedWoods[0].swatch};`;
      }

      const urls = matchedWoods.map(w => {
        const m = w.swatch.match(/url\(['"]?([^'"]+)['"]?\)/);
        return m ? m[1] : null;
      }).filter(Boolean);

      if (urls.length >= 2) {
        return `background: url('${urls[0]}') left center / 50% 100% no-repeat, url('${urls[1]}') right center / 50% 100% no-repeat;`;
      }

      return `background: ${matchedWoods[0].swatch};`;
    };

    // Bundle recommendation items (e.g. Care items if product is a board, or vice versa)
    const currency = product.currency || 'EGP';
    const formatPrice = (val) => currency === 'EGP' ? `${val.toLocaleString()} EGP` : `$${val.toFixed(2)}`;
    
    // Determine initial active wood and its images/price
    const initialWood = product.woods ? product.woods[0] : product.woodType;
    let initialImages = [];
    let initialPrice = product.price;
    if (product.variants && product.variants[initialWood]) {
      initialImages = product.variants[initialWood].images;
      initialPrice = product.variants[initialWood].price;
    } else if (product.images) {
      initialImages = product.images;
    } else if (product.image) {
      initialImages = [product.image];
    }
    
    const hasImages = initialImages.length > 0 && !initialImages[0].includes('hero.png');

    const getConvertedPrice = (item) => {
      if (currency === 'EGP' && (!item.currency || item.currency === 'USD')) {
        return item.price * 50.0; // Mock rate: 1 USD = 50 EGP
      }
      return item.price;
    };

    const careItems = products.filter(p => p.category === 'care-maintenance').slice(0, 2);
    const bundleTotalOriginal = (initialPrice + careItems.reduce((s, i) => s + getConvertedPrice(i), 0));
    const bundleDiscountPrice = (bundleTotalOriginal * 0.9); // 10% off

    return `
      <div class="page-container container">
        
        <!-- Breadcrumbs -->
        <div class="product-breadcrumbs">
          <a href="/">Home</a> / <a href="/store">Store</a> / <a href="/store?category=${product.category}">${product.category.replace('-', ' & ')}</a> / <span>${product.name}</span>
        </div>

        <div class="product-detail-grid">
          <!-- Gallery Column -->
          <div class="product-gallery" id="product-gallery">
            ${galleryMarkup(hasImages ? initialImages : [], product.name, initialWood)}
          </div>

          <!-- Product Details & Buy Column -->
          <div class="product-info-col">
            <h1 class="product-detail-title">${product.name}</h1>
            
            <!-- Rating -->
            <div class="product-rating-row" ${reviewCount ? '' : 'hidden'}>
              <div class="star-rating">
                ${Array(5).fill(0).map((_, i) => `
                  <svg class="icon icon-sm ${i < Math.floor(reviewRating) ? 'icon-filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                `).join('')}
              </div>
              <a href="#reviews-anchor" class="rating-text">${reviewRating.toFixed(1)} (${reviewCount} Customer Reviews)</a>
            </div>

            <!-- Price -->
            <div class="product-detail-price">
              <span>${formatPrice(initialPrice)}</span>
              ${hasDiscount ? `<span class="product-detail-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>

            <!-- Description -->
            <p class="product-detail-desc">${product.description}</p><dl class="product-facts"><div><dt>Dimensions</dt><dd id="product-size-dimensions">${product.sizeDetails?.[product.sizes[0]]?.dimensions || product.dimensions}</dd></div><div><dt>Material</dt><dd id="product-selected-material">${initialWood}</dd></div></dl><p class="product-natural-note">Natural grain and colour vary. Each piece has its own character.</p>

            <!-- Sizing Variants: a selector with a single choice is noise, the
                 size is already stated in the facts row above. -->
            ${product.sizes.length > 1 ? `
            <div class="variant-selector">
              <span class="variant-label">Select Size</span>
              <div class="size-options">
                ${product.sizes.map((size, idx) => `
                  <button class="size-option ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
                `).join('')}
              </div>
            </div>` : ''}

            <!-- Wood Type Variants: hidden for single-finish pieces, whose
                 material is already named in the facts row. -->
            ${product.woods.length > 1 ? `
            <div class="variant-selector">
              <span class="variant-label">Select Wood Type</span>
              <div class="wood-options">
                ${product.woods.map((wood, idx) => {
                  const variant = product.variants ? product.variants[wood] : null;
                  const subtitle = variant && variant.subtitle ? variant.subtitle : '';
                  return `
                  <div class="wood-option ${idx === 0 ? 'active' : ''}" data-wood="${wood}">
                    <div class="wood-swatch">
                      <div class="wood-swatch-inner" style="${getWoodSwatchStyle(wood)}"></div>
                    </div>
                    <span class="wood-name">${wood}</span>
                    ${subtitle ? `<span class="wood-subtitle">${subtitle}</span>` : ''}
                  </div>
                `}).join('')}
              </div>
            </div>` : ''}

            <!-- Purchase Controls (Qty + Add to Cart + Wishlist) -->
            <div class="purchase-row">
              <div class="qty-input-wrapper">
                <button class="qty-btn" id="btn-qty-dec" aria-label="Decrease quantity">-</button>
                <span class="qty-val" id="detail-qty-val">1</span>
                <button class="qty-btn" id="btn-qty-inc" aria-label="Increase quantity">+</button>
              </div>
              
              <button class="btn btn-primary" id="btn-add-to-cart" ${product.inStock ? '' : 'disabled'}>
                ${product.inStock ? 'Add to bag' : 'Currently unavailable'}
              </button>
              
              <button class="product-card-wishlist ${isFav ? 'active' : ''}" id="btn-detail-wishlist" aria-label="Add to Wishlist">
                <svg class="icon ${isFav ? 'icon-filled' : ''}" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>

            <!-- Shipping Indicator -->
            <div class="shipping-indicator">
              <svg class="icon" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Delivery within Egypt. Contact us to confirm timing.</span>
            </div>

            <!-- Collapsible Accordions -->
            <div class="product-accordions">
              <div class="accordion-item active">
                <button class="accordion-trigger">
                  <span>Care & Maintenance</span>
                  <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-content">
                  <div class="accordion-content-inner">
                    ${product.careTips}
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <button class="accordion-trigger">
                  <span>Material Sourcing & Quality</span>
                  <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-content">
                  <div class="accordion-content-inner">
                    Each wood has its own grain, colour and texture. Select a material to see the corresponding product photographs. For details about the finish of a particular piece, <a href="/contact">contact our team</a>.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <button class="accordion-trigger">
                  <span>Dimensions & Weight</span>
                  <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-content">
                  <div class="accordion-content-inner">
                    Primary dimensions: ${product.dimensions}. Wood thickness is calibrated to ensure structural stability and resist warping. Handcrafted variations of up to 0.1 inches may occur.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Complete the Set Bundle Section -->
        ${careItems.length > 0 ? `
          <section class="bundle-box">
            <h3 class="bundle-title">Complete The Set</h3>
            <p class="bundle-intro">Buy this piece together with our recommended premium care products and receive <strong>10% off</strong> the entire bundle.</p>
            
            <div class="bundle-items-list">
              <!-- Primary Item -->
              <div class="bundle-item">
                <input type="checkbox" class="bundle-checkbox" checked disabled id="bundle-main-checkbox">
                <div class="bundle-item-img">
                  ${product.image && !product.image.includes('hero.png') ? `
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                  ` : `
                    <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                  `}
                </div>
                <div class="bundle-item-info">
                  <span class="bundle-item-name">${product.name} (This item)</span>
                  <span class="bundle-item-price">${formatPrice(initialPrice)}</span>
                </div>
              </div>

              <!-- Care Items -->
              ${careItems.map(item => {
                const itemPrice = getConvertedPrice(item);
                return `
                  <div class="bundle-item">
                    <input type="checkbox" class="bundle-checkbox bundle-care-toggle" data-id="${item.id}" data-price="${itemPrice}" checked>
                    <div class="bundle-item-img">
                      <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                    </div>
                    <div class="bundle-item-info">
                      <span class="bundle-item-name">${item.name}</span>
                      <span class="bundle-item-price">${formatPrice(itemPrice)}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="bundle-summary-row">
              <div>
                <span class="bundle-total-price">
                  Bundle Total: <strong id="bundle-total-sum">${formatPrice(bundleDiscountPrice)}</strong>
                  <span class="bundle-total-original" id="bundle-total-original">${formatPrice(bundleTotalOriginal)}</span>
                </span>
              </div>
              <button class="btn btn-accent" id="btn-add-bundle-cart">Add Bundle to Cart</button>
            </div>
          </section>
        ` : ''}

        <!-- Related Products Section -->
        <section class="section product-related">
          <div class="editorial-heading">
            <div>
              <span class="eyebrow">More from the collection</span>
              <h2>You may also like</h2>
            </div>
            <a href="/store" class="editorial-link">See all pieces <span aria-hidden="true">↗</span></a>
          </div>
          
          <div class="grid grid-cols-4" id="related-products-grid">
            ${related.map(p => ProductCard.render(p)).join('')}
          </div>
        </section>

        <!-- Customer Reviews -->
        <section class="reviews-section" id="reviews-anchor" ${reviewCount ? '' : 'hidden'}>
          <h3 class="reviews-title">Customer reviews</h3>
          
          <div class="reviews-summary">
            <div class="rating-big-box">
              <span class="rating-big-num">${reviewRating.toFixed(1)}</span>
              <div class="star-rating star-rating-lead">
                ${Array(5).fill(0).map((_, i) => `
                  <svg class="icon icon-sm ${i < Math.floor(reviewRating) ? 'icon-filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                `).join('')}
              </div>
              <span class="reviews-basis">Based on ${reviewCount} reviews</span>
            </div>

            <div>
              ${[5, 4, 3, 2, 1].map(stars => {
                const percent = reviewCount ? Math.round(product.reviews.filter(review => review.rating === stars).length / reviewCount * 100) : 0;
                return `<div class="rating-bar-row"><span>${stars} stars</span><div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${percent}%;"></div></div><span>${percent}%</span></div>`;
              }).join('')}
            </div>
          </div>

          <!-- Reviews Grid -->
          <div class="reviews-list">
            ${product.reviews.map(review => `
              <div class="review-card">
                <div class="review-meta">
                  <div>
                    <span class="review-author">${review.author}</span>
                    <div class="star-rating star-rating-sm">
                      ${Array(5).fill(0).map((_, i) => `
                        <svg class="icon icon-sm ${i < review.rating ? 'icon-filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      `).join('')}
                    </div>
                  </div>
                  <span class="review-date">${review.date}</span>
                </div>
                <p class="review-text">${review.comment}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  },

  init(productId) {
    window.scrollTo(0, 0);

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currency = product.currency || 'EGP';
    const formatPrice = (val) => currency === 'EGP' ? `${val.toLocaleString()} EGP` : `$${val.toFixed(2)}`;

    // Gallery: any figure opens the lightbox, by pointer or keyboard
    const gallery = document.getElementById('product-gallery');
    const bindGallery = () => {
      gallery?.querySelectorAll('.gallery-figure[data-src]').forEach(figure => {
        figure.addEventListener('click', () => Lightbox.show(figure.dataset.src, figure.dataset.alt || product.name));
        figure.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            figure.click();
          }
        });
      });
    };
    bindGallery();

    // Variant Options Selectors
    const sizes = document.querySelectorAll('.size-option');
    let selectedSize = product.sizes[0];
    sizes.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
      btn.addEventListener('click', () => {
        sizes.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
        document.getElementById('product-size-dimensions').textContent = product.sizeDetails?.[selectedSize]?.dimensions || product.dimensions;
        sizes.forEach(size => size.setAttribute('aria-pressed', String(size === btn)));
      });
    });

    const woods = document.querySelectorAll('.wood-option');
    let selectedWood = product.woods ? product.woods[0] : product.woodType;
    const careToggles = document.querySelectorAll('.bundle-care-toggle');
    const bundleSumText = document.getElementById('bundle-total-sum');
    const bundleOriginalText = document.getElementById('bundle-total-original');

    const updateBundlePrices = (currentWoodPrice) => {
      let total = currentWoodPrice;
      careToggles.forEach(chk => {
        if (chk.checked) {
          total += parseFloat(chk.dataset.price);
        }
      });
      if (bundleOriginalText) bundleOriginalText.innerText = formatPrice(total);
      if (bundleSumText) bundleSumText.innerText = formatPrice(total * 0.9);
    };

    woods.forEach(opt => {
      opt.tabIndex = 0;
      opt.setAttribute('role', 'button');
      opt.setAttribute('aria-label', 'Choose ' + opt.dataset.wood);
      opt.setAttribute('aria-pressed', String(opt.classList.contains('active')));
      opt.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); opt.click(); } });
      opt.addEventListener('click', () => {
        woods.forEach(w => w.classList.remove('active'));
        opt.classList.add('active');
        selectedWood = opt.dataset.wood;
        document.getElementById('product-selected-material').textContent = selectedWood;
        woods.forEach(wood => wood.setAttribute('aria-pressed', String(wood === opt)));
        
        if (product.variants && product.variants[selectedWood]) {
          const variant = product.variants[selectedWood];
          
          // Update Price display
          const priceSpan = document.querySelector('.product-detail-price span');
          if (priceSpan) {
            priceSpan.innerText = formatPrice(variant.price);
          }
          
          // Update Bundle Prices
          updateBundlePrices(variant.price);
          
          // Re-render the gallery for the newly chosen finish
          if (gallery) {
            gallery.innerHTML = galleryMarkup(variant.images || [], product.name, selectedWood);
            bindGallery();
            initMotion(gallery);
          }
        }
      });
    });

    // Qty controls
    const qtyVal = document.getElementById('detail-qty-val');
    const decBtn = document.getElementById('btn-qty-dec');
    const incBtn = document.getElementById('btn-qty-inc');
    let quantity = 1;

    if (qtyVal && decBtn && incBtn) {
      decBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          qtyVal.innerText = quantity;
        }
      });
      incBtn.addEventListener('click', () => {
        quantity++;
        qtyVal.innerText = quantity;
      });
    }

    // Add To Cart button
    const addToCartBtn = document.getElementById('btn-add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        if (!product.inStock) return;
        const selectedVariantPrice = product.variants?.[selectedWood]?.price ?? product.price;
        cart.add(product, quantity, {
          size: selectedSize,
          wood: selectedWood
        });
        analytics.track('add_to_cart', {
          currency: product.currency || 'EGP',
          value: selectedVariantPrice,
          items: [{ item_id: product.id, item_name: product.name, price: selectedVariantPrice, quantity }]
        });

        // Button feedback
        const originalText = addToCartBtn.innerText;
        addToCartBtn.innerText = 'Added to Cart ✓';
        addToCartBtn.style.backgroundColor = 'var(--color-success)';
        
        setTimeout(() => {
          addToCartBtn.innerText = originalText;
          addToCartBtn.style.backgroundColor = '';
          
          // Open Cart Drawer
          const panel = document.getElementById('cart-panel');
          const overlay = document.getElementById('cart-panel-overlay');
          if (panel && overlay) {
            panel.classList.add('active');
            overlay.classList.add('active');
          }
        }, 800);
      });
    }

    // Wishlist Button detail
    const wishlistBtn = document.getElementById('btn-detail-wishlist');
    if (wishlistBtn) {
      wishlistBtn.addEventListener('click', () => {
        const added = wishlist.toggle(product.id);
        wishlistBtn.classList.toggle('active', added);
        const svg = wishlistBtn.querySelector('svg');
        if (svg) svg.classList.toggle('icon-filled', added);
      });
    }

    // Related Products Section listeners
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
      ProductCard.setupListeners(relatedGrid, products);
    }

    // Collapsible Accordion logic
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const item = trig.closest('.accordion-item');
        item.classList.toggle('active');
      });
    });

    // Complete the Set Bundle Price Calculator and Action
    const addBundleBtn = document.getElementById('btn-add-bundle-cart');
    const careItems = products.filter(p => p.category === 'care-maintenance').slice(0, 2);

    const handleCareToggleChange = () => {
      let currentWoodPrice = product.price;
      if (product.variants && product.variants[selectedWood]) {
        currentWoodPrice = product.variants[selectedWood].price;
      }
      updateBundlePrices(currentWoodPrice);
    };

    careToggles.forEach(chk => {
      chk.addEventListener('change', handleCareToggleChange);
    });

    if (addBundleBtn) {
      addBundleBtn.addEventListener('click', () => {
        // Add main item
        cart.add(product, 1, {
          size: selectedSize,
          wood: selectedWood
        });

        // Add checked care items
        careToggles.forEach(chk => {
          if (chk.checked) {
            const id = chk.dataset.id;
            const careItem = careItems.find(c => c.id === id);
            if (careItem) {
              cart.add(careItem, 1, { size: 'Standard', wood: 'N/A' });
            }
          }
        });

        // Success state feedback
        addBundleBtn.innerText = 'Bundle Added ✓';
        addBundleBtn.style.backgroundColor = 'var(--color-success)';
        addBundleBtn.style.borderColor = 'var(--color-success)';
        
        setTimeout(() => {
          addBundleBtn.innerText = 'Add Bundle to Cart';
          addBundleBtn.style.backgroundColor = '';
          addBundleBtn.style.borderColor = '';
          
          // Open Cart Drawer
          const panel = document.getElementById('cart-panel');
          const overlay = document.getElementById('cart-panel-overlay');
          if (panel && overlay) {
            panel.classList.add('active');
            overlay.classList.add('active');
          }
        }, 800);
      });
    }
  }
};
