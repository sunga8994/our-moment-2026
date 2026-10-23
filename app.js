document.querySelectorAll('[data-cta]').forEach(link => link.addEventListener('click', () => {
  window.dispatchEvent(new CustomEvent('landing:cta', { detail: { name: link.dataset.cta, href: link.getAttribute('href') } }));
}));
