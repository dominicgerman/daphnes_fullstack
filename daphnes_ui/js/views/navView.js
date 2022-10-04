class NavView {
  _parentEl = document.querySelector('.nav');

  toggleClassList() {
    document.querySelector('.hamburger-icon').addEventListener('click', () => {
      this._parentEl.classList.toggle('nav-open');
    });
  }
}

export default new NavView();
