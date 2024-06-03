import { createContext, useState, useEffect } from 'react'
import { getFromLocalStorage, getIsLogin, removeFromLocalStorage, saveToLocalStorage } from '../helper/localStorageHelper';
import Services from '../service';
import { useNavigate } from 'react-router-dom';
const { VITE_API_KEY: API_KEY } = import.meta.env;

const AuthContext = createContext({
    isLoggedIn: false,
    session: {},
    user: {},
    loginAsGuest: () => {},
    logout: () => {}
})

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!getIsLogin());
    const [session, setSession] = useState(JSON.parse(getFromLocalStorage('session')) || {
        sessiondId: null,
        type: null,
        expiresAt: null
    });
    const [user, setUser] = useState(JSON.parse(getFromLocalStorage('user')) || {
        email: null,
        password: null
    });

    useEffect(() => {
      setIsLoggedIn(!!getIsLogin());
      setSession(JSON.parse(getFromLocalStorage('session')) || {
        sessiondId: null,
        type: null,
        expiresAt: null
      });
      setUser(JSON.parse(getFromLocalStorage('user')) || {
        email: null,
        password: null
      });
    }, [])
    
    const loginAsGuest = ({ email, password }) => {
        Services.get("/authentication/guest_session/new", {
            headers: {
              accept: "application/json",
            },
            params: {
              api_key: API_KEY
            }
        }).then(({ data }) => {
            const session = {
                sessionId: data?.session_id,
                type: "guest",
                expiresAt: data?.expires_at
            }
            const user = {
                email: email,
                password: password
            }
            saveToLocalStorage("isLoggedIn", data?.success);
            saveToLocalStorage("session", JSON.stringify(session));
            saveToLocalStorage("user", JSON.stringify(user));
            
            setIsLoggedIn(data?.success);
            setSession(session);
            setUser(user);
            navigate('/');
        }).catch((e) => {
            alert(e);
        })
    }

    const logout = () => {
        removeFromLocalStorage("isLoggedIn");
        removeFromLocalStorage("session");
        removeFromLocalStorage("user");
        setIsLoggedIn(false);
        setSession({
            sessiondId: null,
            type: null,
            expiresAt: null
        });
        setUser({
            email: null,
            password: null,
        });
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, session, user, setUser, loginAsGuest, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };