import { forwardRef, useRef } from "react";
import { Button, ButtonContainer } from "../../components";
import logo from "../../assets/blue_short-moviedb.svg";
import { useAuth } from "../../hooks/useAuth";

const AuthInput = forwardRef(({ title, type, name, ...props }, ref) => {
  return (
    <>
      <label htmlFor={name} className="font-medium">{title}</label>
      <input ref={ref} type={type} name={name} {...props} className="h-8 p-5 rounded border" />
    </>
  )
})

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const guestCheckRef = useRef();
  const { loginAsGuest } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const isGuest = guestCheckRef.current.checked;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!(email && email.trim() !== '' && password && password.trim() !== '')) 
      alert('Email and password must not be empty');

    if (!(email.match("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"))) 
      alert('Email pattern is not valid');
    
    if (password.length < 8) alert('Password must have at least 8 characters');

    if (isGuest) loginAsGuest({ email: email, password: password });
  }

  return (
    <main className="w-[100vw] flex">
      <section className="h-full w-1/2 bg-gradient-to-r from-primary-400 to-base flex place-content-center">
        <img src={logo} alt="Movie DB Logo" className="w-[280px] h-auto" />
      </section>
       <section className="w-1/2 flex justify-center items-center">
          <div className="w-2/3 border-gray-500 border rounded-md p-8">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <div className="flex flex-col gap-4 mt-6">
              <AuthInput ref={emailRef} title="Email" type="email" name="email" placeholder="Type your email" required pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" />
              <AuthInput ref={passwordRef} title="Password" type="password" name="password" placeholder="Type your password" required minLength={8} />
            </div>
            <ButtonContainer container="div" display="mt-8 flex justify-between">
              <div className="flex gap-2 items-center">
                <label htmlFor="as_guest">Login as Guest</label>
                <input ref={guestCheckRef} type="checkbox" name="as_guest" id="as_guest" />
              </div>
              <Button type="submit" variant="primary" onClick={handleSubmit}>Login</Button>
            </ButtonContainer>
          </div>
       </section>
    </main>
  )
}

export default Login