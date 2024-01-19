import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

// Base Styling
import "./styles/index.css";
import "./styles/variables.css";

// Color Palette and Shades
import "./styles/colors/primary.css";
import "./styles/colors/secondary.css";
import "./styles/colors/tertiary.css";
import "./styles/colors/background.css";
import "./styles/colors/mono.css";
import "./styles/colors/system.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
