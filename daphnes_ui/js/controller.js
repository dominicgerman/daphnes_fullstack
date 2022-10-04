import * as model from './model.js'
// import icons from 'url:../imgs/search_icon.svg';

import View from './views/View.js'
import indexView from './views/indexView.js'
// import navView from './views/navView.js';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// let tabs;
// let tabsContainer;
// let tabsContent;
// const recipeContainer = document.querySelector('.recipe-container');
// const indexContainer = document.querySelector('.index-container');

const controlRecipeIndex = async function () {
  try {
    // 1) Load all recipes
    await model.loadAllRecipes()

    // 2) Render all recipes
    indexView.render(model.state.recipeIndex.recipes)
  } catch (err) {
    console.error(err)
  }
}

const controlRecipes = async function () {
  const id = window.location.hash.slice(1)
  if (!id) {
    recipeView.clear()
    controlRecipeIndex()
    return
  }
  try {
    // 1) Clear indexContainer
    indexView.clear()
    // 2a) Loading recipe
    await model.loadRecipe(id)

    // 2b) Rendering recipe
    recipeView.render(model.state.recipe)
  } catch (err) {
    console.error(err)
    recipeView.renderError()
  }
  // 3) Listen for click events on tabs
  const tabsContainer = document.querySelector('.recipe-info__tab-container')

  tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.recipe-info__tab')
    let tabs = document.querySelectorAll('.recipe-info__tab')
    let tabsContent = document.querySelectorAll('.recipe-info__content')
    // Guard clause
    if (!clicked) return

    // Remove active classes
    tabs.forEach((t) => t.classList.remove('tab--active'))
    tabsContent.forEach((c) => c.classList.remove('content--active'))

    // Activate tab
    clicked.classList.add('tab--active')

    // Activate content area
    document
      .querySelector(`.${clicked.dataset.tab}__content`)
      .classList.add('content--active')
  })
}

const controlSearchResults = async () => {
  try {
    // 1) Get search query
    const query = searchView.getQuery()
    if (!query) return

    // 1b) Set query variable in indexView
    indexView.queryHandler(query)

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    indexView.render(model.state.search.results)
  } catch (err) {
    console.error(err)
  }
}

const controlTagSearch = async (query) => {
  try {
    // 1) Load search results
    await model.loadSearchResults(query)

    // 1b) Set query variable in indexView
    indexView.queryHandler(query)

    // 2) Clear the recipe-container HTML
    recipeView.clear()

    // 2) Render results
    indexView.render(model.state.search.results)
    indexView.render(model.state.search.results)
  } catch (err) {
    console.error(err)
  }
}

const controlNavButton = () => {
  document.querySelector('.hamburger-icon').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('nav-open')
    document.querySelector('body').classList.toggle('fixed')
  })
}

const init = () => {
  indexView.addHandlerRender(controlRecipeIndex)
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
  searchView.addHandlerTagSearch(controlTagSearch)
  controlNavButton()
}

init()

// ['hashchange', 'load'].forEach((ev) =>
//   window.addEventListener(ev, controlRecipes(idFromHash))
// );
// pass this into loadRecipe (eventually)
// controlRecipes(id);

// controlRecipes(idFromHash);
// controlRecipes('62ce51d1fef354969cf4992d');
// controlRecipes('62ce4b47fef354969cf49926');
