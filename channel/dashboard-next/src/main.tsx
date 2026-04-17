import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { connectEventStream } from "@/hooks/useEventStream";
import { initSessionsStore } from "@/stores/sessions";

connectEventStream();
initSessionsStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
