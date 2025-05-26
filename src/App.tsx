import { Navigate, Route, Routes } from "react-router-dom";
import {lazy, Suspense} from "react";
import AdvertsPage from "./pages/adverts/adverts-page";
import RequireAuth from "./pages/auth/require-auth";

const LoginPage = lazy(() => import("./pages/auth/login-page"));

const NewAdvertPage = lazy(() => import("./pages/adverts/new-advert-page"))

function App() {
  return (
    <Routes>
      <Route
      path="/login"
      element={
        <Suspense fallback={<div>Loading login page...</div>}>
          <LoginPage />
        </Suspense>
      }
      />
      <Route path="/adverts" element={<AdvertsPage />}></Route>
      <Route path="/adverts/:id" element={<AdvertsPage />}></Route>
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
      <Route path="/not-found" element={<div>404 | Not Found</div>} /> 
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}

export default App;