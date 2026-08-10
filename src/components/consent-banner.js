import { analytics } from '../utils/analytics.js';

export const ConsentBanner = {
  render() {
    if (!analytics.isConfigured() || analytics.hasConsent() || window.localStorage.getItem('khashab_analytics_consent') === 'denied') return '';

    return `
      <aside class="consent-banner" id="consent-banner" aria-label="Cookie preferences">
        <p>We use optional analytics cookies to improve Khashab. You can accept or decline them.</p>
        <div>
          <button class="btn btn-secondary" id="consent-reject" type="button">Decline</button>
          <button class="btn btn-primary" id="consent-accept" type="button">Accept</button>
        </div>
      </aside>
    `;
  },

  init() {
    document.getElementById('consent-accept')?.addEventListener('click', () => {
      analytics.setConsent(true);
      document.getElementById('consent-banner')?.remove();
    });
    document.getElementById('consent-reject')?.addEventListener('click', () => {
      analytics.setConsent(false);
      document.getElementById('consent-banner')?.remove();
    });
  }
};
