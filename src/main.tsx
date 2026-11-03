import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles.css";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root")!;
const application = <React.StrictMode><App /></React.StrictMode>;
if (rootElement.dataset.prerendered === "true") {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}
