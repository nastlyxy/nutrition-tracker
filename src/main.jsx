import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FoodProvider } from "./context/FoodContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <FoodProvider>
          <App />
        </FoodProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
