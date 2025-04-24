import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import "./i18n";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={4000} />
    </AuthProvider>
  </StrictMode>
);
