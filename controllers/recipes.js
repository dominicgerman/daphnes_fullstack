const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({}).populate('user', {
    username: 1,
    name: 1,
  })
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

recipesRouter.post('/', async (request, response) => {
  console.log(request.file)
  console.log(request.body)
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const recipe = new Recipe({
    name: body.name,
    description: body.description,
    menuDescription: body.menuDescription,
    similarTo: body.similarTo || [],
    tags: body.tags || [],
    about: body.about,
    ingredients: body.ingredients,
    imageCover: body.imageCover,
    instructions: body.instructions,
    menuItem: body.menuItem || false,
    user: user._id,
  })

  const savedRecipe = await recipe.save()
  user.recipes = user.recipes.concat(savedRecipe._id)
  await user.save()

  response.status(201).json(savedRecipe)
})

recipesRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Recipe.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// recipesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const recipe = {
//     name: body.name,
//     description: body.description,
//     menuDescription: body.menuDescription,
//     similarTo: body.similarTo || [],
//     tags: body.tags || [],
//     about: body.about,
//     ingredients: body.ingredients,
//     instructions: body.instructions,
//     imageCover: body.imageCover,
//     menuItem: body.menuItem || false,
//   }

//   Recipe.findByIdAndUpdate(request.params.id, recipe, { new: true })
//     .then((updatedRecipe) => {
//       response.json(updatedRecipe)
//     })
//     .catch((error) => next(error))
// })

module.exports = recipesRouter
