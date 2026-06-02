/* 🪵 Khashab Scroll Reveal Animations Utility */

export function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add revealed class
        entry.target.classList.add('revealed');
        // Unobserve once animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px' // Triggers slightly before the element fully enters
  });

  elements.forEach((el, index) => {
    // Optionally set a staggered delay dynamically if it has a list sibling
    if (el.classList.contains('stagger-item') && !el.style.transitionDelay) {
      const delay = (index % 4) * 0.1; // Stagger up to 4 items in a row
      el.style.transitionDelay = `${delay}s`;
    }
    observer.observe(el);
  });
}
