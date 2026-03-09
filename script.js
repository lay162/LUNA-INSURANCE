const toggle = document.getElementById('mobile-toggle');
const close = document.getElementById('mobile-close');
const menu = document.getElementById('mobile-menu');

function openMenu() {
  if (!menu || !toggle) return;
  menu.classList.remove('hidden');
  menu.classList.add('flex');
  menu.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!menu || !toggle) return;
  menu.classList.add('hidden');
  menu.classList.remove('flex');
  menu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
}

if (toggle && close && menu) {
  toggle.onclick = openMenu;
  close.onclick = closeMenu;

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.onclick = () => {
      closeMenu();
    };
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('flex')) {
      closeMenu();
    }
  });
}

