import Notification from './Notification'

import { StyledInput } from './styles/StyledInputs.styled'
import {
  BodyContainer,
  StyledInputContainer,
} from './styles/StyledContainers.styled'
import { SubmitButton } from './styles/StyledButtons.styled'
import { Title } from './styles/StyledText.styled'

const Login = ({
  setPassword,
  setUsername,
  password,
  username,
  handleLogin,
  message,
}) => {
  return (
    <BodyContainer>
      <Title>Administrator Login</Title>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <StyledInputContainer>
          Username
          <StyledInput
            type="text"
            id="username-input"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          Password
          <StyledInput
            type="password"
            id="password-input"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </StyledInputContainer>
        <SubmitButton type="submit" id="login-button">
          login
        </SubmitButton>
      </form>
    </BodyContainer>
  )
}

export default Login
