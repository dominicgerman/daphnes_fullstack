import { StyledFooter } from './styles/StyledContainers.styled'
import { FooterButton } from './styles/StyledButtons.styled'
import { useLocation } from 'react-router-dom'

const Footer = ({ handler }) => {
  const location = useLocation()
  return location.pathname === '/login' ||
    location.pathname === '/admin' ? null : (
    <StyledFooter>
      <FooterButton onClick={handler}> 🎲 &nbsp; Dealer's Choice</FooterButton>
    </StyledFooter>
  )
}

export default Footer
