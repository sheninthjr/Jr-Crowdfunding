import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <Router>
        <App />
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
