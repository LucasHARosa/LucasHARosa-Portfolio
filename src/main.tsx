import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";
import { App } from "./App.tsx";

const rootElement = document.getElementById("root") as HTMLElement;

const tree = (
  <React.StrictMode>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme="dark"
    />
  </React.StrictMode>
);

// Verifica se estamos no modo de pré-renderização
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, tree);
} else {
  ReactDOM.createRoot(rootElement).render(tree);
}
