import { StyledInputContainer } from './styles/StyledContainers.styled'
import { SubmitButton } from './styles/StyledButtons.styled'
import { useState } from 'react'

const DeleteRecipe = ({ deleteRecipe, recipes }) => {
  const [recipeToDelete, setRecipeToDelete] = useState('')

  // let selectedItemId

  const handleFormSubmit = (event) => {
    event.preventDefault()
    window.confirm(`Confirm deletion of recipe?`)
    deleteRecipe(recipeToDelete)
  }

  // const handleChange = (event) => {
  //   console.log('handleChange --- event fired')
  //   selectedItemId = event.target.value
  //   const selectedRecipe = recipes.filter((r) => r.id === selectedItemId)[0]
  //   setRecipeToDelete(selectedRecipe)
  //   console.log(recipeToDelete)
  // }

  console.log(recipeToDelete)

  return (
    <div style={{ marginBottom: '6rem' }}>
      <form onSubmit={handleFormSubmit}>
        <StyledInputContainer>
          Select Recipe to Delete:
          <select
            value={recipeToDelete}
            onChange={({ target }) => setRecipeToDelete(target.value)}
            id="select-input"
          >
            {recipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <SubmitButton onClick={handleFormSubmit} id="delete-button">
            Delete
          </SubmitButton>
        </StyledInputContainer>
      </form>
    </div>
  )
}

export default DeleteRecipe
