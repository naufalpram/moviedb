import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import List from './pages/List';
import Home from './pages/Home';
import Detail from './pages/Detail'
import { AuthProvider } from './store/auth';
import { SearchProvider } from './store/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ':mediaType',
        element: <List />
      },
      {
        path: ':mediaType/:idName',
        element: <Detail />
      }
    ]
  }
])

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </AuthProvider>
  )
}

export default App
