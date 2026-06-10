/**
 * BannedProduct Media — Shared Header
 * Top mode bar: BUSINESS | CONTENT
 * Base URL / = business. /content/ and related paths = content mode.
 */
(function () {

  const BIZ_LINKS = [
    { href: '/',          label: 'Home' },
    { href: '/about/',    label: 'About' },
    { href: '/services/', label: 'Services' },
    { href: '/advocacy/', label: 'Advocacy' },
    { href: '/contact/',  label: 'Contact', cta: true },
  ];

  const CONTENT_LINKS = [
    { href: '/content/',                                         label: 'All Content' },
    { href: '/podcast/',                                         label: 'Podcast' },
    { href: '/blog/',                                            label: 'Blog' },
    { href: '/content/#giveaways',                               label: 'Giveaways' },
    { href: '/socials/',                                         label: 'Socials' },
    { href: '/contact/',                                         label: 'Contact', cta: true },
  ];

  const CONTENT_PATHS = ['/content', '/podcast', '/blog', '/giveaways', '/socials'];

  function getBasePath() {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    const levels = Math.max(0, depth - 2);
    if (levels === 0) return '';
    return Array(levels).fill('..').join('/');
  }

  function resolvePath(href) {
    if (/^https?:\/\//.test(href)) return href;
    const base = getBasePath();
    const parts = href.replace(/^\//, '').split('#');
    const path  = parts[0];
    const hash  = parts[1] ? '#' + parts[1] : '';
    if (!base) return (path || './') + hash;
    return base + '/' + path + hash;
  }

  function detectMode() {
    const p = window.location.pathname;
    return CONTENT_PATHS.some(cp => p.includes(cp)) ? 'content' : 'biz';
  }

  function isActive(href) {
    if (/^https?:\/\//.test(href)) return false;
    const p     = window.location.pathname;
    const clean = href.replace(/#.*$/, '');
    if (clean === '/') return p === '/' || (p.endsWith('/index.html') && p.split('/').length <= 3);
    return p.includes(clean.replace(/\/$/, ''));
  }

  function buildHeader() {
    const mode  = detectMode();
    const links = mode === 'content' ? CONTENT_LINKS : BIZ_LINKS;

    const linksHTML = links.map(({ href, label, cta, external }) => {
      const cls    = [cta ? 'nav-cta' : '', isActive(href) ? 'active' : ''].filter(Boolean).join(' ');
      const target = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${resolvePath(href)}" class="${cls}"${target}>${label}</a>`;
    }).join('');

    const bizHref     = resolvePath('/');
    const contentHref = resolvePath('/content/');

    return `
<header id="site-header" role="banner">

  <!-- Mode bar -->
  <div class="mode-bar">
    <div class="mode-bar-inner">
      <span class="mode-bar-label">BannedProduct Media Inc.</span>
      <div class="mode-bar-toggle" role="group" aria-label="Site mode">
        <a href="${bizHref}"     class="mode-bar-btn${mode === 'biz'     ? ' active' : ''}">&#9679; Business</a>
        <a href="${contentHref}" class="mode-bar-btn${mode === 'content' ? ' active' : ''}">&#9679; Content</a>
      </div>
    </div>
  </div>

  <!-- Main nav -->
  <nav class="nav-inner" aria-label="Main navigation">
    <a href="${bizHref}" class="nav-logo" aria-label="BannedProduct Media Home">
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
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
      placeholder.outerHTML = buildHeader();
    } else {
      document.body.insertAdjacentHTML('afterbegin', buildHeader());
    }

    const toggle = document.getElementById('nav-toggle');
    const links  = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        const spans = toggle.querySelectorAll('span');
        if (open) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#site-header') && links.classList.contains('open')) {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', false);
          toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
      });
    }

    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20 ? '0 4px 30px rgba(204,17,17,0.15)' : 'none';
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
