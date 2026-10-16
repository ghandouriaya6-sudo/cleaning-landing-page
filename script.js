(() => {
  const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  const setMenu = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  document.querySelectorAll('.faq button').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open);
    document.getElementById(b.getAttribute('aria-controls')).hidden = open;
  }));

  const form = document.getElementById('form'), status = document.getElementById('status');
  const rules = {
    name: v => v.trim().length > 1 || 'Enter your full name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email, like name@example.com.',
    zip: v => /^\d{5}(-\d{4})?$/.test(v.trim()) || 'Enter a 5-digit US ZIP code.',
    service: v => !!v || 'Choose a service.'
  };
  const check = k => {
    const f = form.elements[k], r = rules[k](f.value), e = document.getElementById('e-' + k);
    f.setAttribute('aria-invalid', r !== true); f.setAttribute('aria-describedby', 'e-' + k);
    e.textContent = r === true ? '' : r; return r === true;
  };
  Object.keys(rules).forEach(k => form.elements[k].addEventListener('blur', () => check(k)));

  form.addEventListener('submit', async e => {
    e.preventDefault(); status.className = '';
    const bad = Object.keys(rules).filter(k => !check(k));
    if (bad.length) { form.elements[bad[0]].focus(); status.textContent = 'Please fix the highlighted fields.'; status.className = 'bad'; return; }
    if (form.elements.website.value) return; // honeypot: bots fill this; silently drop
    const url = form.dataset.endpoint;
    if (!url) { // no backend connected: never fake success
      status.textContent = 'Demo mode: this form is not connected to a service, so nothing was sent. See README.md.';
      status.className = 'bad'; status.focus(); return;
    }
    try {
      const data = Object.fromEntries(new FormData(form)); delete data.website;
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(res.status);
      form.reset(); status.textContent = 'Thanks. We received your request and will reply with an estimate.'; status.className = 'ok';
    } catch { status.textContent = 'Something went wrong and your request was not sent. Please try again or email us.'; status.className = 'bad'; }
    status.focus();
  });
})();
