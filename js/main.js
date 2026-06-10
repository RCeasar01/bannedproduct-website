/**
 * BannedProduct Media — Page-level scripts
 */
(function () {
  // Contact form submission (static demo)
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const original = btn.textContent;
      btn.textContent = 'SENDING...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'MESSAGE SENT!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        btn.style.color = '#000';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }

  // Portfolio filter tabs
  function initPortfolioFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('[data-cat]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        items.forEach(item => {
          if (cat === 'all' || item.dataset.cat === cat) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target], .pipeline-number[data-target]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1500;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          el.textContent = Math.floor(progress * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  function init() {
    initContactForm();
    initPortfolioFilter();
    animateCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
