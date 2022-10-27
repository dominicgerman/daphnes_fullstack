import NewRecipe from './NewRecipe'
import DeleteRecipe from './DeleteRecipe'
import Notification from './Notification'

import { BodyContainer } from './styles/StyledContainers.styled'
import { StyledSubHeading, Title } from './styles/StyledText.styled'
import { SubmitButton } from './styles/StyledButtons.styled'
import AddPhoto from './AddPhoto'

const Admin = ({
  setUser,
  createRecipe,
  file,
  setFile,
  inputRef,
  recipes,
  deleteRecipe,
  message,
  setMessage,
  addPhoto,
}) => {
  return (
    <BodyContainer>
      <Notification message={message} />
      <Title>Admin Actions</Title>
      <div>
        <SubmitButton
          onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }}
        >
          Logout
        </SubmitButton>
      </div>
      <StyledSubHeading>Create New Recipe</StyledSubHeading>
      <NewRecipe
        createRecipe={createRecipe}
        recipes={recipes}
        setMessage={setMessage}
      />
      <StyledSubHeading>Add Photo to Library</StyledSubHeading>
      <AddPhoto
        file={file}
        setFile={setFile}
        inputRef={inputRef}
        addPhoto={addPhoto}
      />
      <StyledSubHeading>Delete Recipe</StyledSubHeading>
      <DeleteRecipe
        deleteRecipe={deleteRecipe}
        recipes={recipes}
        setMessage={setMessage}
      />
    </BodyContainer>
  )
}

export default Admin
