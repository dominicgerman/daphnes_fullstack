import { StyledNotificationMessage } from './styles/StyledText.styled'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('Error')) {
    return <StyledNotificationMessage>{message}</StyledNotificationMessage>
  }
  return <StyledNotificationMessage>{message}</StyledNotificationMessage>
}

export default Notification
