const Recipe = require('../models/recipe')
const User = require('../models/user')

const initialRecipes = [
  {
    menuItem: false,
    tags: ['boozy', 'classics', 'whiskey'],
    name: 'Old Fashioned',
    description: 'Spirit, bitters, sugar, and water.',
    about:
      'The Old-Fashioned is as traditional as they come. A simple mix of spirits, sugar, bitters and water, it appears in 1806 as the first printed recipe for a cocktail. Other alcohols were permitted, but the whiskey or rye version of this combination, over ice, is what we now know as the Old Fashioned, thought to be named later that century after more elaborate new-fangled cocktails entered the canon. During Prohibition, the recipe veered into odd territory, adding fruit and cherries to distract from the available crude spirits. After repeal, it was the imposter version that stuck until the recent cocktail revival brought the original recipe back from the brink of extinction.',
    instructions:
      'Combine all the ingredients in a mixing glass filled with ice and stir until chilled. Strain into a chilled rocks glass over fresh ice, preferably a large cube. If you’re in a rush, skip the mixing glass and just combine the ingredients in a rocks glass with a large ice cube and stir for 20 seconds. Garnish with an orange peel.',
    imageCover: 'old-fashioned.jpg',
    ingredients: [
      {
        name: 'bourbon',
        measure: '2 oz',
      },
      {
        name: 'Angostura bitters',
        measure: '3 dashes',
      },
      {
        name: 'demerara syrup',
        measure: '¼ oz',
      },
      {
        name: 'orange peel to garnish',
        measure: '1 swath',
      },
      {
        name: 'brandied cherry to garnish',
        measure: '1',
      },
    ],
    menuDescription: 'bourbon, demerara sugar, bitters',
  },
  {
    tags: ['rum', 'dry curacao', 'tiki', 'boozy', 'strong'],
    name: 'Rum Old Fashioned',
    description:
      'This old fashioned variation is enhanced with notes of baking spice, bitter orange, and tropical fruit.',
    about: `The rum old fashioned might be my favorite drink. It is one of the two best ways to taste a new rum, the other being a daiquiri. This is my go to recipe for a rum old fashioned...that's why it's so strong. With three ounces of high proof booze in it, this one is the definition of a sipper. Seriously. When it comes to choice of rum, I prefer to use a combination of demerara and jamaican rums. While my personal blend varies, the following bottles are featured frequently: Plantation O.F.T.D., Appleton Estate (any expression), Smith & Cross, and El Dorado 12. The Emakule tiki bitters are from a company called Bitterman's and are optional in this drink as is the flaming of the orange peel.`,
    instructions:
      'Combine all the ingredients in a mixing glass filled with ice and stir until chilled. Strain into a chilled rocks glass over fresh ice, preferably a large cube. If you’re in a rush, skip the mixing glass and just combine the ingredients in a rocks glass with a large ice cube and stir for 20 seconds. Garnish with a flamed orange peel.',
    imageCover: 'rum-old-fashioned.jpg',
    ingredients: [
      {
        name: 'aged rum',
        measure: '2½ oz',
      },
      {
        name: 'dry curaçao',
        measure: '½ oz',
      },
      {
        name: 'demerara syrup',
        measure: '¼ oz',
      },
      {
        name: 'Angostura bitters',
        measure: '2-3 dashes',
      },
      {
        name: 'flamed orange peel to garnish',
      },
      {
        name: 'brandied cherry to garnish',
      },
    ],
    menuDescription: 'aged rum, cane syrup, tiki bitters, flamed orange peel',
    menuItem: true,
  },
]

const nonExistantId = async () => {
  const recipe = new Recipe({
    name: 'test',
    description: 'test',
    menuDescription: 'test',
    about: 'test',
    instructions: 'test',
    imageCover: 'test',
  })
  await recipe.save()
  await recipe.remove()

  return recipe._id.toString()
}

const recipesInDb = async () => {
  const recipes = await Recipe.find({})
  return recipes.map((rec) => rec.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialRecipes,
  nonExistantId,
  recipesInDb,
  usersInDb,
}
