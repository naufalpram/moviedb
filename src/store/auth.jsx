import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { getFromLocalStorage } from '../helper/localStorageHelper';

const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: {},
    setUser: () => {},
    login: () => {},
    logout: () => {}
})

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getFromLocalStorage('token') !== null);
    const [user, setUser] = useState(JSON.parse(getFromLocalStorage('user')) || {});

    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(token ? true : false);
      setUser(JSON.parse(getFromLocalStorage('user')) || {});
    }, [])
    
    const login = (data) => {
        axios.post('https://fakestoreapi.com/auth/login', data)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({username : data.username}));
    
            setIsLoggedIn(true)
            setUser({ username: data.username });
        })
        .catch(err => {
            alert("Username or Password is incorrect");
        })
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser({});
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, setIsLoggedIn, user, setUser, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };