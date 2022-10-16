import RecipeTabs from './RecipeTabs/RecipeTabs'
import { useParams } from 'react-router-dom'
import { NavigateBack } from './styles/StyledLinks.styled'
import {
  BodyContainer,
  ContentContainer,
  RecipeTextContainer,
} from './styles/StyledContainers.styled'
import { Title, StyledDescription } from './styles/StyledText.styled'
import { FullSizeImg } from './styles/StyledImages.styled'

const Recipe = ({ recipes, handleTagClick }) => {
  const { id } = useParams()
  const recipe = recipes.find((r) => r.id === id)

  return (
    <BodyContainer>
      <NavigateBack to={`/recipes`}>
        <span>Back to recipes</span>
      </NavigateBack>
      <Title>{recipe?.name}</Title>
      <StyledDescription>{recipe?.description}</StyledDescription>
      <ContentContainer>
        <RecipeTextContainer>
          <RecipeTabs
            recipes={recipes}
            recipe={recipe}
            handleTagClick={handleTagClick}
          />
        </RecipeTextContainer>
        <FullSizeImg src={`/imgs/${recipe?.imageCover}`} alt="cocktail" />
      </ContentContainer>
    </BodyContainer>
  )
}

export default Recipe
