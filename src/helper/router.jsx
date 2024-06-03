import { Navigate } from 'react-router-dom';
import { getIsLogin } from './localStorageHelper';

export const PublicRoute = ({ children }) => {
    if (getIsLogin()) {
        return <Navigate to={{ pathname: '/' }} />;
    }

    return children;
};

export const PrivateRoute = ({ children }) => {
    if (getIsLogin()) {
        return <Navigate to={{ pathname: '/login' }} />;
    }

    return children;
};
