import { Navigate, Route, Routes } from "react-router-dom";
import {lazy, Suspense} from "react";
import AdvertsPage from "./pages/adverts/adverts-page";
import RequireAuth from "./pages/auth/require-auth";
import AdvertPage from "./pages/adverts/advert-page";
import Layout from './components/layout/layout';
import NotFoundPage from "./pages/not-found";

const LoginPage = lazy(() => import("./pages/auth/login-page"));

const NewAdvertPage = lazy(() => import("./pages/adverts/new-advert-page"))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading login page...</div>}>
            <LoginPage />
          </Suspense>
        }
        />
        <Route 
        path="/adverts" 
        element={
          <RequireAuth>
            <AdvertsPage />
          </RequireAuth>
        }
        />
        <Route 
        path="/adverts/:id" 
        element={
          <RequireAuth>
            <AdvertPage />
          </RequireAuth>
        } />
        <Route
        path="/adverts/new"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading New Advert page...</div>}>
              <NewAdvertPage />
            </Suspense>
          </RequireAuth>
        }
        />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/not-found" element={<NotFoundPage />} /> 
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Route>
    </Routes>
  )
}

export default App;