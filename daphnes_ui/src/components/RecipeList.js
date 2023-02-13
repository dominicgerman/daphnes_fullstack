import Filter from './Filter'
import {
  BodyContainer,
  RecipeListContainer,
  SearchBar,
} from './styles/StyledContainers.styled'
import { Title, StyledThumbnailText } from './styles/StyledText.styled'
import { StyledRecipeLink } from './styles/StyledLinks.styled'
import { ThumbnailImg } from './styles/StyledImages.styled'

const RecipeList = ({ filteredRecipes, handler, filter }) => {
  const sorted = filteredRecipes?.sort((a, b) => {
    const nameA = a.name.toUpperCase() // ignore upper and lowercase
    const nameB = b.name.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })

  return (
    // <PageContainer>
    <BodyContainer>
      <Title>Recipes</Title>
      <SearchBar>
        <Filter filter={filter} handler={handler} />
      </SearchBar>
      <RecipeListContainer>
        {sorted.map((recipe) => (
          // <div key={recipe.id}>
          <StyledRecipeLink key={recipe.id} to={`/recipes/${recipe.id}`}>
            <ThumbnailImg src={`/imgs/${recipe.imageCover}`} alt="cocktail" />
            <StyledThumbnailText>{recipe.name}</StyledThumbnailText>
          </StyledRecipeLink>
          // </div>
        ))}
      </RecipeListContainer>
    </BodyContainer>
    // </PageContainer>
  )
}

export default RecipeList
