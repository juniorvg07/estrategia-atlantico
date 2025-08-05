import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthContext";
import { PersonalProvider } from "./utils/PersonalContext";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/estrategia-atlantico">
      <AuthProvider>
        <PersonalProvider>
          <App></App>
        </PersonalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
