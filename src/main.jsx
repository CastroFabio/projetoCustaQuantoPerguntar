import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ou './main.css' dependendo do nome usado

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
