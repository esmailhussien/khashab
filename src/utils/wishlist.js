/* 🪵 Khashab Wishlist Management Utility */

export const wishlist = {
  get() {
    return JSON.parse(localStorage.getItem('khashab_wishlist')) || [];
  },

  set(items) {
    localStorage.setItem('khashab_wishlist', JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: items }));
  },

  toggle(productId) {
    const items = this.get();
    const index = items.indexOf(productId);
    
    if (index > -1) {
      items.splice(index, 1); // Remove
    } else {
      items.push(productId); // Add
    }
    
    this.set(items);
    return index === -1; // returns true if added, false if removed
  },

  has(productId) {
    return this.get().includes(productId);
  },

  getCount() {
    return this.get().length;
  },

  clear() {
    this.set([]);
  }
};
