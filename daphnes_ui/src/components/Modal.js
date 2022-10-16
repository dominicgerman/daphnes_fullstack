import {
  StyledOverlay,
  StyledModal,
  MenuContent,
  MenuList,
} from './styles/StyledContainers.styled'
import { CloseMenuButton, MenuButton } from './styles/StyledButtons.styled'
import { MenuItemLink } from './styles/StyledLinks.styled'
import {
  MenuItemDescription,
  StyledModalTitle,
} from './styles/StyledText.styled'

const Modal = ({ menuItems, toggleShow }) => {
  return (
    <div>
      <StyledModal>
        <MenuButton />
        <MenuContent>
          <CloseMenuButton onClick={toggleShow}>Close</CloseMenuButton>
          <StyledModalTitle>Today's Menu</StyledModalTitle>
          <MenuList>
            {menuItems?.map((r) => (
              <li key={r.id}>
                <MenuItemLink onClick={toggleShow} to={`/recipes/${r.id}`}>
                  {r.name}
                </MenuItemLink>
                <MenuItemDescription>{r.menuDescription}</MenuItemDescription>
              </li>
            ))}
          </MenuList>
        </MenuContent>
      </StyledModal>
      <StyledOverlay onClick={toggleShow} />
    </div>
  )
}

export default Modal
