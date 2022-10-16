import { StyledAboutContainer } from '../styles/StyledContainers.styled'
import { StyledParagraph } from '../styles/StyledText.styled'
// import { TabButton } from '../styles/StyledButtons.styled'
import { Link } from 'react-router-dom'

const AboutTab = ({ recipe, handleTagClick }) => {
  return (
    <StyledAboutContainer>
      <StyledParagraph>{recipe?.about}</StyledParagraph>
      <ul>
        {recipe?.tags.map((t, i) => (
          <li key={t} style={{ display: 'inline' }}>
            <Link to="/recipes" onClick={() => handleTagClick(t)}>
              {t}
            </Link>
            {i < recipe?.tags.length - 1 ? ', ' : ''}
          </li>
        ))}
      </ul>
    </StyledAboutContainer>
  )
}
export default AboutTab
