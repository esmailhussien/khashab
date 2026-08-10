/* Pre-launch Catalog Studio */

import { allProducts, products, productCatalog } from '../data/products.js';
import { categories } from '../data/categories.js';
import { toast } from '../utils/toast.js';

const escapeHTML = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const escapeAttribute = escapeHTML;
const toLineList = (value) => Array.isArray(value) ? value.join(', ') : '';
const formatPrice = (product) => product.currency === 'USD'
  ? `$${Number(product.price || 0).toFixed(2)}`
  : `${Number(product.price || 0).toLocaleString()} EGP`;

const getVariantText = (product) => Object.entries(product.variants || {})
  .map(([wood, variant]) => `${wood} | ${variant.price ?? 0} | ${(variant.images || []).join(', ')}`)
  .join('\n');

const showConfirmModal = ({ title, message, confirmText = 'Confirm', confirmClass = 'catalog-delete-button', onConfirm }) => {
  const backdrop = document.createElement('div');
  backdrop.className = 'catalog-confirm-backdrop';
  backdrop.innerHTML = `
    <div class="catalog-confirm-dialog" role="dialog" aria-modal="true">
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(message)}</p>
      <div class="catalog-confirm-actions">
        <button class="btn btn-secondary catalog-confirm-cancel" type="button">Cancel</button>
        <button class="btn ${confirmClass} catalog-confirm-proceed" type="button">${escapeHTML(confirmText)}</button>
      </div>
    </div>
  `;

  const close = () => {
    backdrop.classList.add('leaving');
    setTimeout(() => {
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    }, 200);
  };

  backdrop.querySelector('.catalog-confirm-cancel').addEventListener('click', close);
  backdrop.querySelector('.catalog-confirm-proceed').addEventListener('click', () => {
    close();
    onConfirm();
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  document.body.appendChild(backdrop);
};

const parseVariants = (value) => {
  const variants = {};

  String(value || '').split('\n').forEach((row) => {
    const [rawWood, rawPrice, rawImages = ''] = row.split('|').map(part => part.trim());
    if (!rawWood) return;

    const price = Number(rawPrice);
    variants[rawWood] = {
      price: Number.isFinite(price) && price >= 0 ? price : 0,
      images: rawImages.split(',').map(image => image.trim()).filter(Boolean)
    };
  });

  return variants;
};

const emptyProduct = () => ({
  id: '',
  name: '',
  category: categories[0]?.id || 'decorative',
  status: 'draft',
  price: 0,
  originalPrice: null,
  currency: 'EGP',
  woodType: 'Natural wood',
  dimensions: '',
  image: '',
  description: '',
  careTips: '',
  sizes: ['Standard'],
  woods: ['Natural wood'],
  variants: {},
  inStock: true,
  featured: false
});

const editorFields = (product) => `
  <form id="catalog-editor-form" class="catalog-editor-form" novalidate>
    <div class="catalog-form-header">
      <div>
        <p class="catalog-eyebrow">${product.id ? 'Edit catalog item' : 'New catalog item'}</p>
        <h2>${product.id ? 'Edit product' : 'Add product'}</h2>
      </div>
      <button class="catalog-icon-button" type="button" id="catalog-close-editor" aria-label="Close editor">×</button>
    </div>

    <div id="catalog-form-message" class="catalog-form-message" aria-live="polite"></div>

    <div class="catalog-form-grid">
      <label class="catalog-field catalog-field-wide">
        <span>Product name *</span>
        <input name="name" required value="${escapeAttribute(product.name)}" placeholder="e.g. Walnut serving board">
      </label>
      <label class="catalog-field">
        <span>Product ID / slug *</span>
        <input name="id" required pattern="[a-z0-9-]+" value="${escapeAttribute(product.id)}" placeholder="walnut-serving-board">
      </label>
      <label class="catalog-field">
        <span>Status</span>
        <select name="status">
          <option value="draft" ${product.status === 'draft' ? 'selected' : ''}>Draft — hidden from store</option>
          <option value="published" ${product.status === 'published' ? 'selected' : ''}>Published — visible in store</option>
        </select>
      </label>
      <label class="catalog-field">
        <span>Category</span>
        <select name="category">
          ${categories.map(category => `<option value="${escapeAttribute(category.id)}" ${product.category === category.id ? 'selected' : ''}>${escapeHTML(category.name)}</option>`).join('')}
        </select>
      </label>
      <label class="catalog-field">
        <span>Currency</span>
        <input name="currency" value="EGP" readonly aria-readonly="true">
      </label>
      <label class="catalog-field">
        <span>Base price *</span>
        <input name="price" required type="number" min="0" step="0.01" value="${escapeAttribute(product.price)}">
      </label>
      <label class="catalog-field">
        <span>Compare-at price</span>
        <input name="originalPrice" type="number" min="0" step="0.01" value="${product.originalPrice ?? ''}" placeholder="Optional">
      </label>
      <label class="catalog-field">
        <span>Default wood</span>
        <input name="woodType" value="${escapeAttribute(product.woodType)}" placeholder="Walnut">
      </label>
      <label class="catalog-field">
        <span>Dimensions / weight</span>
        <input name="dimensions" value="${escapeAttribute(product.dimensions)}" placeholder="35 cm × 25 cm">
      </label>
      <label class="catalog-field catalog-field-wide">
        <span>Primary image path or URL *</span>
        <input name="image" required value="${escapeAttribute(product.image)}" placeholder="/assets/products/product/image-1.webp">
        <small>Use a genuine product image. Products without one are always saved as Draft.</small>
      </label>
      <label class="catalog-field catalog-field-wide">
        <span>Description</span>
        <textarea name="description" rows="4" placeholder="What makes this piece special?">${escapeHTML(product.description)}</textarea>
      </label>
      <label class="catalog-field catalog-field-wide">
        <span>Care instructions</span>
        <textarea name="careTips" rows="3" placeholder="Care instructions for the customer">${escapeHTML(product.careTips)}</textarea>
      </label>
      <label class="catalog-field">
        <span>Sizes — comma separated</span>
        <input name="sizes" value="${escapeAttribute(toLineList(product.sizes))}" placeholder="Small, Large">
      </label>
      <label class="catalog-field">
        <span>Wood options — comma separated</span>
        <input name="woods" value="${escapeAttribute(toLineList(product.woods))}" placeholder="Walnut, Oak">
      </label>
      <label class="catalog-field catalog-field-wide">
        <span>Variants — one per line</span>
        <textarea name="variants" rows="5" placeholder="Walnut | 1500 | /assets/products/board/walnut-1.webp, /assets/products/board/walnut-2.webp">${escapeHTML(getVariantText(product))}</textarea>
        <small>Format: <code>Wood name | price | image 1, image 2</code>. Leave blank for a single-price product.</small>
      </label>
    </div>

    <div class="catalog-switches">
      <label><input name="inStock" type="checkbox" ${product.inStock ? 'checked' : ''}> Available for sale</label>
      <label><input name="featured" type="checkbox" ${product.featured ? 'checked' : ''}> Show in featured products</label>
    </div>

    <div class="catalog-form-actions">
      ${product.id ? '<button class="btn catalog-delete-button" type="button" id="catalog-delete-product">Delete product</button>' : '<span></span>'}
      <button class="btn btn-primary" type="submit">Save product</button>
    </div>
  </form>
`;

export const Admin = {
  render() {
    const drafts = allProducts.filter(product => product.status === 'draft').length;
    const visible = products.length;

    return `
      <section class="page-container container catalog-studio">
        <div class="catalog-studio-head">
          <div>
            <p class="catalog-eyebrow">Pre-launch workspace</p>
            <h1>Catalog Studio</h1>
            <p>Manage product details, prices, variants, and real product imagery before the launch.</p>
          </div>
          <div class="catalog-local-note">
            <strong>Local preview mode</strong>
            <span>Changes are saved only in this browser until a secure database is connected.</span>
          </div>
        </div>

        <div class="catalog-stats" id="catalog-stats">
          <div><strong id="stat-total">${allProducts.length}</strong><span>Catalog items</span></div>
          <div><strong id="stat-published">${visible}</strong><span>Published</span></div>
          <div><strong id="stat-drafts">${drafts}</strong><span>Drafts requiring review</span></div>
        </div>

        <div class="catalog-tabs" id="catalog-status-tabs">
          <button class="catalog-tab-btn active" data-status="all" type="button">
            All <span class="catalog-tab-count" id="tab-count-all">${allProducts.length}</span>
          </button>
          <button class="catalog-tab-btn" data-status="published" type="button">
            Published <span class="catalog-tab-count" id="tab-count-published">${visible}</span>
          </button>
          <button class="catalog-tab-btn" data-status="draft" type="button">
            Drafts <span class="catalog-tab-count" id="tab-count-draft">${drafts}</span>
          </button>
        </div>

        <div class="catalog-toolbar">
          <label class="catalog-search">
            <span class="visually-hidden">Search catalog</span>
            <input id="catalog-search-input" type="search" placeholder="Search products, categories, or IDs">
          </label>

          <select id="catalog-category-filter" class="catalog-category-select">
            <option value="all">All Categories</option>
            ${categories.map(cat => `<option value="${escapeAttribute(cat.id)}">${escapeHTML(cat.name)}</option>`).join('')}
          </select>

          <div class="catalog-toolbar-actions">
            <button class="btn btn-secondary" type="button" id="catalog-export">Export JSON</button>
            <button class="btn btn-secondary" type="button" id="catalog-import-trigger">Import JSON</button>
            <input id="catalog-import-file" type="file" accept="application/json" hidden>
            <button class="btn btn-primary" type="button" id="catalog-new-product">Add product</button>
          </div>
        </div>

        <div id="catalog-list" class="catalog-list"></div>
        <aside id="catalog-editor" class="catalog-editor" aria-live="polite"></aside>

        <!-- Floating Bulk Actions Bar -->
        <div class="catalog-bulk-bar" id="catalog-bulk-bar">
          <span class="catalog-bulk-count" id="catalog-bulk-count">0 items selected</span>
          <div class="catalog-bulk-actions">
            <button class="btn btn-secondary catalog-bulk-btn" type="button" id="bulk-publish-btn">Publish Selected</button>
            <button class="btn btn-secondary catalog-bulk-btn" type="button" id="bulk-draft-btn">Set to Draft</button>
            <button class="btn catalog-bulk-delete-btn" type="button" id="bulk-delete-btn">Delete Selected</button>
            <button class="catalog-bulk-close" type="button" id="bulk-clear-btn" aria-label="Clear selection">&times;</button>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    const list = document.getElementById('catalog-list');
    const editor = document.getElementById('catalog-editor');
    const bulkBar = document.getElementById('catalog-bulk-bar');
    const bulkCountEl = document.getElementById('catalog-bulk-count');
    const search = document.getElementById('catalog-search-input');
    const categorySelect = document.getElementById('catalog-category-filter');
    const statusTabs = document.querySelectorAll('#catalog-status-tabs .catalog-tab-btn');
    const importFile = document.getElementById('catalog-import-file');
    
    let currentStatus = 'all';
    let currentCategory = 'all';
    let editingProduct = null;
    const selectedIds = new Set();

    // Move editor overlay & bulk bar to document.body so they escape the .page-container
    // transform stacking context (transform breaks position:fixed).
    if (editor) document.body.appendChild(editor);
    if (bulkBar) document.body.appendChild(bulkBar);

    const updateBulkBar = () => {
      if (!bulkBar || !bulkCountEl) return;
      if (selectedIds.size > 0) {
        bulkCountEl.textContent = `${selectedIds.size} item${selectedIds.size === 1 ? '' : 's'} selected`;
        bulkBar.classList.add('is-visible');
      } else {
        bulkBar.classList.remove('is-visible');
      }
    };

    const updateStats = () => {
      const total = allProducts.length;
      const pubCount = products.length;
      const draftCount = allProducts.filter(p => p.status === 'draft').length;

      const statTotal = document.getElementById('stat-total');
      const statPub = document.getElementById('stat-published');
      const statDrafts = document.getElementById('stat-drafts');
      const tabAll = document.getElementById('tab-count-all');
      const tabPub = document.getElementById('tab-count-published');
      const tabDraft = document.getElementById('tab-count-draft');

      if (statTotal) statTotal.textContent = total;
      if (statPub) statPub.textContent = pubCount;
      if (statDrafts) statDrafts.textContent = draftCount;
      if (tabAll) tabAll.textContent = total;
      if (tabPub) tabPub.textContent = pubCount;
      if (tabDraft) tabDraft.textContent = draftCount;
    };

    const renderList = () => {
      if (!list) return;
      const query = search?.value.trim().toLowerCase() || '';

      let filtered = [...allProducts];

      // Filter by Status Tab
      if (currentStatus !== 'all') {
        filtered = filtered.filter(p => p.status === currentStatus);
      }

      // Filter by Category Select
      if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
      }

      // Filter by Search Query
      if (query) {
        filtered = filtered.filter(product => [product.name, product.id, product.category, product.woodType]
          .some(value => String(value || '').toLowerCase().includes(query)));
      }

      list.innerHTML = filtered.length ? filtered.map(product => `
        <article class="catalog-product-row">
          <div class="catalog-row-checkbox-wrapper">
            <input type="checkbox" 
                   class="catalog-row-checkbox" 
                   data-id="${escapeAttribute(product.id)}"
                   ${selectedIds.has(product.id) ? 'checked' : ''}
                   aria-label="Select ${escapeAttribute(product.name)}">
          </div>
          <div class="catalog-product-image">
            ${product.image ? `<img src="${escapeAttribute(product.image)}" alt="">` : '<span>NO IMAGE</span>'}
          </div>
          <div class="catalog-product-details">
            <div class="catalog-product-title-row">
              <h2>${escapeHTML(product.name)}</h2>
              <button class="catalog-status catalog-status-${product.status} catalog-status-toggle" 
                      type="button" 
                      data-id="${escapeAttribute(product.id)}" 
                      title="Click to toggle status to ${product.status === 'published' ? 'draft' : 'published'}">
                ${product.status}
              </button>
            </div>
            <p>${escapeHTML(product.category)} · ${escapeHTML(product.woodType)} · ${escapeHTML(product.dimensions)}</p>
            <small>${escapeHTML(product.id)}</small>
          </div>
          <strong class="catalog-product-price">${formatPrice(product)}</strong>
          <button class="btn btn-secondary catalog-edit-button" type="button" data-id="${escapeAttribute(product.id)}">Edit</button>
        </article>
      `).join('') : '<div class="catalog-empty-state">No products match your current search and filters.</div>';

      list.querySelectorAll('.catalog-edit-button').forEach(button => {
        button.addEventListener('click', () => openEditor(allProducts.find(product => product.id === button.dataset.id)));
      });

      // Row Selection Listeners
      list.querySelectorAll('.catalog-row-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
          const id = cb.dataset.id;
          if (cb.checked) {
            selectedIds.add(id);
          } else {
            selectedIds.delete(id);
          }
          updateBulkBar();
        });
      });

      // Quick inline status toggle listener
      list.querySelectorAll('.catalog-status-toggle').forEach(badge => {
        badge.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = badge.dataset.id;
          const targetProduct = allProducts.find(p => p.id === id);
          if (!targetProduct) return;

          const nextStatus = targetProduct.status === 'published' ? 'draft' : 'published';
          
          const updated = productCatalog.upsert({
            ...targetProduct,
            status: nextStatus
          });

          toast.info(`“${updated.name}” set to ${updated.status}`);
          renderList();
        });
      });

      updateStats();
      updateBulkBar();
    };

    const closeEditor = () => {
      editingProduct = null;
      if (editor) {
        editor.classList.remove('is-open');
        editor.innerHTML = '';
      }
    };

    const openEditor = (product) => {
      if (!editor || !product) return;
      editingProduct = product;
      editor.innerHTML = editorFields(product);
      editor.classList.add('is-open');

      document.getElementById('catalog-close-editor')?.addEventListener('click', closeEditor);
      document.getElementById('catalog-delete-product')?.addEventListener('click', () => {
        showConfirmModal({
          title: 'Delete Product',
          message: `Are you sure you want to delete “${product.name}” from the local catalog?`,
          confirmText: 'Delete Product',
          onConfirm: () => {
            const name = product.name;
            productCatalog.remove(product.id);
            closeEditor();
            renderList();
            toast.warning(`“${name}” removed from catalog`);
          }
        });
      });

      document.getElementById('catalog-editor-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const id = String(form.get('id') || '').trim().toLowerCase();
        const name = String(form.get('name') || '').trim();
        const message = document.getElementById('catalog-form-message');

        if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
          const err = 'Add a product name and an ID made of lowercase letters, numbers, and hyphens.';
          if (message) message.textContent = err;
          toast.error(err);
          return;
        }

        const conflictingProduct = allProducts.find(item => item.id === id && item.id !== product.id);
        if (conflictingProduct) {
          const err = 'This product ID is already in use. Choose a different ID.';
          if (message) message.textContent = err;
          toast.error(err);
          return;
        }

        const variants = parseVariants(form.get('variants'));
        const saved = productCatalog.upsert({
          ...product,
          id,
          name,
          status: form.get('status'),
          category: form.get('category'),
          currency: form.get('currency'),
          price: form.get('price'),
          originalPrice: form.get('originalPrice'),
          woodType: form.get('woodType'),
          dimensions: form.get('dimensions'),
          image: form.get('image'),
          description: form.get('description'),
          careTips: form.get('careTips'),
          sizes: String(form.get('sizes') || '').split(',').map(item => item.trim()).filter(Boolean),
          woods: String(form.get('woods') || '').split(',').map(item => item.trim()).filter(Boolean),
          variants,
          inStock: form.get('inStock') === 'on',
          featured: form.get('featured') === 'on'
        });

        editingProduct = saved;
        openEditor(saved);
        
        if (saved.status === 'draft' && form.get('status') === 'published') {
          const msg = 'Saved as Draft: add a real product image before publishing.';
          const successMessage = document.getElementById('catalog-form-message');
          if (successMessage) successMessage.textContent = msg;
          toast.warning(msg);
        } else {
          toast.success(`“${saved.name}” saved successfully!`);
        }
        renderList();
      });
    };

    statusTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        statusTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentStatus = tab.dataset.status;
        renderList();
      });
    });

    categorySelect?.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      renderList();
    });

    search?.addEventListener('input', renderList);
    document.getElementById('catalog-new-product')?.addEventListener('click', () => openEditor(emptyProduct()));

    document.getElementById('catalog-export')?.addEventListener('click', () => {
      const items = productCatalog.getAll();
      const content = JSON.stringify(items, null, 2);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
      link.download = `khashab-catalog-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast.success(`Exported ${items.length} catalog items`);
    });

    document.getElementById('catalog-import-trigger')?.addEventListener('click', () => importFile?.click());
    importFile?.addEventListener('change', async () => {
      const [file] = importFile.files || [];
      if (!file) return;

      try {
        const importedCatalog = JSON.parse(await file.text());
        if (!Array.isArray(importedCatalog)) throw new Error('The file must contain a product array.');
        
        showConfirmModal({
          title: 'Import Catalog',
          message: `Replace current local catalog with ${importedCatalog.length} imported products?`,
          confirmText: 'Replace Catalog',
          confirmClass: 'btn-primary',
          onConfirm: () => {
            productCatalog.replace(importedCatalog);
            closeEditor();
            renderList();
            toast.success(`Imported ${importedCatalog.length} catalog items`);
          }
        });
      } catch (error) {
        toast.error(error.message || 'Could not import this JSON file.');
      } finally {
        importFile.value = '';
      }
    });

    // Bulk Action Handlers
    document.getElementById('bulk-publish-btn')?.addEventListener('click', () => {
      if (selectedIds.size === 0) return;
      const count = selectedIds.size;
      selectedIds.forEach(id => {
        const item = allProducts.find(p => p.id === id);
        if (item) productCatalog.upsert({ ...item, status: 'published' });
      });
      toast.success(`${count} item${count === 1 ? '' : 's'} updated to Published`);
      selectedIds.clear();
      renderList();
    });

    document.getElementById('bulk-draft-btn')?.addEventListener('click', () => {
      if (selectedIds.size === 0) return;
      const count = selectedIds.size;
      selectedIds.forEach(id => {
        const item = allProducts.find(p => p.id === id);
        if (item) productCatalog.upsert({ ...item, status: 'draft' });
      });
      toast.info(`${count} item${count === 1 ? '' : 's'} set to Draft`);
      selectedIds.clear();
      renderList();
    });

    document.getElementById('bulk-delete-btn')?.addEventListener('click', () => {
      if (selectedIds.size === 0) return;
      const count = selectedIds.size;

      showConfirmModal({
        title: 'Delete Selected Products',
        message: `Are you sure you want to delete ${count} selected catalog item${count === 1 ? '' : 's'}?`,
        confirmText: `Delete ${count} Item${count === 1 ? '' : 's'}`,
        onConfirm: () => {
          productCatalog.remove(selectedIds);
          toast.warning(`${count} item${count === 1 ? '' : 's'} removed from catalog`);
          selectedIds.clear();
          renderList();
        }
      });
    });

    document.getElementById('bulk-clear-btn')?.addEventListener('click', () => {
      selectedIds.clear();
      renderList();
    });

    renderList();

    // Cleanup: remove editor and bulk bar from body when navigating away from admin
    const cleanup = () => {
      if (editor && editor.parentNode === document.body) {
        editor.classList.remove('is-open');
        document.body.removeChild(editor);
      }
      if (bulkBar && bulkBar.parentNode === document.body) {
        bulkBar.classList.remove('is-visible');
        document.body.removeChild(bulkBar);
      }
    };
    window.addEventListener('popstate', cleanup, { once: true });
  }
};
