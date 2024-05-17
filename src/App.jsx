import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import List from './pages/List';
import Home from './pages/Home';
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
