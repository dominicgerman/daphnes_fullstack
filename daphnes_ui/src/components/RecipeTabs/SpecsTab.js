import { StyledSpecsContainer } from '../styles/StyledContainers.styled'
import {
  StyledAmounts,
  StyledIngredients,
  StyledInstructions,
} from '../styles/StyledText.styled'

const SpecsTab = ({ recipe }) => {
  return (
    <StyledSpecsContainer>
      <StyledAmounts>
        {recipe?.ingredients.map((ing) => (
          <li key={ing._id}>{ing.measure || ''}</li>
        ))}
      </StyledAmounts>
      <StyledIngredients>
        {recipe?.ingredients.map((ing) => (
          <li key={ing._id}>{ing.name}</li>
        ))}
      </StyledIngredients>
      <StyledInstructions>{recipe?.instructions}</StyledInstructions>
    </StyledSpecsContainer>
  )
}
export default SpecsTab
