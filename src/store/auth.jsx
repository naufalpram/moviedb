import { createContext, useState, useEffect } from 'react'
import { getFromLocalStorage, getIsLogin, removeFromLocalStorage, saveToLocalStorage } from '../helper/localStorageHelper';
import Services from '../service';
import { useNavigate } from 'react-router-dom';
const { VITE_API_KEY: API_KEY, VITE_WEB_URL: AUTH_URL } = import.meta.env;

const AuthContext = createContext({
    isLoggedIn: false,
    session: {},
    user: {},
    login: () => {},
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
        email: null,
        password: null
      });
    }, [])

    const login = ({ username, password }) => {
        Services.get("/authentication/token/new", {
            headers: {
                accept: "application/json"
            },
            params: {
                api_key: API_KEY
            }
        }).then(({ data: newToken }) => {
            Services.get(`${AUTH_URL}/authenticate/${newToken.request_token}/allow`)
            .then(() => {
                Services.post("/authentication/token/validate_with_login", {
                    data: {
                        username: username, 
                        password: password, 
                        request_token: newToken?.request_token
                    },
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                        'content-type': "application/json"
                    }
                }).then(({data: loginValidation}) => {
                    Services.post("/authentication/session/new", {
                        data: {
                            request_token: loginValidation?.request_token
                        },
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_KEY}`
                          }
                    }).then(({ data }) => {
                        const session = {
                            sessionId: data?.session_id,
                            type: "user",
                            expiresAt: data?.expires_at
                        };
                        const user = { username };
                        saveToLocalStorage("isLoggedIn", data?.success);
                        saveToLocalStorage("session", JSON.stringify(session));
                        saveToLocalStorage("user", JSON.stringify(user));
                        
                        setIsLoggedIn(data?.success);
                        setSession(session);
                        setUser(user);
                        navigate('/');
                    }).catch((e) => {
                        console.log('error at getting sessionId');
                        alert(e);
                    })
                }).catch((e) => {
                    console.log('error at validation with login');
                    alert(e);
                })
            }).catch((e) => {
                console.log('error at authenticating token');
                alert(e);
            })
        }).catch((e) => {
            console.log('error at getting token');
            alert(e);
        })
    }

    // const login = ({ username, password }) => {
    //     Services.get("/authentication/token/new", {
    //         headers: {
    //           accept: "application/json",
    //         },
    //         params: {
    //           api_key: API_KEY
    //         }
    //     }).then(({ data: tokenNew }) => {
    //         axios.get(`/authenticate/${tokenNew.request_token}/allow`)
    //         .then(() => {
    //             Services.post("/authentication/token/validate_with_login", {
    //                 data: {
    //                     username: username, 
    //                     password: password, 
    //                     request_token: tokenNew?.request_token
    //                 },
    //                 headers: {
    //                     accept: "application/json",
    //                     Authorization: `Bearer ${API_KEY}`,
    //                     'content-type': "application/json"
    //                 }
    //             })
    //             .then(({ data: loginValidation }) => {
    //                 console.log("2nd");
    //                 Services.post("/authentication/session/new", {
    //                     data: {
    //                         request_token: loginValidation?.request_token
    //                     },
    //                     headers: {
    //                         accept: "application/json",
    //                         Authorization: `Bearer ${API_KEY}`
    //                       }
    //                 }).then(({ data }) => {
    //                     console.log("3rd");
    //                     const session = {
    //                         sessionId: data?.session_id,
    //                         type: "user",
    //                         expiresAt: data?.expires_at
    //                     };
    //                     const user = { username };
    //                     saveToLocalStorage("isLoggedIn", data?.success);
    //                     saveToLocalStorage("session", JSON.stringify(session));
    //                     saveToLocalStorage("user", JSON.stringify(user));
                        
    //                     setIsLoggedIn(data?.success);
    //                     setSession(session);
    //                     setUser(user);
    //                     navigate('/');
    //                 }).catch((e) => {
    //                     alert(e);
    //                 })
    //     })
    //     }).catch((e) => {
    //         alert(e);
    //     })
    // }
    
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
            isLoggedIn, session, user, setUser, login, loginAsGuest, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };