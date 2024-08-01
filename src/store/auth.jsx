import { createContext, useState, useEffect, useCallback } from 'react'
import { getFromLocalStorage, getIsLogin, removeFromLocalStorage, saveToLocalStorage } from '../helper/localStorageHelper';
import Services from '../service';
import { useNavigate } from 'react-router-dom';
const { VITE_API_KEY: API_KEY, VITE_WEB_URL: AUTH_URL, VITE_AUTH_REDIRECT: APPROVED_URL } = import.meta.env;

const AuthContext = createContext({
    isLoggedIn: false,
    session: {},
    user: {},
    login: () => {},
    authenticate: () => {},
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
        username: null
    });

    useEffect(() => {
      setIsLoggedIn(!!getIsLogin());
      setSession(JSON.parse(getFromLocalStorage('session')) || {
        sessiondId: null,
        type: null,
        expiresAt: null
      });
      setUser(JSON.parse(getFromLocalStorage('user')) || {
        username: null
      });
    }, [])

    const authenticate = useCallback(({ username, password }) => {
        saveToLocalStorage("temp", JSON.stringify({username, password}));
        Services.get("/authentication/token/new", {
            headers: {
                accept: "application/json"
            },
            params: {
                api_key: API_KEY
            }
        }).then(({ data: newToken }) => {
            window.location.href = `${AUTH_URL}/authenticate/${newToken.request_token}?redirect_to=${APPROVED_URL}`;
        }).catch((e) => {
            console.log('error at getting token');
            alert(e);
        })
    }, []);

    const login = useCallback((requestToken) => {
        const temp = JSON.parse(getFromLocalStorage('temp'));
        const callAction = () => {
            Services.get(`/authentication/session/new`, {
                headers: {
                    accept: "application/json",
                },
                params: {
                    api_key: API_KEY,
                    request_token: requestToken
                }
            }).then(({ data }) => {
                const session = {
                    sessionId: data?.session_id,
                    type: "user",
                    expiresAt: data?.expires_at
                };
                saveToLocalStorage("isLoggedIn", data?.success);
                saveToLocalStorage("session", JSON.stringify(session));
                
                setIsLoggedIn(data?.success);
                setSession(session);
                
                Services.get('/account', {
                    params: {
                        api_key: API_KEY,
                        session_id: data?.session_id
                    }
                }).then(({ data: accountInfo }) => {
                    const user = { username: temp.username, id: accountInfo?.id };
                    saveToLocalStorage("user", JSON.stringify(user));
                    setUser(user);
                    removeFromLocalStorage("temp");
                    navigate('/');
                })
            }).catch((e) => {
                console.log(e);
            })
        }
        if (!session?.sessionId) {
            callAction();
        }
        
    }, [navigate, session]);
    
    const loginAsGuest = ({ username }) => {
        Services.get("/authentication/guest_session/new", {
            headers: {
              accept: "application/json",
            },
            params: {
              api_key: API_KEY
            }
        }).then(({ data }) => {
            const session = {
                sessionId: data?.guest_session_id,
                type: "guest",
                expiresAt: data?.expires_at
            }
            const user = { username }
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
        if (session.type === 'user') {
            Services.delete("/authentication/session", {
                data: {
                    session_id: session.sessionId
                },
                headers: {
                    accept: "application/json",
                  },
                params: {
                    api_key: API_KEY
                }
            }).then(() => {
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
            })
        }
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
            isLoggedIn, session, user, setUser, login, authenticate, loginAsGuest, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };