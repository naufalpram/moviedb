import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const LoginApproved = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestToken = searchParams.get('request_token')
  const approved = searchParams.get('approved');
  const { login, session } = useAuth()

  useEffect(() => {
    if (!approved) navigate('/login');
    if (!session?.sessionId) {
        login(requestToken);
    }
  });

  return (
    <div>Redirecting...</div>
  )
}

export default LoginApproved