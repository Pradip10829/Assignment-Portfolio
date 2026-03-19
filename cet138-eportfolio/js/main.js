// Shared script for navigation highlighting, reveal effects, and mini demos.
(function () {
  const currentPath = decodeURIComponent(window.location.pathname);
  const currentFile = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('[data-nav-link]');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefFile = href.split('/').pop();
    if (hrefFile === currentFile) {
      link.classList.add('active-link');
    }
  });

  // For dedicated demo pages, keep Projects highlighted in navigation.
  if (currentPath.includes('/demos/')) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith('projects.html') || href.includes('/projects.html')) {
        link.classList.add('active-link');
      }
    });
  }

  // Progressive reveal for content blocks.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('reveal-show'));
  }

  // JavaScript demo: click counter.
  const clickBtn = document.getElementById('demo-click-btn');
  const clickOutput = document.getElementById('demo-click-output');
  let clickCount = 0;

  if (clickBtn && clickOutput) {
    clickBtn.addEventListener('click', () => {
      clickCount += 1;
      clickOutput.textContent = `Button clicked ${clickCount} time${clickCount > 1 ? 's' : ''}.`;
    });
  }

  // JavaScript demo: live input mirror.
  const inputField = document.getElementById('demo-input-field');
  const inputOutput = document.getElementById('demo-input-output');

  if (inputField && inputOutput) {
    inputField.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      inputOutput.textContent = value ? `Live Preview: ${value}` : 'Live Preview: (waiting for text...)';
    });
  }

  // Contact form validation and success feedback.
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        formFeedback.className = 'feedback-text feedback-error mt-3';
        formFeedback.textContent = 'Please complete all fields before submitting your message.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        formFeedback.className = 'feedback-text feedback-error mt-3';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
      }

      formFeedback.className = 'feedback-text feedback-success mt-3';
      formFeedback.textContent = 'Thank you for your message. I will respond professionally as soon as possible.';
      contactForm.reset();
    });
  }
})();
