/* 🪵 Khashab Toast Notification Utility */

let toastContainer = null;

const getContainer = () => {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'khashab-toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

export const toast = {
  show(message, type = 'success', duration = 3500) {
    const container = getContainer();

    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;

    let iconSVG = '';
    if (type === 'success') {
      iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'error') {
      iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === 'info') {
      iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    } else if (type === 'warning') {
      iconSVG = `<svg class="toast-icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    }

    toastEl.innerHTML = `
      ${iconSVG}
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    const closeBtn = toastEl.querySelector('.toast-close');
    const dismiss = () => {
      if (toastEl.classList.contains('toast-leaving')) return;
      toastEl.classList.add('toast-leaving');
      setTimeout(() => {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);
    container.appendChild(toastEl);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  },

  success(message, duration) {
    this.show(message, 'success', duration);
  },

  error(message, duration) {
    this.show(message, 'error', duration);
  },

  info(message, duration) {
    this.show(message, 'info', duration);
  },

  warning(message, duration) {
    this.show(message, 'warning', duration);
  }
};
