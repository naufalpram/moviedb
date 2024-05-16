import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import List from './pages/List';
import Home from './pages/Home';

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
        path: 'list',
        element: <List />
      }
    ]
  }
])

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
