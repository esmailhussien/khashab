/* 🪵 Khashab "Build Your Board" Configurator View */

import { cart } from '../utils/cart.js';

export const Configurator = {
  render() {
    return `
      <div class="page-container container">
        
        <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
          <h2 style="font-family: var(--font-headings); font-size: 2.5rem; font-weight: 500;">Build Your Board</h2>
          <p>Design a custom board tailored precisely to your kitchen shape, dimensions, and personal branding.</p>
        </div>

        <div class="configurator-grid">
          <!-- Left Column: Visual Mockup Canvas -->
          <div class="configurator-preview-box">
            <div class="board-canvas-frame">
              
              <!-- Board mockup element -->
              <div class="board-mockup shape-rectangular" id="config-board-mockup" style="background-color: #4E3629;">
                <!-- Paddle handle -->
                <div class="board-mockup-handle" id="config-board-handle"></div>
                
                <!-- Engraving overlay text -->
                <div class="board-engraving-overlay engrave-pos-center font-serif" id="config-engraving-preview"></div>
              </div>
              
            </div>
            
            <p style="font-size: 0.8rem; color: var(--color-text-light); margin-top: 2rem; text-align: center; text-transform: uppercase; letter-spacing: 0.05em;">
              *3D render mockup is illustrative. Natural wood colors and grains will vary.
            </p>
          </div>

          <!-- Right Column: Interactive Controllers -->
          <div class="configurator-controls">
            
            <!-- Group 1: Select Shape -->
            <div class="configurator-option-group">
              <span class="variant-label">1. Choose Shape</span>
              <div class="config-btn-grid" id="controls-shape">
                <button class="config-choice-btn active" data-shape="rectangular">Rectangle</button>
                <button class="config-choice-btn" data-shape="round">Round</button>
                <button class="config-choice-btn" data-shape="paddle">Paddle</button>
              </div>
            </div>

            <!-- Group 2: Select Wood Type -->
            <div class="configurator-option-group">
              <span class="variant-label">2. Select Hardwood</span>
              <div class="config-wood-options" id="controls-wood">
                <!-- Walnut -->
                <div class="config-wood-card active" data-wood="walnut" data-color="#4E3629">
                  <div class="config-wood-preview" style="background-image: url('/assets/woods/walnut.png'); background-size: cover; background-position: center;"></div>
                  <div class="config-wood-info">
                    <span class="config-wood-name">North American Walnut (+$20)</span>
                    <span class="config-wood-desc">Rich chocolate hues, elegant wavy patterns, heavy durability.</span>
                  </div>
                </div>
                <!-- Oak -->
                <div class="config-wood-card" data-wood="oak" data-color="#C0A37E">
                  <div class="config-wood-preview" style="background-image: url('/assets/woods/oak.png'); background-size: cover; background-position: center;"></div>
                  <div class="config-wood-info">
                    <span class="config-wood-name">European White Oak (+$10)</span>
                    <span class="config-wood-desc">Golden wheat tones, highly pronounced coarse grains.</span>
                  </div>
                </div>
                <!-- Maple -->
                <div class="config-wood-card" data-wood="maple" data-color="#E6D2B8">
                  <div class="config-wood-preview" style="background-image: url('/assets/woods/maple.png'); background-size: cover; background-position: center;"></div>
                  <div class="config-wood-info">
                    <span class="config-wood-name">Hard Rock Maple (+0)</span>
                    <span class="config-wood-desc">Light creamy beige, tight grains, sanitarily chef-approved.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Group 3: Select Size -->
            <div class="configurator-option-group">
              <span class="variant-label">3. Select Size</span>
              <div class="config-btn-grid" id="controls-size">
                <button class="config-choice-btn" data-size="small">Small</button>
                <button class="config-choice-btn active" data-size="medium">Medium</button>
                <button class="config-choice-btn" data-size="large">Large</button>
              </div>
              <span class="size-spec-text" id="config-size-spec">Dimensions: 16" x 12" x 1.0"</span>
            </div>

            <!-- Group 4: Engraving personalization -->
            <div class="configurator-option-group">
              <span class="variant-label">4. Personal Engraving (+$15)</span>
              
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" for="config-engrave-text">Type Custom Text</label>
                <input type="text" id="config-engrave-text" class="form-input" placeholder="Type initials, date, or family name" maxlength="30">
              </div>
              
              <div class="form-grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label" for="config-engrave-font">Font Style</label>
                  <select id="config-engrave-font" class="form-input" style="cursor: pointer; appearance: none; background-color: var(--color-bg);">
                    <option value="serif" class="font-serif">Elegant Serif</option>
                    <option value="sans" class="font-sans">Modern Sans</option>
                    <option value="mono" class="font-mono">Clean Monospace</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="config-engrave-pos">Placement</label>
                  <select id="config-engrave-pos" class="form-input" style="cursor: pointer; appearance: none; background-color: var(--color-bg);">
                    <option value="center">Center</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="bottom-right">Bottom Right</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Calculated Price & Checkout Block -->
            <div class="configurator-price-box">
              <div>
                <span class="form-label">Estimated Price</span>
                <div class="config-price-val" id="config-price-text">$90.00</div>
              </div>
              <button class="btn btn-accent" id="btn-config-add-cart">Add Custom Board</button>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);

    // Mockup elements
    const boardMockup = document.getElementById('config-board-mockup');
    const engravingPreview = document.getElementById('config-engraving-preview');

    // Controls DOM containers
    const shapeControls = document.getElementById('controls-shape');
    const woodControls = document.getElementById('controls-wood');
    const sizeControls = document.getElementById('controls-size');

    // Inputs DOM elements
    const engraveTextInput = document.getElementById('config-engrave-text');
    const engraveFontSelect = document.getElementById('config-engrave-font');
    const engravePosSelect = document.getElementById('config-engrave-pos');

    // Pricing & Add button
    const priceValText = document.getElementById('config-price-text');
    const addCartBtn = document.getElementById('btn-config-add-cart');
    const sizeSpecText = document.getElementById('config-size-spec');

    // Configurator state variables
    let selectedShape = 'rectangular';
    let selectedWood = 'walnut';
    let selectedColor = '#4E3629';
    let selectedSize = 'medium';
    let engravingText = '';
    let selectedFont = 'serif';
    let selectedPos = 'center';
    let totalPrice = 90.00;

    const recalculateAndSync = () => {
      // 1. Calculate pricing
      let price = 65.00; // Base Board Price
      
      // Hardwood cost
      if (selectedWood === 'walnut') price += 20;
      else if (selectedWood === 'oak') price += 10;
      
      // Shape tooling cost
      if (selectedShape === 'round') price += 10;
      else if (selectedShape === 'paddle') price += 15;
      else price += 5; // rectangular layout base

      // Size multiplier
      let sizeMult = 1.0;
      if (selectedSize === 'small') {
        sizeMult = 0.8;
        if (selectedShape === 'round') sizeSpecText.innerText = 'Dimensions: 10" Diameter x 0.75"';
        else sizeSpecText.innerText = 'Dimensions: 12" x 9" x 0.75"';
      } else if (selectedSize === 'large') {
        sizeMult = 1.3;
        if (selectedShape === 'round') sizeSpecText.innerText = 'Dimensions: 16" Diameter x 1.2"';
        else sizeSpecText.innerText = 'Dimensions: 20" x 15" x 1.25"';
      } else {
        // medium
        sizeMult = 1.0;
        if (selectedShape === 'round') sizeSpecText.innerText = 'Dimensions: 13" Diameter x 1.0"';
        else sizeSpecText.innerText = 'Dimensions: 16" x 12" x 1.0"';
      }

      price = price * sizeMult;

      // Engraving fee
      if (engravingText.length > 0) {
        price += 15.00;
      }

      totalPrice = price;
      if (priceValText) priceValText.innerText = `$${price.toFixed(2)}`;

      // 2. Sync visuals
      if (boardMockup) {
        // Reset classes
        boardMockup.className = 'board-mockup';
        boardMockup.classList.add(`shape-${selectedShape}`);
        boardMockup.style.backgroundColor = selectedColor;
        boardMockup.style.backgroundImage = `url('/assets/woods/${selectedWood}.png')`;
        
        const handle = document.getElementById('config-board-handle');
        if (handle) {
          handle.style.backgroundImage = `url('/assets/woods/${selectedWood}.png')`;
        }
      }

      if (engravingPreview) {
        // Text content
        engravingPreview.innerText = engravingText;

        // Reset classes
        engravingPreview.className = 'board-engraving-overlay';
        engravingPreview.classList.add(`font-${selectedFont}`);
        engravingPreview.classList.add(`engrave-pos-${selectedPos}`);
      }
    };

    // Shape toggling clicks
    if (shapeControls) {
      shapeControls.querySelectorAll('.config-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          shapeControls.querySelectorAll('.config-choice-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedShape = btn.dataset.shape;
          recalculateAndSync();
        });
      });
    }

    // Wood card selections
    if (woodControls) {
      woodControls.querySelectorAll('.config-wood-card').forEach(card => {
        card.addEventListener('click', () => {
          woodControls.querySelectorAll('.config-wood-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          selectedWood = card.dataset.wood;
          selectedColor = card.dataset.color;
          recalculateAndSync();
        });
      });
    }

    // Size toggling clicks
    if (sizeControls) {
      sizeControls.querySelectorAll('.config-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeControls.querySelectorAll('.config-choice-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedSize = btn.dataset.size;
          recalculateAndSync();
        });
      });
    }

    // Engraving input changes
    if (engraveTextInput) {
      engraveTextInput.addEventListener('input', (e) => {
        engravingText = e.target.value;
        recalculateAndSync();
      });
    }

    if (engraveFontSelect) {
      engraveFontSelect.addEventListener('change', (e) => {
        selectedFont = e.target.value;
        recalculateAndSync();
      });
    }

    if (engravePosSelect) {
      engravePosSelect.addEventListener('change', (e) => {
        selectedPos = e.target.value;
        recalculateAndSync();
      });
    }

    // Add configured item to cart
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const shapeCapitalized = selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1);
        const sizeCapitalized = selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1);
        const woodCapitalized = selectedWood.charAt(0).toUpperCase() + selectedWood.slice(1);
        
        // Assemble mock product item
        const mockProduct = {
          id: `custom-board-${selectedShape}-${selectedWood}-${selectedSize}`,
          name: `Custom Handcrafted ${shapeCapitalized} Board`,
          price: totalPrice,
          woodType: woodCapitalized,
          size: `${sizeCapitalized} Size (${selectedSize})`,
          image: '/assets/hero.png',
          sizes: ['Standard'],
          woods: [woodCapitalized],
        };

        const cartOptions = {
          size: `${sizeCapitalized} (${sizeSpecText.innerText.split('Dimensions: ')[1]})`,
          wood: `${woodCapitalized} Wood ${engravingText ? `(Engraving: "${engravingText}")` : ''}`
        };

        cart.add(mockProduct, 1, cartOptions);

        // Feedback animations
        addCartBtn.innerText = 'Configured Board Added ✓';
        addCartBtn.style.backgroundColor = 'var(--color-success)';
        
        setTimeout(() => {
          addCartBtn.innerText = 'Add Custom Board';
          addCartBtn.style.backgroundColor = '';
          
          // Toggle slide-out Cart panel open
          const panel = document.getElementById('cart-panel');
          const overlay = document.getElementById('cart-panel-overlay');
          if (panel && overlay) {
            panel.classList.add('active');
            overlay.classList.add('active');
          }
        }, 800);
      });
    }

    // Initial state run
    recalculateAndSync();
  }
};
