/**
 * BannedProduct Media — Shared Footer
 * Injects footer, scroll-to-top, and fade-up animations
 */
(function () {
  const YEAR = new Date().getFullYear();

  const SOCIAL = [
    { icon: '▶', label: 'YouTube',   href: '#' },
    { icon: '◉', label: 'Instagram', href: '#' },
    { icon: '𝕏', label: 'X/Twitter', href: '#' },
    { icon: '◈', label: 'TikTok',    href: '#' },
    { icon: '⬡', label: 'Whatnot',   href: '#' },
    { icon: '◎', label: 'LinkedIn',  href: '#' },
    { icon: '◑', label: 'Facebook',  href: '#' },
  ];

  function resolvePath(href) {
    const depth = (window.location.pathname.match(/\//g) || []).length;
    if (depth <= 1) return href;
    const base = Array(depth - 1).fill('..').join('/');
    return base + href;
  }

  function buildFooter() {
    const socialHTML = SOCIAL.map(({ icon, label, href }) =>
      `<a href="${href}" aria-label="${label}" title="${label}">${icon}</a>`
    ).join('');

    return `
<footer id="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${resolvePath('/')}" class="nav-logo">BANNED<span>PRODUCT</span></a>
        <p>A veteran-owned media company delivering bold content, cutting-edge technology, and authentic storytelling. We build brands that cannot be silenced.</p>
        <div class="footer-social" aria-label="Social media links">
          ${socialHTML}
        </div>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${resolvePath('/services/')}#podcast">Podcast Production</a></li>
          <li><a href="${resolvePath('/services/')}#video">Video Production</a></li>
          <li><a href="${resolvePath('/services/')}#livestream">Livestream</a></li>
          <li><a href="${resolvePath('/services/')}#web">Web Development</a></li>
          <li><a href="${resolvePath('/services/')}#bi">Business Intelligence</a></li>
          <li><a href="${resolvePath('/services/')}#ai">AI &amp; Automation</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${resolvePath('/about/')}">About Us</a></li>
          <li><a href="${resolvePath('/portfolio/')}">Portfolio</a></li>
          <li><a href="${resolvePath('/podcast/')}">Podcast</a></li>
          <li><a href="${resolvePath('/blog/')}">Blog</a></li>
          <li><a href="${resolvePath('/giveaways/')}">Giveaways</a></li>
          <li><a href="${resolvePath('/contact/')}">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${resolvePath('/privacy-policy/')}">Privacy Policy</a></li>
          <li><a href="${resolvePath('/terms/')}">Terms of Service</a></li>
          <li><a href="${resolvePath('/giveaway-rules/')}">Giveaway Rules</a></li>
        </ul>
        <div style="margin-top:1.5rem;">
          <h4>Veteran Owned</h4>
          <p style="font-size:0.8rem;color:#888;margin-top:0.5rem;">Proudly serving our community with the same dedication given to our country.</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; ${YEAR} BannedProduct Media Inc. All rights reserved.</p>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
        <a href="${resolvePath('/privacy-policy/')}">Privacy</a>
        <a href="${resolvePath('/terms/')}">Terms</a>
        <a href="${resolvePath('/giveaway-rules/')}">Giveaway Rules</a>
      </div>
    </div>
  </div>

  <button id="scroll-top" aria-label="Scroll to top" style="
    position:fixed;bottom:2rem;right:2rem;
    width:44px;height:44px;
    background:var(--accent);border:none;
    color:var(--black);font-size:1.2rem;
    cursor:pointer;opacity:0;
    transition:opacity 0.3s,transform 0.3s;
    z-index:500;display:flex;align-items:center;justify-content:center;
    transform:translateY(20px);
  ">&#8593;</button>
</footer>`;
  }

  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      btn.style.opacity = show ? '1' : '0';
      btn.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  function init() {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.outerHTML = buildFooter();
    } else {
      document.body.insertAdjacentHTML('beforeend', buildFooter());
    }
    initScrollTop();
    initFadeUp();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
