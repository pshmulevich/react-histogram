import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./app";
// Anchor point for the App.js file
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
