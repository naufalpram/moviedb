

const Home = React.lazy(() => import('../pages/Home'));
const List = React.lazy(() => import('../pages/List'));
const Detail = React.lazy(() => import('../pages/Detail'));
const Discover = React.lazy(() => import('../pages/Discover'));

const GenerateTitle = (name) => (`${name} | ${import.meta.env.VITE_NAME}`);

const privateRoutes = [
    { exact: true, path: '/', name: GenerateTitle('Home'), component: Home },
    { exact: true, path: '/:mediaType', name: GenerateTitle('List'), component: List },
    { exact: true, path: '/:mediaType/:idName', name: GenerateTitle('Detail'), component: Detail },
    { exact: true, path: '/discover', name: GenerateTitle('Discover'), component: Discover }
];

const routes = { private: privateRoutes };

export default routes;