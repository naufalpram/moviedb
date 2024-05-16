const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}

const saveJSONToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const getIsLogin = () => {
    return localStorage.getItem('user');
}

const setLoginState = (username) => {
    localStorage.setItem('user', JSON.stringify({username: username}));
}

const removeLoginState = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    localStorage.removeItem('cart');
}

export { getFromLocalStorage, saveJSONToLocalStorage, removeFromLocalStorage, saveToLocalStorage, getIsLogin, setLoginState, removeLoginState };