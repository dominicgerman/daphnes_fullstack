import { useState } from 'react'
import { SubmitButton } from './styles/StyledButtons.styled'
import { StyledInputContainer } from './styles/StyledContainers.styled'
import { StyledInput } from './styles/StyledInputs.styled'

const NewRecipe = ({ createRecipe, recipes }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [menuDescription, setMenuDescription] = useState('')
  const [similarTo, setSimilarTo] = useState([])
  const [tags, setTags] = useState([])
  const [about, setAbout] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState('')
  const [menuItem, setMenuItem] = useState('')

  let ingredientObject = { name: '' }

  let similarToItem

  let tagItem

  const addIngredient = (event) => {
    event.preventDefault()
    setIngredients(ingredients.concat(ingredientObject))
  }

  const handleSelectChange = (event) => {
    similarToItem = event.target.value
  }

  const handleAddSimilarToItem = (event) => {
    event.preventDefault()
    setSimilarTo(similarTo.concat(similarToItem))
  }

  const handleAddTagItem = (event) => {
    event.preventDefault()
    setTags(tags.concat(tagItem.trim()))
  }

  const addRecipe = (event) => {
    event.preventDefault()
    window.confirm(`Confirm submission?`)

    const recipe = {
      name,
      description,
      menuDescription,
      similarTo,
      tags,
      about,
      ingredients,
      instructions,
      menuItem,
      imageCover: `${name.toLowerCase().trim().replaceAll(' ', '-')}.jpg`,
    }

    createRecipe(recipe)

    setName('')
    setDescription('')
    setIngredients([])
    setMenuDescription('')
    setSimilarTo([])
    setTags([])
    setAbout('')
    setInstructions('')
    setMenuItem('')
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <form onSubmit={addRecipe}>
        <StyledInputContainer>
          Name:
          <StyledInput
            type="text"
            id="nameInput"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          Description:
          <StyledInput
            type="text"
            id="descriptionInput"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </StyledInputContainer>
        <div>
          <StyledInputContainer>
            Ingredient Name:
            <StyledInput
              type="text"
              id="ingNamesInput"
              onChange={({ target }) => (ingredientObject.name = target.value)}
              style={{ width: '20rem' }}
            />
            Ingredient Measure:
            <StyledInput
              type="text"
              id="ingMeasuresInput"
              onChange={({ target }) =>
                (ingredientObject.measure = target.value)
              }
              style={{ width: '8rem' }}
            />
            <SubmitButton id="addIngredientButton" onClick={addIngredient}>
              Add Ingredient
            </SubmitButton>
          </StyledInputContainer>
        </div>
        <div
          style={{
            fontSize: '1.8rem',
            paddingLeft: '3rem',
            marginBottom: '1rem',
          }}
        >
          {' '}
          Added ingredients:
          <div id="addedIngredientsDisplay">
            {ingredients.length > 0 ? (
              ingredients.map((obj) => (
                <p key={obj.name} style={{ padding: '0.2rem' }}>
                  <span>{obj.measure} &nbsp;</span>
                  <span>{obj.name}</span>
                </p>
              ))
            ) : (
              <p style={{ margin: '2rem' }}>
                No ingredients added. Use the form below to add some!
              </p>
            )}
          </div>
        </div>
        <StyledInputContainer>
          Instructions:
          <textarea
            type="text"
            style={{ width: '50rem', font: 'inherit', fontSize: '1.6rem' }}
            id="instructionsInput"
            value={instructions}
            onChange={({ target }) => setInstructions(target.value)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          Menu Description:
          <StyledInput
            type="text"
            id="menuDescriptionInput"
            value={menuDescription}
            onChange={({ target }) => setMenuDescription(target.value)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          Similar To:
          <select value={similarToItem} onChange={handleSelectChange}>
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <SubmitButton onClick={handleAddSimilarToItem}>Add ID</SubmitButton>
        </StyledInputContainer>
        <div
          style={{
            fontSize: '1.8rem',
            paddingLeft: '3rem',
            marginBottom: '1rem',
          }}
        >
          Added IDs:{' '}
          {similarTo.length > 0 ? (
            similarTo.map((id) => (
              <p key={id} style={{ fontSize: '1.8rem' }}>
                {id}
              </p>
            ))
          ) : (
            <p style={{ margin: '2rem' }}>
              No 'Similar To' items added. Use the form below to add some!
            </p>
          )}
        </div>
        <StyledInputContainer>
          Tags:
          <StyledInput
            type="text"
            id="tagsInput"
            onChange={({ target }) => (tagItem = target.value)}
            placeholder="Individual tags will appear below"
          />
          <SubmitButton onClick={handleAddTagItem}>Add tag</SubmitButton>
        </StyledInputContainer>
        <div
          style={{
            fontSize: '1.8rem',
            padding: '1rem',
            marginBottom: '1rem',
            paddingLeft: '3rem',
          }}
        >
          Added tags:{' '}
          {tags.length > 0 ? (
            tags.map((tag) => (
              <p key={tag} style={{ fontSize: '1.8rem' }}>
                {tag}
              </p>
            ))
          ) : (
            <p style={{ margin: '2rem' }}>
              No tags added. Use the form below to add some!
            </p>
          )}
        </div>
        <StyledInputContainer>
          About:
          <textarea
            type="text"
            id="aboutInput"
            value={about}
            style={{ width: '50rem', font: 'inherit', fontSize: '1.6rem' }}
            onChange={({ target }) => setAbout(target.value)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          Menu Item:
          <StyledInput
            type="text"
            id="menuItemInput"
            value={menuItem}
            onChange={({ target }) => setMenuItem(target.value)}
          />
        </StyledInputContainer>
        <SubmitButton type="submit" id="submitButton">
          Submit new recipe
        </SubmitButton>
      </form>
    </div>
  )
}

export default NewRecipe
