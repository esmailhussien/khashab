/* 🪵 Khashab Our Story View */

export const Story = {
  render() {
    return `
      <div class="page-container">
        <!-- Hero Section -->
        <section class="story-hero">
          <div class="story-hero-content container">
            <h2 style="font-family: var(--font-headings); font-weight: 500; font-size: 3.5rem;">A Century in the Grain</h2>
            <p class="story-hero-subtitle" style="font-size: 1.1rem; letter-spacing: 0.15em;">CRAFTED BY NATURE. PERFECTED OVER FOUR GENERATIONS.</p>
            <p style="font-size: 1.25rem; color: var(--color-text-muted); font-weight: 300; line-height: 1.8; max-width: 800px; margin: 0 auto;">
              The Khashab legacy is not merely a timeline of a business; it is a hundred-year love letter to the forest. From curating royal antiques in 1920s Alexandria to carving professional-grade culinary boards today, this is the story of one family's unwavering devotion to the art of woodcraft.
            </p>
          </div>
        </section>

        <!-- Heritage & Legacy Section (30+ Years) -->
        <section class="container" style="margin-bottom: 8rem;">
          <div class="story-heritage-section reveal-on-scroll reveal-slide-up">
            <div class="heritage-grid">
              <div class="heritage-stat-box">
                <span class="heritage-stat-number" style="font-size: 3.5rem; color: var(--color-accent); line-height: 1;">1920</span>
                <span class="heritage-stat-label" style="font-size: 0.85rem;">The Journey Begins</span>
              </div>
              <div class="heritage-content">
                
                <!-- Chapter 1 -->
                <div class="story-chapter" style="margin-bottom: 4rem;">
                  <h3 style="font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-headings);">Chapter I: The Royal Roots</h3>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    Our roots trace back to the sun-baked landscapes of Upper Egypt in the late 1920s. It was there that our visionary founder, <strong>Ali Elsayad Elkhashab</strong>, first recognized the soul hidden within raw timber. Driven by a deep ambition, he journeyed north to the cosmopolitan coastal city of Alexandria. 
                  </p>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    Ali didn't just sell wood; he traded in history. He curated breathtaking antiques and became a trusted purveyor of rare, majestic wooden masterpieces—pieces so exquisite they were sought after to decorate the halls of the Egyptian royal family. He established a name that became synonymous with uncompromising rarity and trust.
                  </p>
                </div>

                <!-- Chapter 2 -->
                <div class="story-chapter" style="margin-bottom: 4rem;">
                  <h3 style="font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-headings);">Chapter II: The Golden Era</h3>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    As the world modernized in the late 1950s, the heavy scent of sawdust and aged timber was passed to his son, <strong>Ibrahim</strong>. Inheriting his father's profound reverence for the craft, Ibrahim ushered in a golden era for the Khashab name. 
                  </p>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    He introduced an entirely new generation of premium hardwoods to the Egyptian market. Moving beyond curation, Ibrahim transformed the workshop into a hub of bespoke creation, designing custom, opulent wooden decorations tailored exclusively for Alexandria's elite, A-class families. Under his hands, wood became a symbol of status and breathtaking luxury.
                  </p>
                </div>

                <!-- Chapter 3 -->
                <div class="story-chapter" style="margin-bottom: 4rem;">
                  <h3 style="font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-headings);">Chapter III: The Great Expansion</h3>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    Decades later, the symphony of chisels and saws welcomed a third generation—our father. Possessing a bold, modern vision, he looked beyond local borders, crossing oceans to import exotic, incredibly resilient African hardwoods. 
                  </p>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    He revolutionized our workshop by launching a massive new architectural branch: crafting sprawling wooden floors and intricate outdoor pergolas. Yet, amidst this grand scale of manufacturing, he fiercely guarded the soul of Khashab. The bespoke antique trade and the intimate, handcrafted joinery never ceased; they were simply elevated.
                  </p>
                </div>

                <!-- Chapter 4 -->
                <div class="story-chapter" style="margin-bottom: 4rem;">
                  <h3 style="font-size: 2rem; margin-bottom: 1rem; font-family: var(--font-headings);">Chapter IV: The Modern Mastery</h3>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    Today, as the fourth generation, we honor a century of blood, sweat, and sawdust. We have scaled our immense architectural expertise down to the absolute finest details, bringing our mastery directly onto your kitchen counter. From colossal pergolas to stunning, professional-grade butcher blocks and delicate kitchen accessories, our philosophy remains bold and unbound:
                  </p>
                  <blockquote style="border-left: 4px solid var(--color-accent); padding-left: 1.5rem; margin: 2rem 0; font-family: var(--font-headings); font-size: 1.5rem; font-style: italic; color: var(--color-text);">
                    "If it can be imagined, we literally use wood to create it."
                  </blockquote>
                  <p style="margin-bottom: 1.5rem; color: var(--color-text-muted); line-height: 1.8; font-size: 1.1rem; font-weight: 300;">
                    Four generations. One century. Countless forests. And an undying promise: everything that bears the Khashab name is forged from the highest quality, 100% natural wood.
                  </p>
                </div>

                <div style="margin-top: 4rem; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid var(--color-border);">
                  <img src="/assets/workshop.png" alt="Our Historic Woodcraft Workshop Interior" style="width: 100%; height: auto; display: block; object-fit: cover;">
                </div>
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
