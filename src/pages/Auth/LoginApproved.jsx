import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RedirectingMeme = () => (
    <>
    <div className='w-full h-0 pb-[75%] relative'><iframe src="https://giphy.com/embed/ddZ2mYhxhh69wEpSVz" width="100%" height="100%" frameBorder="0" className="giphy-embed absolute" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/DerekTee-url-binary-redirecting-ddZ2mYhxhh69wEpSVz">via GIPHY</a></p>
    </>
)

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
    <main className="w-[100vw] h-screen -mb-72 flex">
       <section className="w-full h-1/2 flex justify-center">
          <div className='flex flex-col gap-8'>
            <RedirectingMeme />
            <h2 className='font-medium text-2xl'>We are logging you in, please wait until you get redirected to home page</h2>
          </div>
       </section>
    </main>
  )
}

export default LoginApproved