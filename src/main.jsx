import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/estrategia-atlantico">
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
