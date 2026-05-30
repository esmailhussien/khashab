/* 🪵 Khashab Lightbox Zoom Overlay Component */

export const Lightbox = {
  render() {
    return `
      <div class="lightbox-modal" id="global-lightbox">
        <button class="lightbox-close" id="btn-lightbox-close" aria-label="Close Lightbox">&times;</button>
        <img src="" alt="" class="lightbox-content" id="lightbox-image">
      </div>
    `;
  },

  init() {
    const modal = document.getElementById('global-lightbox');
    const closeBtn = document.getElementById('btn-lightbox-close');
    
    if (!modal) return;

    const closeLightbox = () => {
      modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeLightbox();
      }
    });
  },

  show(src, alt = '') {
    const modal = document.getElementById('global-lightbox');
    const img = document.getElementById('lightbox-image');
    
    if (modal && img) {
      img.src = src;
      img.alt = alt;
      modal.classList.add('active');
    }
  }
};
