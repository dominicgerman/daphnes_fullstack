const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})

  response.json(recipes)
})

recipesRouter.get('/:id', async (request, response) => {
  const recipe = await Recipe.findById(request.params.id).populate({
    path: 'similarTo',
    select: 'name imageCover',
  })
  if (recipe) {
    response.json(recipe)
  } else {
    response.status(404).end()
  }
})

module.exports = recipesRouter
