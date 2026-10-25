import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { App } from "./App.tsx";
import { Toasts } from "./components/Toasts";

const rootElement = document.getElementById("root") as HTMLElement;

const tree = (
  <React.StrictMode>
    <App />
    <Toasts />
  </React.StrictMode>
);

// Verifica se estamos no modo de pré-renderização
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, tree);
} else {
  ReactDOM.createRoot(rootElement).render(tree);
}
