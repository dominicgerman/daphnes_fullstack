import Modal from './Modal'
import { MenuButton } from './styles/StyledButtons.styled'
import { HomeContainer } from './styles/StyledContainers.styled'
import { StyledHomeText } from './styles/StyledText.styled'

const Home = ({ show, toggleShow, menuItems }) => {
  return (
    <HomeContainer>
      <StyledHomeText>
        New menu every Friday at noon.{' '}
        <MenuButton onClick={toggleShow}>Today's menu</MenuButton>
        {show ? <Modal menuItems={menuItems} toggleShow={toggleShow} /> : null}
      </StyledHomeText>
      <img alt="cocktail" src="/imgs/vieux-carre.jpg" />
      <img alt="cocktail" src="/imgs/juliette.jpg" />
      <img alt="cocktail" src="/imgs/fifth-of-never.jpg" />
    </HomeContainer>
  )
}

export default Home
