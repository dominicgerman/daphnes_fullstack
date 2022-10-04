const searchRouter = require('express').Router()
const Recipe = require('../models/recipe')

searchRouter.get('/:q', async (request, response) => {
  const search = request.params.q
  const results = await Recipe.find({ $text: { $search: search } }).select(
    'name imageCover'
  )

  response.status(200).json({
    data: results,
  })
})

module.exports = searchRouter
