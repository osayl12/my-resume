// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME TOGGLE (dark/light) =====
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.classList.add('light');
    if (themeBtn) themeBtn.textContent = '☀';
  } else if (themeBtn) {
    themeBtn.textContent = '☾';
  }

  themeBtn?.addEventListener('click', () => {
    const nextIsLight = !root.classList.contains('light');
    root.classList.toggle('light', nextIsLight);
    localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    themeBtn.textContent = nextIsLight ? '☀' : '☾';
  });

  // ===== CONTACT: COPY EMAIL BUTTON =====
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('emailLink');

  copyEmailBtn?.addEventListener('click', async () => {
    try {
      const email = emailLink?.textContent?.trim() || 'Hamedosayl@gmail.com';
      await navigator.clipboard.writeText(email);
      const prev = copyEmailBtn.textContent;
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => (copyEmailBtn.textContent = prev), 1200);
    } catch {
      alert('Copy failed, please copy manually.');
    }
  });

  // ===== NAV: HIGHLIGHT ACTIVE SECTION ON SCROLL =====
  const nav = document.querySelector('.site-nav');
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const targets = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = '#' + entry.target.id;
          const link = navLinks.find(a => a.getAttribute('href') === id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    targets.forEach(sec => io.observe(sec));
  } else if (targets.length) {
    // Fallback for very old browsers
    const update = () => {
      let currentId = null;
      for (const sec of targets) {
        if (sec.getBoundingClientRect().top - 120 <= 0) currentId = sec.id;
      }
      if (!currentId) return;
      navLinks.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + currentId)
      );
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
});
