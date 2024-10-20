import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";
import { StateContextProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider activeChain={11155111}>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </ThirdwebProvider>
);
