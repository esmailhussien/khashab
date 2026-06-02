/* 🪵 Khashab Return Policy View */

export const Returns = {
  render() {
    return `
      <div class="page-container container" style="max-width: 800px; padding: 4rem 1rem;">
        <h1 style="font-family: var(--font-headings); font-size: 3rem; margin-bottom: 2rem; color: var(--color-text);">Return Policy</h1>
        
        <div style="color: var(--color-text-muted); font-size: 1.05rem; line-height: 1.8; font-weight: 300;">
          <p style="margin-bottom: 1.5rem;">At Khashab, we take immense pride in the craftsmanship and quality of our wooden products. We want you to love your purchase as much as we loved creating it. If you are not completely satisfied, we are here to help.</p>

          <h3 style="font-family: var(--font-headings); color: var(--color-text); margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem;">15-Day Unopened Box Policy</h3>
          <p style="margin-bottom: 1.5rem;">We offer a strict <strong>15-day return policy</strong> for items that are brand new, unused, and still in their original, unopened packaging. To be eligible for a return, the box seal must remain completely intact. Because of the nature of our kitchen and food-contact products, we cannot accept returns on items that have been opened or removed from their protective sealing.</p>
          
          <h3 style="font-family: var(--font-headings); color: var(--color-text); margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem;">Final Sale Items</h3>
          <p style="margin-bottom: 1.5rem;">The following items are considered <strong>Final Sale</strong> and are completely non-returnable and non-refundable:</p>
          <ul style="list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">Used cutting boards, serving boards, and butcher blocks (due to hygiene and food safety regulations).</li>
            <li style="margin-bottom: 0.5rem;">Custom-engraved, personalized, or completely bespoke items (Configurator designs).</li>
            <li style="margin-bottom: 0.5rem;">Care and maintenance products (such as board oils and beeswax) that have been opened.</li>
            <li style="margin-bottom: 0.5rem;">Items purchased on clearance or during a final sale event.</li>
          </ul>

          <h3 style="font-family: var(--font-headings); color: var(--color-text); margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem;">How to Initiate a Return</h3>
          <p style="margin-bottom: 1.5rem;">To initiate an eligible return, please follow these steps:</p>
          <ol style="list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li style="margin-bottom: 0.5rem;">Contact our Customer Care team at <a href="mailto:sales@khashab.store" style="color: var(--color-accent); font-weight: 500;">sales@khashab.store</a> within 15 days of receiving your order.</li>
            <li style="margin-bottom: 0.5rem;">Provide your order number and a brief explanation of the reason for your return.</li>
            <li style="margin-bottom: 0.5rem;">Wait for our team to approve your request and provide you with a Return Merchandise Authorization (RMA) number and shipping instructions.</li>
          </ol>
          <p style="margin-bottom: 1.5rem;">Please note that the customer is responsible for all return shipping costs. We strongly recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.</p>

          <h3 style="font-family: var(--font-headings); color: var(--color-text); margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem;">Refunds</h3>
          <p style="margin-bottom: 1.5rem;">Once your return is received and inspected by our warehouse team, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund based on the condition of the box.</p>
          <p style="margin-bottom: 1.5rem;">If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-10 business days.</p>

          <h3 style="font-family: var(--font-headings); color: var(--color-text); margin-top: 2.5rem; margin-bottom: 1rem; font-size: 1.5rem;">Defective or Damaged Items</h3>
          <p style="margin-bottom: 1.5rem;">If your item arrives defective or damaged during transit, please contact us immediately (within 48 hours of delivery) at <a href="mailto:sales@khashab.store" style="color: var(--color-accent); font-weight: 500;">sales@khashab.store</a> with clear photographs of the damage and the shipping box. We will arrange a replacement or full refund as quickly as possible.</p>
        </div>
      </div>
    `;
  },
  
  init() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
