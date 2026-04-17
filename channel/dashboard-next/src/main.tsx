import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { connectEventStream } from "@/hooks/useEventStream";
import { initSessionsStore } from "@/stores/sessions";
import { initPlatformInfo } from "@/lib/system-status";

connectEventStream();
initSessionsStore();
initPlatformInfo();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
