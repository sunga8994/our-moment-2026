// Keep the existing UI event while also preparing GTM's data layer.
document.querySelectorAll('[data-cta]').forEach(link => link.addEventListener('click', () => {
  const name = link.dataset.cta;
  const href = link.getAttribute('href');
  window.dispatchEvent(new CustomEvent('landing:cta', { detail: { name, href } }));
  let eventName;
  if (name === 'hero-guide' || name === 'final-guide') eventName = 'main_cta_click';
  else if (name.startsWith('note-')) eventName = 'note_card_click';
  else if (name === 'list-start') eventName = 'list_start_click';
  else if (/^article-[12]-next$/.test(name)) eventName = 'article_next_click';
  else if (name === 'feature-highlights' || name === 'article-3-broadcaster') eventName = 'highlight_click';
  else return;
  const destination = new URL(href, window.location.href);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'our_moment_cta', event_name: eventName,
    cta_name: name, cta_text: link.innerText.trim().replace(/\s+/g, ' ').slice(0, 150),
    placement: name === 'hero-guide' ? 'hero' : name === 'final-guide' ? 'final' : link.closest('.related-notes') ? 'related' : link.closest('article') ? 'article' : link.closest('.notes-list') ? 'blog_list' : name === 'feature-highlights' ? 'highlights' : 'main_notes',
    link_url: destination.origin + destination.pathname + destination.hash,
    page_path: window.location.pathname, transport_type: 'beacon'
  });
}));
