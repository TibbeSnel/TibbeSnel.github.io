// Define <nav-component> custom element
class NavComponent extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    if (!src) return;
    fetch(src)
      .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
      .then(html => {
        this.innerHTML = html;
        initNavBehaviour(); // Enable mobile nav toggle
      })
      .catch(err => console.error('Nav load error:', err));
  }
}
customElements.define('nav-component', NavComponent);

// Define <footer-component> custom element
class FooterComponent extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute('src');
    if (!src) return;
    fetch(src)
      .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
      .then(html => {
        this.innerHTML = html;
      })
      .catch(err => console.error('Footer load error:', err));
  }
}
customElements.define('footer-component', FooterComponent);

// Toggle mobile menu open/close
function initNavBehaviour() {
  const menuIcon = document.querySelector('.menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuIcon?.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenu.style.right = isHidden ? '-100%' : '0%';
    menuIcon.classList.toggle('open', !isHidden);
  });
}

