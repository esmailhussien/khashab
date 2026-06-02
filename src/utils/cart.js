/* 🪵 Khashab Cart Management Utility */

export const cart = {
  get() {
    return JSON.parse(localStorage.getItem('khashab_cart')) || [];
  },

  set(items) {
    localStorage.setItem('khashab_cart', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
  },

  add(product, quantity = 1, options = {}) {
    const items = this.get();
    
    // Create unique key based on product ID and selected options (size, wood)
    const size = options.size || 'Standard';
    const wood = options.wood || product.woodType;
    const cartItemId = `${product.id}-${size.replace(/\s+/g, '-')}-${wood}`;

    // Resolve variant price and image
    let finalPrice = product.price;
    let finalImage = product.image;
    if (product.variants && product.variants[wood]) {
      finalPrice = product.variants[wood].price;
      finalImage = product.variants[wood].images[0];
    }

    const existingIndex = items.findIndex(item => item.cartItemId === cartItemId);
    
    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        cartItemId,
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: finalImage,
        woodType: wood,
        size: size,
        quantity: quantity,
        currency: product.currency || 'USD'
      });
    }

    this.set(items);
  },

  remove(cartItemId) {
    const items = this.get();
    const filtered = items.filter(item => item.cartItemId !== cartItemId);
    this.set(filtered);
  },

  updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
      this.remove(cartItemId);
      return;
    }
    
    const items = this.get();
    const item = items.find(item => item.cartItemId === cartItemId);
    if (item) {
      item.quantity = quantity;
      this.set(items);
    }
  },

  getCount() {
    return this.get().reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotal() {
    return this.get().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  clear() {
    this.set([]);
  }
};
