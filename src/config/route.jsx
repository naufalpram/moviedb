import React from 'react';

const Login = React.lazy(() => import('../pages/Auth/Login'));
const Register = React.lazy(() => import('../pages/Auth/Register'));
const Home = React.lazy(() => import('../pages/Home'));
const List = React.lazy(() => import('../pages/List'));
const Detail = React.lazy(() => import('../pages/Detail'));
const Discover = React.lazy(() => import('../pages/Discover'));

const GenerateTitle = (name) => (`${name} | ${import.meta.env.VITE_NAME}`);

const publicRoutes = [
    { exact: true, path: '/login', name: GenerateTitle('Login'), component: Login },
    { exact: true, path: '/register', name: GenerateTitle('Register'), component: Register },
]

const privateRoutes = [
    { exact: true, path: '/', name: GenerateTitle('Home'), component: Home },
    { exact: true, path: '/:mediaType', name: GenerateTitle('List'), component: List },
    { exact: true, path: '/:mediaType/:idName', name: GenerateTitle('Detail'), component: Detail },
    { exact: true, path: '/discover', name: GenerateTitle('Discover'), component: Discover }
];

const routes = { public: publicRoutes, private: privateRoutes };

export default routes;