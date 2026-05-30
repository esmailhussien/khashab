/* 🪵 Khashab Contact Us Page View */

export const Contact = {
  render() {
    return `
      <div class="page-container container">
        
        <div class="contact-grid">
          <!-- Contact Form Box (Left) -->
          <div class="contact-form-box" id="contact-form-container">
            <h3 class="contact-form-title">Send a Message</h3>
            
            <form id="form-contact-page" action="https://formsubmit.co/sales@khashab.store" method="POST" novalidate>
              <!-- Honeypot -->
              <input type="text" name="_honey" style="display:none">
              <input type="hidden" name="_captcha" value="false">
              <input type="hidden" name="_subject" value="New Contact Form Inquiry - Khashab">

              <div class="contact-form-grid">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Your Name</label>
                  <input type="text" id="contact-name" name="name" class="form-input" required placeholder="John Doe">
                  <span class="form-error-hint" id="contact-name-error"></span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">Email Address</label>
                  <input type="email" id="contact-email" name="email" class="form-input" required placeholder="john@example.com">
                  <span class="form-error-hint" id="contact-email-error"></span>
                </div>
                
                <div class="form-group form-group-full">
                  <label class="form-label" for="contact-subject">Inquiry Subject</label>
                  <div style="position: relative; display: flex; align-items: center;">
                    <select id="contact-subject" name="subject" class="form-input" style="cursor: pointer; appearance: none; background-color: var(--color-bg); padding-right: 2.5rem;">
                      <option value="General Inquiry">General Product Inquiry</option>
                      <option value="Custom Order">Custom Size / Engraving Request</option>
                      <option value="Wholesale">Wholesale & Corporate Gifting</option>
                      <option value="Order Issue">Existing Order Status / Issue</option>
                    </select>
                    <span style="position: absolute; right: 1.25rem; pointer-events: none; color: var(--color-text-muted); font-size: 0.75rem;">▼</span>
                  </div>
                </div>
                
                <div class="form-group form-group-full">
                  <label class="form-label" for="contact-message">Message</label>
                  <textarea id="contact-message" name="message" class="form-input contact-textarea" required placeholder="Describe your request in detail..."></textarea>
                  <span class="form-error-hint" id="contact-message-error"></span>
                </div>
              </div>

              <div style="margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" id="btn-contact-submit" style="width: 100%;">Send Inquiry</button>
              </div>
            </form>
          </div>

          <!-- Contact Details (Right) -->
          <div class="contact-info-col">
            <div class="contact-info-header">
              <h3>Get In Touch</h3>
              <p>Have questions about board care, custom shapes, bulk wholesale ordering, or sustainable wood sourcing? We are here to help.</p>
            </div>

            <div class="contact-details-list">
              <!-- Email -->
              <div class="contact-detail-item">
                <div class="contact-detail-icon">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="contact-detail-content">
                  <h4>Email Sales & Support</h4>
                  <div class="email-copy-wrapper">
                    <a href="mailto:sales@khashab.store" class="contact-email-link" id="contact-email-text">sales@khashab.store</a>
                    <button class="btn-copy-email" id="btn-copy-email" aria-label="Copy email address" title="Copy to clipboard">
                      <svg class="icon icon-sm" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      <span class="copy-tooltip" id="copy-tooltip">Copy</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="contact-detail-item">
                <div class="contact-detail-icon">
                  <svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="contact-detail-content">
                  <h4>Call Workshop</h4>
                  <p style="color: var(--color-text-muted);">+1 (555) 987-6543</p>
                </div>
              </div>

              <!-- Workshop Hours -->
              <div class="contact-detail-item">
                <div class="contact-detail-icon">
                  <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div class="contact-detail-content">
                  <h4>Workshop Hours</h4>
                  <p style="color: var(--color-text-muted);">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="contact-socials-wrapper">
              <h4>Follow Our Workshop</h4>
              <div class="contact-social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="contact-social-link">Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="contact-social-link">Facebook</a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" class="contact-social-link">Pinterest</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    window.scrollTo(0, 0);

    const form = document.getElementById('form-contact-page');
    const container = document.getElementById('contact-form-container');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Validation patterns & status
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, validationFn, errorSpanId, errorMessage) {
      const errorSpan = document.getElementById(errorSpanId);
      const value = input.value.trim();
      const isValid = validationFn(value);

      if (value === '') {
        // Reset state if empty and not yet touched in depth
        input.classList.remove('valid', 'invalid');
        if (errorSpan) errorSpan.innerText = '';
        return false;
      }

      if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        if (errorSpan) errorSpan.innerText = '';
        return true;
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        if (errorSpan) errorSpan.innerText = errorMessage;
        return false;
      }
    }

    // Input listeners for real-time visual feedback
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        validateField(nameInput, (val) => val.length >= 2, 'contact-name-error', 'Name must be at least 2 characters');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateField(emailInput, (val) => emailRegex.test(val), 'contact-email-error', 'Please enter a valid email address');
      });
    }

    if (messageInput) {
      messageInput.addEventListener('input', () => {
        validateField(messageInput, (val) => val.length >= 10, 'contact-message-error', 'Message must be at least 10 characters');
      });
    }

    // Clipboard copy mechanism
    const copyBtn = document.getElementById('btn-copy-email');
    const tooltip = document.getElementById('copy-tooltip');
    if (copyBtn && tooltip) {
      copyBtn.addEventListener('click', () => {
        const emailText = 'sales@khashab.store';
        navigator.clipboard.writeText(emailText)
          .then(() => {
            tooltip.innerText = 'Copied!';
            tooltip.classList.add('visible');
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
              tooltip.innerText = 'Copy';
              tooltip.classList.remove('visible');
              copyBtn.classList.remove('copied');
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      });
    }

    // Submit handler
    if (form && container) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform final check of all inputs
        const isNameValid = nameInput ? nameInput.value.trim().length >= 2 : false;
        const isEmailValid = emailInput ? emailRegex.test(emailInput.value.trim()) : false;
        const isMessageValid = messageInput ? messageInput.value.trim().length >= 10 : false;

        // Display validation errors if form is submitted with invalid input
        if (nameInput && !isNameValid) {
          validateField(nameInput, (val) => val.length >= 2, 'contact-name-error', 'Name must be at least 2 characters');
        }
        if (emailInput && !isEmailValid) {
          validateField(emailInput, (val) => emailRegex.test(val), 'contact-email-error', 'Please enter a valid email address');
        }
        if (messageInput && !isMessageValid) {
          validateField(messageInput, (val) => val.length >= 10, 'contact-message-error', 'Message must be at least 10 characters');
        }

        if (!isNameValid || !isEmailValid || !isMessageValid) {
          // Highlight first invalid input
          if (nameInput && !isNameValid) nameInput.focus();
          else if (emailInput && !isEmailValid) emailInput.focus();
          else if (messageInput && !isMessageValid) messageInput.focus();
          return;
        }

        const submitBtn = document.getElementById('btn-contact-submit');
        const originalText = submitBtn ? submitBtn.innerText : 'Send Inquiry';
        if (submitBtn) {
          submitBtn.innerText = 'Sending Inquiry...';
          submitBtn.disabled = true;
        }

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });

        fetch('https://formsubmit.co/ajax/sales@khashab.store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(() => {
          // Render success state
          container.innerHTML = `
            <div class="contact-success-state">
              <div class="contact-success-icon">
                <svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for getting in touch. One of our workshop craftsmen or support team will review your inquiry and email you back within 24 hours.</p>
            </div>
          `;
        })
        .catch(err => {
          console.warn('AJAX submit failed, falling back to standard submit:', err);
          form.submit();
        });
      });
    }
  }
};

