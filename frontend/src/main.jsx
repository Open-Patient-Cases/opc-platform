import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SubdomainProvider } from "./context/SubdomainProvider";

// ROUTES
import Root from "./routes/Root";

// CO
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </SubdomainProvider>
  </React.StrictMode>
);
