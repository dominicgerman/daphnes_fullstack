class SearchView {
  _parentEl = document.querySelector('.index-container');

  getQuery() {
    return this._parentEl.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  addHandlerTagSearch(handler) {
    const el = document.querySelector('.recipe-container');
    el.addEventListener('click', (e) => {
      const tagLink = e.target.closest('.tag-link');
      if (e.target === tagLink) {
        e.preventDefault();
        handler(e.target.textContent);
      }
    });
  }
}

export default new SearchView();
