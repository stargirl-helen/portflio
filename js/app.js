/**
 * COS 106 Application Controller
 * Handles:
 * - Theme switcher (Cyber Dark <-> Corporate Light) with localStorage persistence
 * - Mobile responsive navigation menu with ARIA accessibility
 * - Strict Contact Form validation meeting COS 106 specifications:
 *   1) No field is empty
 *   2) Email format is valid
 *   3) Phone number contains only digits
 * - Active navigation link state
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initContactFormValidation();
  highlightActiveNav();
});

/* -------------------------------------------------------------------
   1. THEME SWITCHER
   ------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const THEME_KEY = 'cos106_portal_theme';
  const savedTheme = localStorage.getItem(THEME_KEY);

  // Check saved theme or system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to Cyber Dark per aesthetic

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Corporate Theme' : 'Switch to Cyber Dark Theme');
    themeToggleBtn.innerHTML = isDark
      ? `
        <!-- Sun icon for switching to light -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `
      : `
        <!-- Moon icon for switching to dark -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
  }
}

/* -------------------------------------------------------------------
   2. MOBILE NAVIGATION
   ------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggleBtn');
  const mainNav = document.getElementById('mainNav');
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    menuToggle.innerHTML = isOpen
      ? `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `
      : `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
  });

  // Close menu on navigation click (mobile)
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------------
   3. CONTACT FORM VALIDATION (Strict COS 106 Specification)
   ------------------------------------------------------------------- */
function initContactFormValidation() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const feedbackBanner = document.getElementById('contactFeedback');

  // Strict email regex: standard RFC 5322 compliant pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  // Strict phone regex: digits only (7 to 15 digits)
  const phoneRegex = /^[0-9]{7,15}$/;

  function validateField(input, errorId, isValidFn, errorMessage) {
    const errorElem = document.getElementById(errorId);
    const value = input.value.trim();
    const valid = isValidFn(value);

    if (!valid) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorElem) {
        errorElem.textContent = errorMessage;
        errorElem.classList.add('visible');
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorElem) {
        errorElem.textContent = '';
        errorElem.classList.remove('visible');
      }
      return true;
    }
  }

  // Live input validation listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, 'nameError', val => val.length >= 2, 'Name is required and cannot be empty.');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, 'emailError', val => emailRegex.test(val), 'Please enter a valid email address (e.g., student@miva.university).');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      validateField(phoneInput, 'phoneError', val => phoneRegex.test(val), 'Phone number must contain only numeric digits (no letters, spaces or hyphens).');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, 'messageError', val => val.length >= 5, 'Message cannot be empty (minimum 5 characters).');
    });
  }

  // Form submission handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, 'nameError', val => val.length >= 2, 'Name is required and cannot be empty.');
    const isEmailValid = validateField(emailInput, 'emailError', val => emailRegex.test(val), 'Please enter a valid email address.');
    const isPhoneValid = validateField(phoneInput, 'phoneError', val => phoneRegex.test(val), 'Phone number must contain only numeric digits.');
    const isMessageValid = validateField(messageInput, 'messageError', val => val.length >= 5, 'Message cannot be empty.');

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner success';
        feedbackBanner.innerHTML = `
          <strong>✔ Message Transmitted Successfully!</strong><br>
          Thank you, ${escapeHTML(nameInput.value)}. Your contact transmission has been validated and recorded.
        `;
        feedbackBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form fields
      contactForm.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(inp => {
        inp?.classList.remove('is-valid', 'is-invalid');
      });
    } else {
      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner error';
        feedbackBanner.innerHTML = `
          <strong>⚠ Validation Failed:</strong> Please correct the highlighted errors above. All fields must be non-empty, email valid, and phone containing digits only.
        `;
      }
    }
  });

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, match => {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return map[match];
    });
  }
}

/* -------------------------------------------------------------------
   4. ACTIVE NAV HIGHLIGHTER
   ------------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      // Allow in-page anchor links on main page
    } else {
      link.classList.remove('active');
    }
  });
}
