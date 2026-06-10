/* Pamusika — shell behaviour: theme toggle, live clock, fav toggles */
(function () {
  const root = document.documentElement;

  // ---- theme ----
  const saved = localStorage.getItem('pam-theme') || 'dark';
  root.setAttribute('data-theme', saved);

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem('pam-theme', t);
    syncToggles();
  }
  function syncToggles() {
    const t = root.getAttribute('data-theme');
    document.querySelectorAll('[data-toggle="theme"] button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.theme === t);
    });
  }

  function wire() {
    document.querySelectorAll('[data-toggle="theme"] button').forEach(function (b) {
      b.addEventListener('click', function () { setTheme(b.dataset.theme); });
    });
    syncToggles();

    // favourite hearts
    document.querySelectorAll('[data-fav]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        const on = el.classList.toggle('on');
        const ic = el.querySelector('i');
        if (ic) { ic.setAttribute('data-i', on ? 'heartfill' : 'heart'); ic.dataset.done = ''; }
        el.style.color = on ? 'var(--danger)' : '';
        if (window.PamIcons) window.PamIcons.render(el);
      });
    });

    // generic chip / seg / tab active swap within a group
    document.querySelectorAll('[data-group]').forEach(function (group) {
      group.addEventListener('click', function (e) {
        const item = e.target.closest('[data-item]');
        if (!item || !group.contains(item)) return;
        group.querySelectorAll('[data-item]').forEach(function (x) { x.classList.remove('active'); });
        item.classList.add('active');
      });
    });
  }

  // ---- live clock in status bars ----
  function clock() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes();
    const str = (h % 12 || 12) + ':' + String(m).padStart(2, '0');
    document.querySelectorAll('.sb-time').forEach(function (el) { el.textContent = str; });
  }

  if (document.readyState !== 'loading') { wire(); clock(); }
  else document.addEventListener('DOMContentLoaded', function () { wire(); clock(); });
  setInterval(clock, 10000);
  window.PamSetTheme = setTheme;
})();
