import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import List from './pages/List';
import Home from './pages/Home';
import { AuthProvider } from './store/auth';

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
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
