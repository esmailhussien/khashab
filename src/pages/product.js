/* 🪵 Khashab Product Detail Page View */

import { products } from '../data/products.js';
import { cart } from '../utils/cart.js';
import { wishlist } from '../utils/wishlist.js';
import { Lightbox } from '../components/lightbox.js';
import { ProductCard } from '../components/product-card.js';

export const Product = {
  render(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      return `
        <div class="page-container container">
          <div style="text-align: center; padding: 6rem 0;">
            <h2 style="font-family: var(--font-headings); font-size: 3rem; margin-bottom: 1.5rem;">Product Not Found</h2>
            <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 2rem;">The product you are looking for does not exist or has been removed.</p>
            <a href="#/store" class="btn btn-primary">Return to Store</a>
          </div>
        </div>
      `;
    }

    const isFav = wishlist.has(product.id);
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
      if (name.includes('olive')) return '#A67F52';
      if (name.includes('teak')) return '#9E7446';
      if (name.includes('cherry')) return '#8c3515';
      if (name.includes('beech')) return '#EAD2B2';
      return '#B8860B'; // fallback wood gold
    };

    // Bundle recommendation items (e.g. Care items if product is a board, or vice versa)
    const currency = product.currency || 'USD';
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
          <a href="#/">Home</a> / <a href="#/store">Store</a> / <a href="#/store?category=${product.category}">${product.category.replace('-', ' & ')}</a> / <span>${product.name}</span>
        </div>

        <div class="product-detail-grid">
          <!-- Gallery Column -->
          <div class="product-gallery">
            <div class="gallery-main" id="gallery-main-frame" style="cursor: pointer; border-radius: var(--radius-lg); overflow: hidden; position: relative;">
              ${hasImages ? `
                <img id="gallery-main-img" src="${initialImages[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                <span id="main-gallery-wood-text" style="position: absolute; bottom: 1rem; left: 1rem; background: rgba(0,0,0,0.6); color: #fff; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 300;">[ ${initialWood} Wood ]</span>
              ` : `
                <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
                  <svg class="icon" viewBox="0 0 24 24" style="width: 64px; height: 64px; stroke-width: 1.2;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                  <span id="main-gallery-wood-text">[ ${product.woodType} Wood ]</span>
                </div>
              `}
            </div>
            
            <div class="gallery-thumbnails" id="gallery-thumbs-container">
              ${hasImages ? 
                initialImages.map((img, idx) => `
                  <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                    <img src="${img}" alt="View ${idx + 1}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                `).join('')
              : `
                <div class="gallery-thumb active" data-index="0">
                  <div class="image-placeholder" style="height: 100%; padding: 0.25rem;">
                    <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                    <span style="font-size: 0.4rem;">Main View</span>
                  </div>
                </div>
                <div class="gallery-thumb" data-index="1">
                  <div class="image-placeholder" style="height: 100%; padding: 0.25rem;">
                    <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                    <span style="font-size: 0.4rem;">Angle 45°</span>
                  </div>
                </div>
                <div class="gallery-thumb" data-index="2">
                  <div class="image-placeholder" style="height: 100%; padding: 0.25rem;">
                    <svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                    <span style="font-size: 0.4rem;">Detail Grain</span>
                  </div>
                </div>
              `}
            </div>
          </div>

          <!-- Product Details & Buy Column -->
          <div class="product-info-col">
            <h2 class="product-detail-title">${product.name}</h2>
            
            <!-- Rating -->
            <div class="product-rating-row">
              <div class="star-rating">
                ${Array(5).fill(0).map((_, i) => `
                  <svg class="icon icon-sm ${i < Math.floor(product.rating) ? 'icon-filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                `).join('')}
              </div>
              <a href="#reviews-anchor" class="rating-text">${product.rating.toFixed(1)} (${product.reviewsCount} Customer Reviews)</a>
            </div>

            <!-- Price -->
            <div class="product-detail-price">
              <span>${formatPrice(initialPrice)}</span>
              ${hasDiscount ? `<span class="product-detail-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>

            <!-- Description -->
            <p class="product-detail-desc">${product.description}</p>

            <!-- Sizing Variants -->
            <div class="variant-selector">
              <span class="variant-label">Select Size</span>
              <div class="size-options">
                ${product.sizes.map((size, idx) => `
                  <button class="size-option ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
                `).join('')}
              </div>
            </div>

            <!-- Wood Type Variants -->
            <div class="variant-selector">
              <span class="variant-label">Select Wood Type</span>
              <div class="wood-options">
                ${product.woods.map((wood, idx) => `
                  <div class="wood-option ${idx === 0 ? 'active' : ''}" data-wood="${wood}">
                    <div class="wood-swatch">
                      <div class="wood-swatch-inner" style="background-color: ${getWoodColor(wood)};"></div>
                    </div>
                    <span class="wood-name">${wood}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Purchase Controls (Qty + Add to Cart + Wishlist) -->
            <div class="purchase-row">
              <div class="qty-input-wrapper">
                <button class="qty-btn" id="btn-qty-dec">-</button>
                <span class="qty-val" id="detail-qty-val">1</span>
                <button class="qty-btn" id="btn-qty-inc">+</button>
              </div>
              
              <button class="btn btn-primary" id="btn-add-to-cart" style="flex: 1; text-transform: uppercase;">
                Add To Cart
              </button>
              
              <button class="product-card-wishlist ${isFav ? 'active' : ''}" id="btn-detail-wishlist" style="position: static; width: 48px; height: 48px; border: 1px solid var(--color-border); border-radius: var(--radius-md);" aria-label="Add to Wishlist">
                <svg class="icon ${isFav ? 'icon-filled' : ''}" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>

            <!-- Shipping Indicator -->
            <div class="shipping-indicator">
              <svg class="icon" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Estimated shipping: 5–7 business days (Global delivery)</span>
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
                    All Khashab products are made from 100% natural, premium hardwood sourced from sustainably managed forests. No toxic glues or chemical finishes are used. We utilize only food-grade finishes (fractionated coconut mineral oil and pure beeswax) to ensure food safety and lifetime protection.
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
            <p style="color: var(--color-text-muted); margin-bottom: 2rem; font-weight: 300;">Buy this piece together with our recommended premium care products and receive <strong>10% off</strong> the entire bundle.</p>
            
            <div class="bundle-items-list">
              <!-- Primary Item -->
              <div class="bundle-item">
                <input type="checkbox" class="bundle-checkbox" checked disabled id="bundle-main-checkbox">
                <div class="bundle-item-img">
                  ${product.image && !product.image.includes('hero.png') ? `
                    <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-sm);">
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
                  Bundle Total: <strong id="bundle-total-sum" style="color: var(--color-accent);">${formatPrice(bundleDiscountPrice)}</strong>
                  <span style="font-size: 0.85rem; text-decoration: line-through; color: var(--color-text-light); margin-left: 0.5rem;" id="bundle-total-original">${formatPrice(bundleTotalOriginal)}</span>
                </span>
              </div>
              <button class="btn btn-accent" id="btn-add-bundle-cart">Add Bundle to Cart</button>
            </div>
          </section>
        ` : ''}

        <!-- Related Products Section -->
        <section class="section" style="border-top: 1px solid var(--color-border); padding-top: 4rem;">
          <div class="section-header">
            <h2>You May Also Like</h2>
            <p>Browse other handcrafted wooden pieces crafted to elevate your culinary experience.</p>
          </div>
          
          <div class="grid grid-cols-4" id="related-products-grid">
            ${related.map(p => ProductCard.render(p)).join('')}
          </div>
        </section>

        <!-- Customer Reviews -->
        <section class="reviews-section" id="reviews-anchor">
          <h3 style="font-family: var(--font-headings); font-size: 1.8rem; margin-bottom: 2rem;">Customer Reviews</h3>
          
          <div class="reviews-summary">
            <div class="rating-big-box">
              <span class="rating-big-num">${product.rating.toFixed(1)}</span>
              <div class="star-rating" style="justify-content: center; margin: 0.5rem 0;">
                ${Array(5).fill(0).map((_, i) => `
                  <svg class="icon icon-sm ${i < Math.floor(product.rating) ? 'icon-filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                `).join('')}
              </div>
              <span style="font-size: 0.85rem; color: var(--color-text-light);">Based on ${product.reviewsCount} reviews</span>
            </div>

            <div>
              <div class="rating-bar-row">
                <span>5 stars</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 85%;"></div></div>
                <span>85%</span>
              </div>
              <div class="rating-bar-row">
                <span>4 stars</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 12%;"></div></div>
                <span>12%</span>
              </div>
              <div class="rating-bar-row">
                <span>3 stars</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 3%;"></div></div>
                <span>3%</span>
              </div>
              <div class="rating-bar-row">
                <span>2 stars</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 0%;"></div></div>
                <span>0%</span>
              </div>
              <div class="rating-bar-row">
                <span>1 star</span>
                <div class="rating-bar-track"><div class="rating-bar-fill" style="width: 0%;"></div></div>
                <span>0%</span>
              </div>
            </div>
          </div>

          <!-- Reviews Grid -->
          <div class="reviews-list">
            ${product.reviews.map(review => `
              <div class="review-card">
                <div class="review-meta">
                  <div>
                    <span class="review-author">${review.author}</span>
                    <div class="star-rating" style="margin-top: 0.25rem;">
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

    const currency = product.currency || 'USD';
    const formatPrice = (val) => currency === 'EGP' ? `${val.toLocaleString()} EGP` : `$${val.toFixed(2)}`;

    // Gallery Main Lightbox Zoom Trigger
    const mainFrame = document.getElementById('gallery-main-frame');
    if (mainFrame) {
      mainFrame.addEventListener('click', () => {
        const mainImg = document.getElementById('gallery-main-img');
        const zoomSrc = mainImg ? mainImg.src : '/assets/hero.png';
        Lightbox.show(zoomSrc, `${product.name} zoomed detail`);
      });
    }

    // Thumbnail Switching and event binding
    const bindThumbnailEvents = () => {
      const thumbs = document.querySelectorAll('.gallery-thumb');
      const mainImg = document.getElementById('gallery-main-img');
      const woodText = document.getElementById('main-gallery-wood-text');
      
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          
          const idx = parseInt(thumb.dataset.index);
          const activeWood = document.querySelector('.wood-option.active')?.dataset.wood || product.woodType;
          
          let currentImages = [];
          if (product.variants && product.variants[activeWood]) {
            currentImages = product.variants[activeWood].images;
          } else if (product.images) {
            currentImages = product.images;
          } else if (product.image) {
            currentImages = [product.image];
          }
          
          if (mainImg && currentImages[idx]) {
            mainImg.src = currentImages[idx];
          }
          if (woodText) {
            woodText.innerText = `[ ${activeWood} Wood - View ${idx + 1} ]`;
          }
        });
      });
    };
    bindThumbnailEvents();

    // Variant Options Selectors
    const sizes = document.querySelectorAll('.size-option');
    let selectedSize = product.sizes[0];
    sizes.forEach(btn => {
      btn.addEventListener('click', () => {
        sizes.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
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
      opt.addEventListener('click', () => {
        woods.forEach(w => w.classList.remove('active'));
        opt.classList.add('active');
        selectedWood = opt.dataset.wood;
        
        const woodText = document.getElementById('main-gallery-wood-text');
        if (woodText) {
          woodText.innerText = `[ ${selectedWood} Wood ]`;
        }

        if (product.variants && product.variants[selectedWood]) {
          const variant = product.variants[selectedWood];
          
          // Update Price display
          const priceSpan = document.querySelector('.product-detail-price span');
          if (priceSpan) {
            priceSpan.innerText = formatPrice(variant.price);
          }
          
          // Update Bundle Prices
          updateBundlePrices(variant.price);
          
          // Update Main Image
          const mainImg = document.getElementById('gallery-main-img');
          if (mainImg && variant.images.length > 0) {
            mainImg.src = variant.images[0];
          }
          
          // Update Thumbnails container HTML
          const thumbsContainer = document.getElementById('gallery-thumbs-container');
          if (thumbsContainer) {
            thumbsContainer.innerHTML = variant.images.map((img, idx) => `
              <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" alt="View ${idx + 1}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            `).join('');
            
            // Rebind click events to new thumbnails
            bindThumbnailEvents();
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
        cart.add(product, quantity, {
          size: selectedSize,
          wood: selectedWood
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
