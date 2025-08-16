import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
//import AuthProvider from "./pages/auth/auth-provider.tsx";
import { Provider } from "react-redux";
import configureStore from "./store/index.ts";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";

const accessToken = storage.get("auth")
if (accessToken) {
  setAuthorizationHeader(accessToken)
}

const store = configureStore({ auth: !!accessToken });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
