const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Recipe = require('../models/recipe')

beforeEach(async () => {
  await Recipe.deleteMany({})

  const recipeObjects = helper.initialRecipes.map(
    (recipe) => new Recipe(recipe)
  )
  const promiseArray = recipeObjects.map((rec) => rec.save())
  await Promise.all(promiseArray)
}, 100000)

describe('when recipes have been initialized', () => {
  test('recipes are returned as json', async () => {
    await api
      .get('/api/recipes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all recipes are returned', async () => {
    const response = await api.get('/api/recipes')

    expect(response.body).toHaveLength(helper.initialRecipes.length)
  }, 100000)

  test('a specific recipe is returned', async () => {
    const response = await api.get('/api/recipes')

    const names = response.body.map((r) => r.name)

    expect(names).toContain('Rum Old Fashioned')
  }, 100000)
})

describe('viewing a specific recipe', () => {
  test('a specific recipe can be viewed', async () => {
    const recipesAtStart = await helper.recipesInDb()

    const recipeToView = recipesAtStart[0]

    const resultRecipe = await api
      .get(`/api/recipes/${recipeToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedRecipeToView = JSON.parse(JSON.stringify(recipeToView))

    expect(resultRecipe.body).toEqual(processedRecipeToView)
  }, 100000)

  test('fails with statuscode 404 if recipe does not exist', async () => {
    const validNonexistingId = await helper.nonExistantId()

    await api.get(`/api/recipes/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '54h9d5da590745342a82a3445'

    await api.get(`/api/recipes/${invalidId}`).expect(400)
  })
})

describe('adding a new recipe', () => {
  test('succeeds with valid data', async () => {
    const authenticatedUser = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const newRecipe = {
      name: 'Vieux-Carre',
      description: `A perfectly balanced New Orlean's classic.`,
      menuDescription: 'rye, cognac, benedictine, cocchi di torino, bitters',
      tags: ['whiskey', 'cognac', 'vermouth', 'boozy', 'classics'],
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ingredients: [
        {
          name: 'rye',
          measure: '¾ oz',
        },
        {
          name: 'cognac',
          measure: '¾ oz',
        },
      ],
      instructions:
        'Combine all the ingredients in a mixing glass filled with ice and stir for 25-30 seconds, or until well chilled. Strain into a rocks glass over one large cube. Alternately strain into a chilled coupe and serve up. Garnish with a lemon twist.',
      menuItem: false,
      imageCover: 'vieux-carre.jpg',
    }

    await api
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(newRecipe)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const recipesAtEnd = await helper.recipesInDb()
    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length + 1)

    const names = recipesAtEnd.map((r) => r.name)
    expect(names).toContain('Vieux-Carre')
  }, 100000)

  test('fails if data is invalid', async () => {
    const authenticatedUser = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const newRecipe = {
      description: `A recipe without a name.`,
      menuDescription: 'test, test, 1, 2, 3!',
      tags: ['vermouth', 'boozy', 'classics'],
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ingredients: [
        {
          name: 'rye',
          measure: '¾ oz',
        },
        {
          name: 'cognac',
          measure: '¾ oz',
        },
      ],
      instructions: 'test',
      menuItem: false,
      imageCover: 'test.jpg',
    }

    await api
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(newRecipe)
      .expect(400)

    const recipesAtEnd = await helper.recipesInDb()

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length)
  })
})

describe('deletion of a recipe', () => {
  test('succeeds if id is valid', async () => {
    const authenticatedUser = await api
      .post('/api/login')
      .send({ username: 'root', password: 'secret' })
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const recipesAtStart = await helper.recipesInDb()
    const recipeToDelete = recipesAtStart[0]

    await api
      .delete(`/api/recipes/${recipeToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const recipesAtEnd = await helper.recipesInDb()

    expect(recipesAtEnd).toHaveLength(helper.initialRecipes.length - 1)

    const names = recipesAtEnd.map((r) => r.name)

    expect(names).not.toContain(recipeToDelete.name)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
}, 100000)
