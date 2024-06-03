import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import { AuthProvider } from './store/auth';
import { QueryProvider } from './store/query';
import { Suspense } from 'react';
import routes from './config/route';
import { PublicRoute } from './helper/router';

const LoadingPage = () => {
  return <div className='w-[100vw] h-[100vh] bg-base text-white font-semibold flex items-center justify-center'>Loading...</div>
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {routes.public.map((route, idx) => {
            const Component = route?.component;
            return <Route key={idx} {...route} element={
              <AuthProvider>
                <PublicRoute>
                  <Component title={route?.name} />
                </PublicRoute>
              </AuthProvider>
              } />
          })}
          {routes.private.map((route, idx) => {
            const Component = route?.component;
            return <Route key={idx} {...route} element={
              <AuthProvider>
                <QueryProvider>
                  <Layout>
                    <Component title={route?.name} />
                  </Layout>
                </QueryProvider>
              </AuthProvider>
              } />
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
