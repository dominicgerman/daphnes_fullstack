export default class View {
  _data;
  _query;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage, query = this._query) {
    const markup = `
    <h1 class="index-header">Recipes</h1>
    <form class="search-bar">
    <input type="text" class="search__field" placeholder="Search for..."/>
    <button class="search__button"><i class="fa fa-search"></i></button>
    </form>
    <div class="error-msg">
    <p>No results for <strong>${query}</strong>. ${message}</p></div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
