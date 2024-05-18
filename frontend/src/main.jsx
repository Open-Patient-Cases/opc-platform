import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SubdomainProvider } from "./context/SubdomainProvider";

// ROUTES
import Root from "./routes/Root";

// Firebase
import './firebaseConfig';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <SubdomainProvider>
      <RouterProvider router={router} />
    </SubdomainProvider>
  </React.StrictMode>
);
