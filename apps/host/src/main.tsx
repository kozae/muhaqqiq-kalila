import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { awsConfig } from "kalila-config";

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
