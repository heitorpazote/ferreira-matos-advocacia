// main.js
// Nota: navbar scroll, hamburger, scroll reveal, counters e page loader
// são gerenciados pelo script inline em index.html.
// Este arquivo contém apenas o exit-intent do WhatsApp float.

/* ── EXIT INTENT — WhatsApp float ao sair pela borda superior ── */
window.addEventListener('mouseout', e => {
  if (!e.relatedTarget && e.clientY <= 0) {
    document.getElementById('whatsapp-float')?.classList.add('visible');
  }
});
