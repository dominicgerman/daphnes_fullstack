import { PAGE_URL } from '../config.js'
import View from './View.js'

class IndexView extends View {
  _parentElement = document.querySelector('.index-container')
  _query
  _errorMessage = ` Please try another search term or <a class="no-results__link" href="${PAGE_URL}/html/recipeindex#">view all recipes</a>.`

  addHandlerRender(handler) {
    if (window.location.hash === '') {
      window.addEventListener('load', handler)
    }
  }

  queryHandler(query) {
    this._query = query
  }

  _generateMarkup() {
    return `
    <h1 class="index-header">Recipes</h1>
    <form class="search-bar">
    <input type="text" class="search__field" placeholder="Search for..."/>
    <button class="search__button"><i class="fa fa-search"></i></button>
    </form>
    <div class="results-message">${
      this._data[0].query
        ? `<p>Search results for <strong>${this._data[0].query} </strong> <a class="clear-results" href="#" onclick="window.location.reload()"> clear</a></p>`
        : ''
    }</div>
    <div class="index-container__content">
      ${this._data
        .map((el) => {
          return `
        <div class="recipe-thumbnail-item">
          <a href="#${el.id}">
            <div class="thumbnail__img-box">
            <img
                class="thumbnail__img"
                src="/imgs/cocktail-imgs/${el.image}"
                alt="picture of a ${el.name} cocktail"
            />
            <p class="thumbnail__text">${el.name}</p>
            </div>
          </a>
        </div>
        `
        })
        .join('')}
  </div>
    `
  }
}

export default new IndexView()
