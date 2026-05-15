// form.js — phone mask, validation, submit simulation

const form    = document.getElementById('contact-form');
const phoneEl = document.getElementById('field-phone');

/* Phone mask */
if (phoneEl) {
  phoneEl.addEventListener('input', () => {
    let v = phoneEl.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d*)/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d*)/, '($1) $2');
    phoneEl.value = v;
  });
}

/* Form submit */
form?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn  = form.querySelector('.btn-submit');
  const name = form.querySelector('#field-name').value.trim();
  const phone = phoneEl?.value.trim();
  const email = form.querySelector('#field-email').value.trim();

  if (!name || !phone || !email) {
    showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  btn.classList.add('loading');
  await new Promise(r => setTimeout(r, 1800)); // simula envio
  btn.classList.remove('loading');
  form.reset();
  showNotification('Mensagem enviada! Entraremos em contato em breve.', 'success');
});

function showNotification(msg, type) {
  const existing = document.querySelector('.form-notification');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.className = 'form-notification';
  n.style.cssText = `
    position:fixed; bottom:100px; right:32px; z-index:2000;
    background:${type === 'success' ? '#1C2B4A' : '#3a1515'};
    border:1px solid ${type === 'success' ? 'rgba(201,168,76,0.4)' : 'rgba(200,50,50,0.4)'};
    color:#F0EDE6; font-family:'DM Sans',sans-serif; font-size:14px;
    padding:14px 20px; border-radius:6px; max-width:320px;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    animation:slideIn 0.35s ease;
  `;
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 4500);
}
