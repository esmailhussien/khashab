export const Footer = {
  render() {
    return `<footer class="footer"><div class="container"><div class="footer-grid">
      <div class="footer-col footer-brand"><a href="/" class="logo"><img src="/assets/khashablogo.png" alt="Khashab" width="140" height="52"></a><p>Natural materials. Considered design.<br>Everyday objects, made meaningful.</p><span class="footer-signature">خشب — بطبيعته، مختلف.</span></div>
      <div class="footer-col"><h4>The collection</h4><ul class="footer-links"><li><a href="/store">All pieces</a></li><li><a href="/store?category=plates">Plates & tableware</a></li><li><a href="/configurator">Design your board</a></li><li><a href="/wishlist">Your saved pieces</a></li></ul></div>
      <div class="footer-col"><h4>Discover</h4><ul class="footer-links"><li><a href="/our-story">Our story</a></li><li><a href="/discover?tab=wiki">The wood library</a></li><li><a href="/discover?tab=care">Care & maintenance</a></li><li><a href="/discover?tab=blog">Stories & guides</a></li></ul></div>
      <div class="footer-col"><h4>Here to help</h4><ul class="footer-links"><li><a href="/contact">Contact us</a></li><li><a href="/contact">Order enquiries</a></li><li><a href="/return-policy">Returns & exchanges</a></li><li><a href="/discover?tab=faq">FAQs</a></li></ul></div>
      <div class="footer-col footer-invitation"><h4>Something in mind?</h4><p>A gift, a custom piece, or simply a question about wood. We’d love to hear it.</p><a href="/contact" class="editorial-link">Start a conversation <span aria-hidden="true">↗</span></a></div>
    </div><div class="footer-bottom"><p>© ${new Date().getFullYear()} Khashab. All rights reserved.</p><span>Natural wood. Individual character.</span><a href="mailto:sales@khashab.store">sales@khashab.store</a></div></div></footer>`;
  },
  init() {}
};
