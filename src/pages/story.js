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

        <!-- Heritage & Legacy Section (30+ Years) -->
        <section class="container" style="margin-bottom: 8rem;">
          <div class="story-heritage-section reveal-on-scroll reveal-slide-up">
            <div class="heritage-grid">
              <div class="heritage-stat-box">
                <span class="heritage-stat-number">30+</span>
                <span class="heritage-stat-label">Years of Woodworking Legacy</span>
              </div>
              <div class="heritage-content">
                <h3>Thirty Years of Woodcraft</h3>
                <p class="lead-text">
                  For over three decades, our family workshop has lived and breathed premium woodcraft. What began in 1996 as a small, specialized local workshop dedicated to heritage joinery has evolved into a global signature for professional-grade wooden kitchenware and home accessories.
                </p>
                <p>
                  Thirty years of working with raw lumber has taught us one fundamental truth: no two trees are identical. We have spent half a lifetime studying moisture behavior, fiber structural orientation, and the natural resilience of hardwoods. This deep-rooted professional experience is poured into every single board, plate, and block we craft today.
                </p>
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
