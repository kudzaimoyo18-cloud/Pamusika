/* Pamusika — inline SVG icon set. Usage: <i data-i="heart"></i> */
(function () {
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    heart: '<path d="M12 20s-7-4.4-9.3-8.4C1.2 8.9 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 4.8 3.4 3.3 6.1C19 15.6 12 20 12 20Z"/>',
    heartfill: '<path d="M12 20s-7-4.4-9.3-8.4C1.2 8.9 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.4 0 4.8 3.4 3.3 6.1C19 15.6 12 20 12 20Z" fill="currentColor" stroke="none"/>',
    message: '<path d="M4 5h16v11H9l-4 3.5V16H4Z"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12 7.6L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5Z"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.6-3.6 3.4-5.4 7-5.4s6.4 1.8 7 5.4"/>',
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    cleft: '<path d="m15 5-7 7 7 7"/>',
    cright: '<path d="m9 5 7 7-7 7"/>',
    cdown: '<path d="m5 9 7 7 7-7"/>',
    sliders: '<path d="M5 7h9M18 7h1M5 12h1M10 12h9M5 17h12M21 17h-2"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="19" cy="17" r="2"/>',
    sort: '<path d="M7 5v14M7 19l-3-3M7 5l3 3M17 19V5M17 5l3 3M17 19l-3-3"/>',
    pin: '<path d="M12 21s-6.5-5.5-6.5-10.5A6.5 6.5 0 0 1 18.5 10.5C18.5 15.5 12 21 12 21Z"/><circle cx="12" cy="10.3" r="2.4"/>',
    share: '<circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="m8.1 11 6.8-3.8M8.1 13l6.8 3.8"/>',
    flag: '<path d="M6 21V4M6 5h11l-2 3 2 3H6"/>',
    shield: '<path d="M12 3 19 6v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6Z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    checkcircle: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.3 2.3L16 9.5"/>',
    verified: '<path d="m12 3 2.1 1.6 2.6-.3 1 2.4 2.4 1-.3 2.6L23 16l-1.6 2.1.3 2.6-2.4 1-1 2.4-2.6-.3L12 23l-2.1-1.6-2.6.3-1-2.4-2.4-1 .3-2.6L1 12l1.6-2.1L2.3 7.3l2.4-1 1-2.4 2.6.3Z" fill="currentColor" stroke="none"/><path d="m8.8 12 2.2 2.2 4.4-4.4" stroke="var(--green-ink)" stroke-width="2"/>',
    camera: '<path d="M4 8h3l1.5-2h7L16 8h4v11H4Z"/><circle cx="12" cy="13" r="3.3"/>',
    image: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 4-3.5 3 2.2 3-2.7 5 4"/>',
    star: '<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5L7.2 21l.9-5.4L4.2 9.7l5.4-.8Z"/>',
    starfill: '<path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5L7.2 21l.9-5.4L4.2 9.7l5.4-.8Z" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    car: '<path d="M5 16v3M19 16v3"/><path d="M4 16v-3l2-5h12l2 5v3Z"/><path d="M6.5 8 5.5 11h13l-1-3"/><circle cx="8" cy="13.5" r="1.1"/><circle cx="16" cy="13.5" r="1.1"/>',
    store: '<path d="M4 9 5.5 4h13L20 9M4 9h16M4 9v11h16V9M5 20v-6h5v6"/>',
    tag: '<path d="M4 4h7l9 9-7 7-9-9Z"/><circle cx="8.5" cy="8.5" r="1.4"/>',
    send: '<path d="M5 12 20 5l-5 15-3.5-6.5Z"/><path d="m11.5 13.5 8.5-8.5"/>',
    phone: '<path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.4c-.2.5-.2 1.6.8 2.9 1.2 1.6 2.6 2.2 3.2 2.3.6.1 1.2-.3 1.4-.8.1-.3 0-.5-.2-.7l-1.3-.7c-.2-.1-.4 0-.6.2l-.3.4c-.7-.3-1.6-1.1-1.9-1.8l.4-.4c.2-.1.2-.4.1-.6l-.5-1.2c-.1-.3-.4-.4-.7-.3Z" fill="currentColor" stroke="none"/>',
    eye: '<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.8"/>',
    boost: '<path d="M12 3c2.5 2 4 4.6 4 7.5 0 1.6-.6 3-1.6 4M12 3c-2.5 2-4 4.6-4 7.5 0 1.6.6 3 1.6 4M9 18.5h6M10 21.5h4"/><circle cx="12" cy="10" r="1.6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    dots: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"/>',
    trash: '<path d="M5 7h14M9 7V4.5h6V7M7 7l1 13h8l1-13"/>',
    edit: '<path d="M5 19h14M7 16l9-9 2.5 2.5-9 9H7Z"/>',
    wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.2a9.5 9.5 0 0 1 13 0M8.5 15.4a5 5 0 0 1 7 0"/><circle cx="12" cy="18.5" r="1" fill="currentColor" stroke="none"/>',
    arrowright: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    plusbig: '<path d="M12 6v12M6 12h12"/>',
    refresh: '<path d="M19 9A7 7 0 0 0 6 7.5M5 5v3h3M5 15a7 7 0 0 0 13 1.5M19 19v-3h-3"/>',
    bookmark: '<path d="M7 4h10v16l-5-3.5L7 20Z"/>',
    location2: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/><circle cx="12" cy="12" r="2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4 6.3 6.3 0 0 0 20 14.5Z"/>',
    phoneframe: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 5h4"/>',
    desktop: '<rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16.5V20"/>',
  };
  function render(root) {
    (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
      const name = el.getAttribute('data-i');
      if (!I[name] || el.dataset.done) return;
      const sw = el.getAttribute('data-sw') || '1.7';
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round">' + I[name] + '</svg>';
      el.dataset.done = '1';
    });
  }
  window.PamIcons = { set: I, render };
  if (document.readyState !== 'loading') render();
  else document.addEventListener('DOMContentLoaded', function () { render(); });
})();
