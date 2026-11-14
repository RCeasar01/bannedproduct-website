/**
 * BannedProduct Media — Shared Footer
 * Injects footer, scroll-to-top, and fade-up animations
 */
(function () {
  const YEAR = new Date().getFullYear();

  const SOCIAL = [
    { icon: '▶', label: 'YouTube',   href: 'https://www.youtube.com/@bannedproduct' },
    { icon: '◉', label: 'Instagram', href: 'https://www.instagram.com/rob_ceasar/' },
    { icon: '◈', label: 'TikTok',    href: 'https://www.tiktok.com/@bannedproduct7' },
    { icon: '◐', label: 'Twitch',    href: 'https://www.twitch.tv/banned_product' },
    { icon: '⬡', label: 'Whatnot',   href: 'https://www.whatnot.com/user/bannedproduct' },
    { icon: '◎', label: 'LinkedIn',  href: 'https://www.linkedin.com/in/robertceasar/' },
    { icon: '◑', label: 'Facebook',  href: 'https://www.facebook.com/robert.ceasar1/' },
    { icon: '◈', label: 'Discord',   href: 'https://discord.gg/9qM6aBw9Eq' },
  ];

  function resolvePath(href) {
    // Site is served from the domain root, so root-absolute paths work from every page.
    // (The old depth-based version produced "about/" on /services/, which 404'd.)
    if (!window.location.hostname.includes('github.io')) return href;
    const depth = (window.location.pathname.match(/\//g) || []).length;
    const levels = Math.max(0, depth - 2);
    const rel = href.replace(/^\//, '');
    if (levels === 0) return rel || './';
    return Array(levels).fill('..').join('/') + '/' + rel;
  }

  function buildFooter() {
    const socialHTML = SOCIAL.map(({ icon, label, href }) =>
      `<a href="${href}" target="_blank" rel="noopener">${label}</a>`
    ).join('');

    return `
<footer id="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${resolvePath('/')}" class="nav-logo" aria-label="BannedProduct Media Home"><img class="nav-logo-img" src="${resolvePath('/images/logos/logo-website-cropped.png')}" alt="BannedProduct Media Inc." width="640" height="193" style="height:64px;width:auto;"></a>
        <p>A veteran-owned media &amp; IT company delivering bold content, cutting-edge technology, and authentic storytelling. We build brands that cannot be silenced.</p>
        <div class="footer-social" aria-label="Social media links">
          ${socialHTML}
        </div>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${resolvePath('/services/')}#web">Websites &amp; Web Apps</a></li>
          <li><a href="${resolvePath('/services/')}#apps">Mobile Apps</a></li>
          <li><a href="${resolvePath('/services/')}#ai">AI &amp; Automation</a></li>
          <li><a href="${resolvePath('/services/')}#podcast">Podcast Production</a></li>
          <li><a href="${resolvePath('/services/')}#video">Video Production</a></li>
          <li><a href="${resolvePath('/services/')}#livestream">Livestream</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${resolvePath('/about/')}">About Us</a></li>
          <li><a href="${resolvePath('/portfolio/')}">Work</a></li>
          <li><a href="${resolvePath('/techcustoms/')}">Tech Customs</a></li>
          <li><a href="${resolvePath('/demos/')}">Live Demos</a></li>
          <li><a href="${resolvePath('/content/')}">Content Hub</a></li>
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
          <h4>Contact</h4>
          <p style="font-size:0.8rem;color:#888;margin-top:0.5rem;"><a href="tel:+17048358274" style="color:#cc1111;text-decoration:none;">704-835-8274</a><br><a href="mailto:contact@bannedproductmedia.com" style="color:#cc1111;text-decoration:none;">contact@bannedproductmedia.com</a></p>
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