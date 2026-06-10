/**
 * BannedProduct Media — Shared Header
 * Injects nav and handles mobile toggle + active link
 */
(function () {
  const NAV_LINKS = [
    { href: '/',           label: 'Home' },
    { href: '/about/',     label: 'About' },
    { href: '/services/',  label: 'Services' },
    { href: '/portfolio/', label: 'Work' },
    { href: '/content/',   label: 'Content' },
    { href: '/podcast/',   label: 'Podcast' },
    { href: '/contact/',   label: 'Contact', cta: true },
  ];

  function getBasePath() {
    // GitHub Pages serves from a subdirectory (e.g. /bannedproduct-website/)
    // so depth=2 at the root — we need depth-2 levels of '..' to get back to site root
    const depth = (window.location.pathname.match(/\//g) || []).length;
    const levels = Math.max(0, depth - 2);
    if (levels === 0) return '';
    return Array(levels).fill('..').join('/');
  }

  function resolvePath(href) {
    const base = getBasePath();
    const rel = href.replace(/^\//, ''); // strip leading slash
    if (!base) return rel || './';
    return base + '/' + rel;
  }

  function isActive(href) {
    const p = window.location.pathname;
    if (href === '/') return p === '/' || p.endsWith('/index.html') && !p.replace(/\/index\.html$/, '').includes('/');
    return p.includes(href.replace(/\/$/, ''));
  }

  function buildHeader() {
    const linksHTML = NAV_LINKS.map(({ href, label, cta }) => {
      const cls = [cta ? 'nav-cta' : '', isActive(href) ? 'active' : ''].filter(Boolean).join(' ');
      return `<a href="${resolvePath(href)}" class="${cls}">${label}</a>`;
    }).join('');

    return `
<header id="site-header" role="banner">
  <nav class="nav-inner" aria-label="Main navigation">
    <a href="${resolvePath('/')}" class="nav-logo" aria-label="BannedProduct Media Home">
      <img
        src="${resolvePath('/images/logos/logo-website.png')}"
        alt="BannedProduct Media Inc."
        class="nav-logo-img"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
      >
      <span class="nav-logo-text" style="display:none">
        <span class="logo-main">
          <span class="logo-banned">BANNED</span><span class="logo-product">PRODUCT</span>
        </span>
        <span class="logo-sub">MEDIA INC.</span>
      </span>
    </a>
    <div class="nav-links" id="nav-links" role="list">
      ${linksHTML}
    </div>
    <button class="nav-hamburger" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>`;
  }

  function init() {
    // Inject header
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.outerHTML = buildHeader();
    } else {
      document.body.insertAdjacentHTML('afterbegin', buildHeader());
    }

    // Mobile toggle
    const toggle = document.getElementById('nav-toggle');
    const links  = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        // Animate hamburger lines
        const spans = toggle.querySelectorAll('span');
        if (open) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#site-header') && links.classList.contains('open')) {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', false);
          toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
      });
    }

    // Scroll shadow on header
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 30px rgba(189,113,29,0.15)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
