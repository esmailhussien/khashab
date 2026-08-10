/* Consent-first GA4 and Meta Pixel loader. Never pass personal data here. */

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
const CONSENT_KEY = 'khashab_analytics_consent';

const hasConsent = () => window.localStorage.getItem(CONSENT_KEY) === 'granted';
const loadScript = (source) => {
  if (document.querySelector(`script[src="${source}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = source;
  document.head.appendChild(script);
};

export const analytics = {
  isConfigured() {
    return Boolean(gaMeasurementId || metaPixelId);
  },

  hasConsent,

  initialise() {
    if (!hasConsent()) return;

    if (gaMeasurementId) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`);
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', gaMeasurementId, { anonymize_ip: true });
    }

    if (metaPixelId && !window.fbq) {
      window.fbq = function fbq() { window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments); };
      window.fbq.queue = [];
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq('init', metaPixelId);
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
    }
  },

  setConsent(value) {
    window.localStorage.setItem(CONSENT_KEY, value ? 'granted' : 'denied');
    if (value) this.initialise();
  },

  track(eventName, parameters = {}) {
    if (!hasConsent()) return;
    if (gaMeasurementId && window.gtag) window.gtag('event', eventName, parameters);

    const metaEvents = {
      view_item: 'ViewContent',
      add_to_cart: 'AddToCart',
      begin_checkout: 'InitiateCheckout',
      purchase: 'Purchase'
    };
    if (metaPixelId && window.fbq && metaEvents[eventName]) {
      window.fbq('track', metaEvents[eventName], parameters);
    }
  }
};
