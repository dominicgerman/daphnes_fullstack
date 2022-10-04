// import { async } from 'regenerator-runtime';
import { API_URL } from './config.js'

export const state = {
  recipeIndex: {
    recipes: [],
  },
  recipe: {},
  search: {
    query: '',
    results: [],
  },
}

export const loadAllRecipes = async () => {
  try {
    // 1) Loading recipes
    const res = await fetch(`${API_URL}/recipes`)
    const data = await res.json()

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    const recipesArray = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.imageCover,
        slug: item.slug,
      }
    })
    state.recipeIndex.recipes = recipesArray
  } catch (err) {
    console.error(`Oh shittttttt.... ${err}`)
    throw err
  }
}

export const loadRecipe = async (id) => {
  try {
    // 1) Loading individual recipe data
    // console.log(id);
    const res = await fetch(`${API_URL}/recipes/${id}`)
    const data = await res.json()

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    const recipe = data
    state.recipe = {
      id: recipe.id,
      name: recipe.name,
      image: recipe.imageCover,
      description: recipe.description,
      strength: recipe.strength,
      about: recipe.about,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      similarTo: recipe.similarTo,
      tags: recipe.tags,
    }

    // console.log(state.recipe);
  } catch (err) {
    console.error(`Oh shittttttt.... ${err}`)
    throw err
  }
}

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query

    const res = await fetch(`${API_URL}/search/${query}`)

    const data = await res.json()

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

    state.search.results = data.data.map((rec) => {
      return {
        id: rec.id,
        name: rec.name,
        image: rec.imageCover,
        slug: rec.slug,
        query: query,
      }
    })
  } catch (err) {
    console.error(`Oh shittttttt.... ${err}`)
    throw err
  }
}
