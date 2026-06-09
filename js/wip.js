/**
 * BannedProduct Media — Under Construction / Coming Soon
 * Include this script on any stub page to inject a branded WIP section.
 *
 * Usage on a page:
 *   <main class="page-offset"
 *         data-wip-section="Education"
 *         data-wip-desc="Courses and tutorials on SQL, Python, Tableau, AWS, and more."
 *         data-wip-icon="🎓">
 *   </main>
 *   <script src="../js/wip.js"></script>
 */
(function () {
  const CSS = `
    .wip-section {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 1.5rem;
      text-align: center;
    }
    .wip-inner {
      max-width: 620px;
      margin: 0 auto;
    }
    .wip-icon {
      font-size: 4.5rem;
      line-height: 1;
      margin-bottom: 1.5rem;
      display: block;
      filter: drop-shadow(0 0 18px rgba(204,17,17,0.5));
    }
    .wip-eyebrow {
      font-family: var(--font-head);
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 0.75rem;
      display: block;
    }
    .wip-heading {
      font-family: var(--font-head);
      font-size: clamp(2.4rem, 6vw, 4rem);
      line-height: 1.05;
      color: var(--white);
      margin-bottom: 1.25rem;
    }
    .wip-heading em {
      color: var(--accent);
      font-style: normal;
    }
    .wip-bar {
      width: 56px;
      height: 3px;
      background: var(--accent);
      margin: 0 auto 1.5rem;
    }
    .wip-desc {
      color: var(--text-muted);
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }
    .wip-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(204,17,17,0.12);
      border: 1px solid rgba(204,17,17,0.35);
      color: var(--accent);
      font-family: var(--font-head);
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      padding: 0.45em 1em;
      border-radius: 2px;
      margin-bottom: 2.5rem;
    }
    .wip-badge::before {
      content: '';
      width: 7px;
      height: 7px;
      background: var(--accent);
      border-radius: 50%;
      animation: wipPulse 1.4s ease-in-out infinite;
    }
    @keyframes wipPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }
    .wip-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `;

  function inject() {
    const main = document.querySelector('main[data-wip-section], main.wip-page');
    if (!main) return;

    const section  = main.getAttribute('data-wip-section') || 'This Section';
    const desc     = main.getAttribute('data-wip-desc')    || 'We\'re building something great here. Check back soon.';
    const icon     = main.getAttribute('data-wip-icon')    || '🔥';
    const eta      = main.getAttribute('data-wip-eta')     || '';

    // Inject scoped CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Split section name into first word + rest for accent styling
    const parts = section.trim().split(/\s+/);
    const headingHTML = parts.length > 1
      ? parts[0] + ' <em>' + parts.slice(1).join(' ') + '</em>'
      : '<em>' + section + '</em>';

    const etaLine = eta
      ? `<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:2rem;">Expected: <strong style="color:var(--white);">${eta}</strong></p>`
      : '';

    main.innerHTML = `
      <div class="wip-section">
        <div class="wip-inner">
          <span class="wip-icon">${icon}</span>
          <span class="wip-eyebrow">Coming Soon</span>
          <h1 class="wip-heading">${headingHTML}</h1>
          <div class="wip-bar"></div>
          <p class="wip-desc">${desc}</p>
          <div class="wip-badge">Under Construction</div>
          ${etaLine}
          <div class="wip-actions">
            <a href="/" class="btn btn-primary">Back to Home</a>
            <a href="/contact/" class="btn btn-outline">Get Notified</a>
          </div>
        </div>
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
