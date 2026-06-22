import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { LanguageProvider } from "./lib/i18n.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LanguageProvider>
  </React.StrictMode>
);
