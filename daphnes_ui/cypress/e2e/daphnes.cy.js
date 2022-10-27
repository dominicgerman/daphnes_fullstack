// arrow functions are not recommended because they might cause some issues in certain situations

describe('Daphnes', function () {
  describe('when not logged in (USER)', function () {
    before(function () {
      cy.request('POST', 'http://localhost:8080/api/testing/reset')
      const user = {
        name: 'Tor',
        username: 'torbot',
        password: 'password',
      }
      cy.request('POST', 'http://localhost:8080/api/users/', user)
      cy.login({ username: 'torbot', password: 'password' })
      const recipe = {
        tags: ['rum', 'dry curacao', 'tiki', 'boozy', 'strong'],
        name: 'Rum Old Fashioned',
        description:
          'This old fashioned variation is enhanced with notes of baking spice, bitter orange, and tropical fruit.',
        about: `The rum old fashioned might be my favorite drink. It is one of the two best ways to taste a new rum, the other being a daiquiri. This is my go to recipe for a rum old fashioned...that's why it's so strong. With three ounces of high proof booze in it, this one is the definition of a sipper. Seriously. When it comes to choice of rum, I prefer to use a combination of demerara and jamaican rums. While my personal blend varies, the following bottles are featured frequently: Plantation O.F.T.D., Appleton Estate (any expression), Smith & Cross, and El Dorado 12. The Emakule tiki bitters are from a company called Bitterman's and are optional in this drink as is the flaming of the orange peel.`,
        instructions:
          'Combine all the ingredients in a mixing glass filled with ice and stir until chilled. Strain into a chilled rocks glass over fresh ice, preferably a large cube. If you are in a rush, skip the mixing glass and just combine the ingredients in a rocks glass with a large ice cube and stir for 20 seconds. Garnish with a flamed orange peel.',
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
        menuDescription:
          'aged rum, cane syrup, tiki bitters, flamed orange peel',
        menuItem: true,
      }
      cy.createRecipe(recipe)
    })

    describe('home page', function () {
      it('home page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains(`Daphne's`)
        cy.contains('New menu every Friday at noon')
      })
      it('menu can be opened', function () {
        cy.contains(`Today's menu`).click()
        cy.contains('Rum Old Fashioned')
      })
      it('menu items links can be clicked', function () {
        // cy.contains(`Today's menu`).click()
        cy.contains('Rum Old Fashioned').click()
        cy.contains('This old fashioned variation')
      })
      it('menu can be closed by clicking button', function () {
        cy.visit('http://localhost:3000')
        cy.contains(`Today's menu`).click()
        cy.contains('Close').click()
      })
      it('menu can be closed by clicking background', function () {
        cy.contains(`Today's menu`).click()
        cy.contains('Friday').click()
        cy.get('html').should('not.contain', 'Close')
      })
      it('dealers choice link generates random recipe', function () {
        cy.contains(`Dealer's`).click()
        cy.contains('Rum Old Fashioned')
        cy.url().should('include', '/recipes')
      })
    })

    describe('recipes page', function () {
      it('recipes page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains(`Recipes`).click()
        cy.url().should('include', '/recipes')
        cy.contains('Rum Old Fashioned')
      })
      it('recipes can be filtered by ingredient', function () {
        cy.get('input').eq(1).type('gin')
        cy.get('html').should('not.contain', 'Rum')
        cy.get('input').eq(1).clear().type('Rum')
        cy.contains('Old Fashioned')
      })
      it('individual recipe pages can be viewed', function () {
        cy.contains('Rum Old Fashioned').click()
        cy.contains('baking spice')
      })
      it('ingredients section can be viewed', function () {
        cy.get('button').contains('Recipe').click()
        cy.contains('stir')
      })
      it('about section can be viewed', function () {
        cy.get('button').contains('About').click()
        cy.contains('favorite')
      })
      it('similarTo section can be viewed', function () {
        cy.get('button').contains('Similar to').click()
        cy.get('html').should('not.contain', 'favorite')
        cy.get('html').should('not.contain', 'stir')
      })
      it('back to recipes link navigates back to list of recipes', function () {
        cy.contains('Back to recipes').click()
        cy.get('html').should('not.contain', 'favorite')
        cy.get('html').should('not.contain', 'stir')
      })
    })
  })

  describe('when logged in (ADMIN)', function () {
    beforeEach('login', function () {
      cy.login({ username: 'torbot', password: 'password' })
    })
    it('a new reicpe can be created', function () {
      cy.visit('http://localhost:3000/admin')
      cy.contains('Create New Recipe')
      cy.get('#nameInput').type('Test Recipe')
      cy.get('#descriptionInput').type('Test description')
      cy.get('#ingNamesInput').type('test ingredient')
      cy.get('#ingMeasuresInput').type('test oz')
      cy.get('#addIngredientButton').click()
      cy.get('#addedIngredientsDisplay').contains('test')
      cy.get('#instructionsInput').type('test instructions')
      cy.get('#menuDescriptionInput').type('test menu description')
      cy.get('#aboutInput').type('test about')
      cy.get('#menuItemInput').type('false')
      cy.get('#submitButton').click()
      cy.visit('http://localhost:3000/recipes')
      cy.contains('Test Recipe')
    })
    it('create recipe fails with missing data', function () {
      cy.visit('http://localhost:3000/admin')
      cy.contains('Create New Recipe')
      cy.get('#nameInput').type('Test Recipe 1')
      cy.get('#ingNamesInput').type('test ingredient')
      cy.get('#ingMeasuresInput').type('test oz')
      cy.get('#addIngredientButton').click()
      cy.get('#addedIngredientsDisplay').contains('test')
      cy.get('#instructionsInput').type('test instructions')
      cy.get('#menuDescriptionInput').type('test menu description')
      cy.get('#aboutInput').type('test about')
      cy.get('#menuItemInput').type('false')
      cy.get('#submitButton').click()
      cy.contains('Error')
      cy.visit('http://localhost:3000/recipes')
      cy.get('html').should('not.contain', 'Test Recipe 1')
    })

    it('a recipe can be deleted', function () {
      cy.visit('http://localhost:3000/admin')
      cy.contains('Rum Old Fashioned')
      cy.get('#select-input').select(1).trigger('click')
      cy.get('#select-input option:selected').should('have.text', 'Test Recipe')
      cy.get('#select-input')
      cy.get('#delete-button').click()
      cy.visit('http://localhost:3000/recipes')
      cy.get('html').should('not.contain', 'Test Recipe')
    })
  })

  describe('admin login', function () {
    it('an admin can log in', function () {
      cy.visit('http://localhost:3000/login')
      cy.get('#username-input').type('torbot')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('Create New Recipe')
    })
    it('fails with wrong username', function () {
      cy.visit('http://localhost:3000/login')
      cy.get('#username-input').type('torbot2')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials!')
    })
    it('fails with wrong password', function () {
      cy.visit('http://localhost:3000/login')
      cy.get('#username-input').type('torbot')
      cy.get('#password-input').type('password2')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials!')
    })
  })
})
