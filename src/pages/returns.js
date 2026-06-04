/* 🪵 Khashab Return Policy View */

export const Returns = {
  render() {
    return `
      <div class="page-container">

        <!-- Hero Section -->
        <section class="returns-hero">
          <div class="container returns-hero-content">
            <div class="returns-breadcrumbs">
              <a href="/#/">Home</a>
              <span class="separator">/</span>
              <span>Return Policy</span>
            </div>
            <span class="returns-hero-eyebrow">Customer Care</span>
            <h1>Return Policy</h1>
            <p class="returns-hero-subtitle">We take immense pride in the craftsmanship and quality of our wooden products. If you are not completely satisfied, we are here to help.</p>
          </div>
        </section>

        <!-- Main Content -->
        <div class="container returns-content">

          <!-- 15-Day Callout -->
          <div class="returns-callout">
            <div class="returns-callout-icon">
              <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="returns-callout-body">
              <h3>15-Day Unopened Box Window</h3>
              <p>We offer a strict <strong>15-day return policy</strong> for items that are brand new, unused, and still in their original, unopened packaging. The box seal must remain completely intact — because of the nature of our kitchen and food-contact products, we cannot accept returns on items that have been opened or removed from their protective sealing.</p>
            </div>
          </div>

          <!-- Final Sale Items -->
          <article class="returns-section">
            <div class="returns-section-header">
              <div class="returns-section-icon">
                <svg class="icon" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              </div>
              <h3>Final Sale Items</h3>
            </div>
            <p>The following items are considered <strong>Final Sale</strong> and are completely non-returnable and non-refundable:</p>
            <ul class="returns-list">
              <li>Used cutting boards, serving boards, and butcher blocks (due to hygiene and food safety regulations).</li>
              <li>Custom-engraved, personalized, or completely bespoke items (Configurator designs).</li>
              <li>Care and maintenance products (such as board oils and beeswax) that have been opened.</li>
              <li>Items purchased on clearance or during a final sale event.</li>
            </ul>
          </article>

          <!-- How to Return -->
          <article class="returns-section">
            <div class="returns-section-header">
              <div class="returns-section-icon">
                <svg class="icon" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
              </div>
              <h3>How to Initiate a Return</h3>
            </div>
            <p>To initiate an eligible return, please follow these steps:</p>
            <ol class="returns-steps">
              <li>Contact our Customer Care team at <a href="mailto:sales@khashab.store">sales@khashab.store</a> within 15 days of receiving your order.</li>
              <li>Provide your order number and a brief explanation of the reason for your return.</li>
              <li>Wait for our team to approve your request and provide you with a Return Merchandise Authorization (RMA) number and shipping instructions.</li>
            </ol>
            <p>Please note that the customer is responsible for all return shipping costs. We strongly recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.</p>
          </article>

          <!-- Refunds -->
          <article class="returns-section">
            <div class="returns-section-header">
              <div class="returns-section-icon">
                <svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3>Refunds</h3>
            </div>
            <p>Once your return is received and inspected by our warehouse team, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund based on the condition of the box.</p>
            <p>If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5–10 business days.</p>
          </article>

          <!-- Exchanges -->
          <article class="returns-section">
            <div class="returns-section-header">
              <div class="returns-section-icon">
                <svg class="icon" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
              </div>
              <h3>Exchanges</h3>
            </div>
            <p>We currently do not offer direct exchanges. If you would like a different item, please initiate a return for your original purchase and place a new order for the desired product through our store.</p>
          </article>

          <!-- Damaged Items -->
          <article class="returns-section">
            <div class="returns-section-header">
              <div class="returns-section-icon">
                <svg class="icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3>Defective or Damaged Items</h3>
            </div>
            <p>If your item arrives defective or damaged during transit, please contact us immediately (within 48 hours of delivery) at <a href="mailto:sales@khashab.store">sales@khashab.store</a> with clear photographs of the damage and the shipping box. We will arrange a replacement or full refund as quickly as possible.</p>
          </article>

          <!-- CTA -->
          <div class="returns-cta">
            <h3>Need Help With a Return?</h3>
            <p>Our customer care team is happy to guide you through the process and answer any questions.</p>
            <a href="/#/contact" class="btn btn-primary">
              <svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Contact Us
            </a>
          </div>

        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
