import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/authProvider";

const observer = globalThis.ResizeObserver;
globalThis.ResizeObserver = class ResizeObserver extends observer {
  constructor(callback: ResizeObserverCallback) {
    super((entries, obs) => {
      globalThis.requestAnimationFrame(() => callback(entries, obs));
    });
  }
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
