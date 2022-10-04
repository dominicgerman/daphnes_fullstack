import View from './View.js'
import { PAGE_URL } from '../config.js'

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe-container')
  _errorMessage = `Can't find that recipe. Try another one!`

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler)
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return `
    <div class="navigate-back-link">
        <a href="#"
          >Back to recipes</a
        >
    </div>
    <h1>${this._data.name}</h1>
    <p class="short-description">${this._data.description}</p>
    <div class="recipe-container__content">
      <div class="recipe-info">
        <div class="recipe-info__tab-container">
          <button class="recipe-info__tab about__tab tab--active" data-tab="about">
          About
          </button>
          <button class="recipe-info__tab specs__tab" data-tab="specs">
          Recipe
          </button>
          <button class="recipe-info__tab similar-to__tab" data-tab="similar-to">
          Similar to
          </button>
          </div>
          <div class="content-container">

      <!-- ABOUT SECTION -->
          <div class="recipe-info__content about__content content--active">
            <p class="about__text-box">${this._data.about}</p>
            <ul class="tag-list">
            ${this._data.tags
              .map((t, i) => {
                return `
                <li class="tag-element">
                  <a class="tag-link" href="#">${t}</a>${
                  i < this._data.tags.length - 1 ? `,` : ''
                }</li>
                `
              })
              .join('')}
            </ul>
          </div>

      <!-- SPECS & INSTRUCTIONS SECTION -->
          <div class="recipe-info__content specs__content">
            <ul class="ingredient-amounts">
              ${this._data.ingredients
                .map((ing) => {
                  return `
                <li class="amount">${ing.measure || ''}</li>
                `
                })
                .join('')}
            </ul>
            <ul class="ingredient-names">
              ${this._data.ingredients
                .map((ing) => {
                  return `
                <li class="name">${ing.name}</li>
                `
                })
                .join('')}
            </ul>
            <p class="recipe-instructions">${this._data.instructions}</p>
          </div>

      <!-- SIMILAR TO SECTION -->
          <div class="recipe-info__content similar-to__content">
            ${this._data.similarTo
              .map((el) => {
                return `
            <a href="${PAGE_URL}/html/recipeIndex.html#${el.id}">
            <div class="similar-to__img-box">
              <img
                class="similar-to__img"
                src="/imgs/cocktail-imgs/${el.imageCover}"
                alt="similar cocktail"
              />
              <p>${el.name}</p>
            </div>
            </a>
            `
              })
              .join('')}
          </div>
        </div>
      </div>
      <div class="recipe-img">
          <img
            class="cocktail-img"
            src="/imgs/cocktail-imgs/${this._data.image}"
            alt="Picture of ${this._data.name}"
          />
      </div>
    </div>
    
          `
  }
}

export default new RecipeView()
