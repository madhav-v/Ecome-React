import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Routing from "./config/routing.config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
