import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoutes = ({ user }) => {
  const navigate = useNavigate()

  return user ? <Outlet /> : navigate('/login')
}

export default PrivateRoutes
