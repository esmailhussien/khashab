/* 🪵 Khashab Our Story View */

export const Story = {
  render() {
    return `
      <div class="page-container">
        <!-- Hero Section -->
        <section class="story-hero">
          <div class="story-hero-content container">
            <h2 style="font-family: var(--font-headings); font-weight: 500;">Our Story</h2>
            <p class="story-hero-subtitle">Crafted by nature. Refined by hand.</p>
            <p style="font-size: 1.25rem; color: var(--color-text-muted); font-weight: 300; line-height: 1.7; max-width: 700px; margin: 0 auto;">
              Khashab was born from a simple desire: to replace mass-produced, chemically-finished plastic kitchenwares with premium, natural hardwood pieces that last generations.
            </p>
          </div>
        </section>

        <!-- Story Section 1: The Sourcing -->
        <section class="container">
          <div class="story-split-section">
            <div class="story-split-content">
              <h3>The Philosophy</h3>
              <p>
                We believe that the kitchen is the heart of the home, and the tools you use should reflect the beauty of the ingredients you prepare. Every board we craft starts its journey in responsibly managed forests, where we select only premium North American and European hardwoods.
              </p>
              <p>
                We choose Walnut for its chocolate-brown elegance, Oak for its structural resilience and rustic character, and Maple for its dense, closed-grain hygiene. We never harvest living, fruitful trees; instead, we prioritize sustainable forestry practices.
              </p>
            </div>
            <div class="story-split-image">
              <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
                <svg class="icon" viewBox="0 0 24 24" style="width: 64px; height: 64px; stroke-width: 1.2;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                <span>[ Wood Sourcing & Slabs ]</span>
              </div>
            </div>
          </div>

          <!-- Story Section 2: The Craftsmanship -->
          <div class="story-split-section">
            <div class="story-split-image">
              <div class="image-placeholder" style="height: 100%; border-radius: var(--radius-lg);">
                <svg class="icon" viewBox="0 0 24 24" style="width: 64px; height: 64px; stroke-width: 1.2;"><path d="M12 2L2 7l10 5 10-5-10-5z"></path></svg>
                <span>[ Crafting & Polishing ]</span>
              </div>
            </div>
            <div class="story-split-content">
              <h3>The Artisan Process</h3>
              <p>
                Machines can cut shapes, but they cannot read grain patterns. Our craftsmen examine every wooden slab, arranging and aligning the natural fibers to maximize stability and prevent future warping.
              </p>
              <p>
                Each board is painstakingly sanded through four successive grits of sandpaper, resulting in a surface that feels like satin. We then submerge the wood in food-grade USP mineral oils and apply a final buffed seal of organic beeswax.
              </p>
            </div>
          </div>
        </section>

        <!-- Sourcing & Sustainability banner -->
        <section class="container" style="margin-bottom: 6rem;">
          <div class="sustainability-banner">
            <div class="sustainability-header">
              <h3>Commitment to Sustainability</h3>
              <p>We are dedicated to creating products that are safe for both your family and the planet.</p>
            </div>
            
            <div class="sustainability-grid">
              <!-- FSC Hardwood -->
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
                </div>
                <h4>FSC Hardwoods</h4>
                <p>100% of our lumber is harvested from FSC-certified sustainable forests, ensuring biodiversity and forest conservation.</p>
              </div>

              <!-- Artisanal Workshops -->
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <h4>Handcrafted Local</h4>
                <p>We support local woodcarvers and artisans, keeping traditional carpentry techniques alive in a modern era.</p>
              </div>

              <!-- Food Safe Finish -->
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h4>Organic Finish</h4>
                <p>Completely free of toxins, formaldehyde glues, or chemical lacquers. Safe for direct food prep and contact.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);
  }
};
