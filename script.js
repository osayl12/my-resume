document.addEventListener('DOMContentLoaded', () => {

// Persisted theme toggle
const root = document.documentElement;
const btn = document.getElementById('themeBtn');

// Load saved theme (if any)
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  root.classList.add('light');
  if (btn) btn.textContent = '☀';
}

// Toggle on click
btn?.addEventListener('click', () => {
  root.classList.toggle('light');
  const isLight = root.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  btn.textContent = isLight ? '☀' : '☾';
});
 const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('emailLink');

  copyBtn?.addEventListener('click', async () => {
    try {
      const email = emailLink?.textContent?.trim() || 'Hamedosayl@gmail.com';
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = original), 1200);
    } catch (e) {
      alert('Copy failed, please copy manually.');
    }
  });
});
