import { StyledSimilarToContainer } from '../styles/StyledContainers.styled'
import { StyledRecipeLink } from '../styles/StyledLinks.styled'
import { ThumbnailImg } from '../styles/StyledImages.styled'
import { StyledThumbnailText } from '../styles/StyledText.styled'

const SimilarToTab = ({ recipe, recipes }) => {
  const similarRecipes = recipe.similarTo.map((recipeID) => {
    return recipes.find((r) => r.id === recipeID)
  })
  return (
    <StyledSimilarToContainer>
      {similarRecipes?.map((r) => (
        <StyledRecipeLink key={r.id} to={`/recipes/${r.id}`}>
          <ThumbnailImg src={`/imgs/${r.imageCover}`} alt="cocktail" />
          <StyledThumbnailText>{r.name}</StyledThumbnailText>
        </StyledRecipeLink>
      ))}
    </StyledSimilarToContainer>
  )
}
export default SimilarToTab
