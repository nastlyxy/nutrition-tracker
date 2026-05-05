import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FoodProvider } from "./context/FoodContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <FoodProvider>
        <App />
      </FoodProvider>
    </UserProvider>
  </StrictMode>,
);
