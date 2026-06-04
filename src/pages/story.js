/* 🪵 Khashab Our Story View — Premium Editorial Layout */

export const Story = {
  render() {
    return `
      <div class="page-container">
        <!-- Hero Section -->
        <section class="story-hero">
          <div class="story-hero-content container">
            <span class="story-hero-eyebrow">EST. 1920s · ALEXANDRIA, EGYPT</span>
            <h1 style="font-family: var(--font-headings); font-weight: 500;">A Century in the Grain</h1>
            <p class="story-hero-subtitle">Four generations. One undying craft.</p>
            <p style="font-size: 1.15rem; color: var(--color-text-muted); font-weight: 300; line-height: 1.9; max-width: 700px; margin: 0 auto;">
              The Khashab legacy is not merely a timeline of a business — it is a hundred-year love letter to the forest. From curating royal antiques in 1920s Alexandria to carving professional-grade culinary boards today, this is the story of one family's unwavering devotion to the art of wood.
            </p>
          </div>
        </section>

        <!-- Stats Ribbon -->
        <section class="story-stats-ribbon reveal-on-scroll reveal-slide-up">
          <div class="container">
            <div class="story-stats-grid">
              <div class="story-stat-item">
                <span class="story-stat-num">100+</span>
                <span class="story-stat-desc">Years of Legacy</span>
              </div>
              <div class="story-stat-item">
                <span class="story-stat-num">4</span>
                <span class="story-stat-desc">Generations</span>
              </div>
              <div class="story-stat-item">
                <span class="story-stat-num">3</span>
                <span class="story-stat-desc">Continents of Wood</span>
              </div>
              <div class="story-stat-item">
                <span class="story-stat-num">∞</span>
                <span class="story-stat-desc">Possibilities</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline Chapters -->
        <section class="story-timeline container">

          <!-- Chapter I -->
          <div class="story-chapter-block reveal-on-scroll reveal-slide-up">
            <div class="chapter-era">
              <span class="chapter-era-year">1920s</span>
              <span class="chapter-era-dot"></span>
              <span class="chapter-era-line"></span>
            </div>
            <div class="chapter-body">
              <span class="chapter-label">Chapter I</span>
              <h2>The Royal Roots</h2>
              <p class="chapter-lead">
                Our roots trace back to the sun-baked landscapes of <strong>Upper Egypt</strong> in the late 1920s. It was there that our visionary founder, <strong>Ali Elsayad Elkhashab</strong>, first recognized the soul hidden within raw timber.
              </p>
              <p>
                Driven by a deep ambition, he journeyed north to the cosmopolitan coastal city of Alexandria. Ali didn't just sell wood — he traded in history. He curated breathtaking antiques and became a trusted purveyor of rare, majestic wooden masterpieces — pieces so exquisite they were sought after to decorate the halls of the <em>Egyptian royal family</em>.
              </p>
              <p>
                He established a name that became synonymous with uncompromising rarity and trust — a name that would echo through generations.
              </p>
            </div>
          </div>

          <!-- Chapter II -->
          <div class="story-chapter-block chapter-reverse reveal-on-scroll reveal-slide-up">
            <div class="chapter-era">
              <span class="chapter-era-year">1950s</span>
              <span class="chapter-era-dot"></span>
              <span class="chapter-era-line"></span>
            </div>
            <div class="chapter-body">
              <span class="chapter-label">Chapter II</span>
              <h2>The Golden Era</h2>
              <p class="chapter-lead">
                As the world modernized in the late 1950s, the heavy scent of sawdust and aged timber was passed to Ali's son, <strong>Ibrahim</strong>. Inheriting his father's profound reverence for the craft, Ibrahim ushered in a golden era for the Khashab name.
              </p>
              <p>
                He introduced an entirely new generation of premium hardwoods to the Egyptian market. Moving beyond curation, Ibrahim transformed the workshop into a hub of <strong>bespoke creation</strong> — designing custom, opulent wooden decorations tailored exclusively for Alexandria's elite, A-class families.
              </p>
              <p>
                Under his hands, wood became a symbol of status and breathtaking luxury. The workshop hummed with purpose; every grain was studied, every cut deliberate.
              </p>
            </div>
          </div>

          <!-- Chapter III -->
          <div class="story-chapter-block reveal-on-scroll reveal-slide-up">
            <div class="chapter-era">
              <span class="chapter-era-year">1980s</span>
              <span class="chapter-era-dot"></span>
              <span class="chapter-era-line"></span>
            </div>
            <div class="chapter-body">
              <span class="chapter-label">Chapter III</span>
              <h2>The Great Expansion</h2>
              <p class="chapter-lead">
                Decades later, the symphony of chisels and saws welcomed a third generation — <strong>our father</strong>. Possessing a bold, modern vision, he looked beyond local borders, crossing oceans to import exotic, incredibly resilient <strong>African hardwoods</strong>.
              </p>
              <p>
                He revolutionized our workshop by launching a massive new architectural branch: crafting sprawling wooden floors and intricate outdoor pergolas that became landmarks across Alexandria. 
              </p>
              <p>
                Yet, amidst this grand scale of manufacturing, he fiercely guarded the soul of Khashab. The bespoke antique trade and the intimate, handcrafted joinery never ceased — they were simply elevated. The workshop now spoke two languages: monumental architecture and delicate artistry.
              </p>
            </div>
          </div>

          <!-- Chapter IV -->
          <div class="story-chapter-block chapter-reverse reveal-on-scroll reveal-slide-up">
            <div class="chapter-era">
              <span class="chapter-era-year">Today</span>
              <span class="chapter-era-dot"></span>
            </div>
            <div class="chapter-body">
              <span class="chapter-label">Chapter IV</span>
              <h2>The Modern Mastery</h2>
              <p class="chapter-lead">
                Today, as the fourth generation, we honor a century of blood, sweat, and sawdust. We have scaled our immense architectural expertise down to the absolute finest details — bringing our mastery directly onto <strong>your kitchen counter</strong>.
              </p>
              <p>
                From colossal pergolas to stunning, professional-grade butcher blocks and delicate kitchen accessories, our philosophy remains bold and unbound:
              </p>
              <blockquote class="story-blockquote">
                "If it can be imagined, we literally use wood to create it."
              </blockquote>
              <p>
                Four generations. One century. Countless forests. And an undying promise: everything that bears the Khashab name is forged from the highest quality, <strong>100% natural wood</strong>.
              </p>
            </div>
          </div>

        </section>

        <!-- Workshop Image -->
        <section class="container" style="margin-bottom: 6rem;">
          <div class="story-workshop-image reveal-on-scroll reveal-fade">
            <img src="/assets/workshop.png" alt="Our Historic Woodcraft Workshop Interior" loading="lazy">
            <div class="story-workshop-caption">
              <span>Our workshop — where raw timber becomes lasting art.</span>
            </div>
          </div>
        </section>

        <!-- Our Promise / Sustainability -->
        <section class="container" style="margin-bottom: 6rem;">
          <div class="sustainability-banner reveal-on-scroll reveal-slide-up">
            <div class="sustainability-header">
              <h3>Our Promise to Nature</h3>
              <p style="color: var(--color-text-muted); font-weight: 300;">We believe the forest gives us everything. In return, we give it our respect.</p>
            </div>
            <div class="sustainability-grid">
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h4>100% Natural</h4>
                <p>No toxic glues or chemical finishes. Only food-grade oils and pure beeswax — safe for your family and the planet.</p>
              </div>
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4>Sustainably Sourced</h4>
                <p>Every piece of timber is responsibly sourced from sustainably managed forests across Africa, Europe, and Asia.</p>
              </div>
              <div class="sustainability-card">
                <div class="sustainability-icon">
                  <svg class="icon icon-lg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h4>Built to Last</h4>
                <p>A century of experience means our products aren't disposable — they're generational heirlooms designed for decades of daily use.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="story-cta-section reveal-on-scroll reveal-fade">
          <div class="container" style="text-align: center;">
            <h2 style="font-family: var(--font-headings); margin-bottom: 1.5rem;">Ready to Own a Piece of History?</h2>
            <p style="color: var(--color-text-muted); font-weight: 300; font-size: 1.1rem; max-width: 550px; margin: 0 auto 2.5rem auto;">
              Explore our handcrafted collection or reach out for a custom piece tailored to your exact vision.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="#/store" class="btn btn-primary">Explore The Store</a>
              <a href="#/contact" class="btn btn-secondary">Custom Orders</a>
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
