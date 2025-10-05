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
