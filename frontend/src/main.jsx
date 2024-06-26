import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SubdomainProvider } from "./context/SubdomainProvider";

// ROUTES
import Root from "./routes/Root";
import Cases from "./routes/Cases";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Case from "./routes/Case";
import Profile from "./routes/Profile";

import MainContent from "./components/MainContent";

// Firebase
import './firebaseConfig';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <MainContent /> },
      { path: "cases", element: <Cases /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "case/:id", element: <Case /> },
      { path: "profile", element: <Profile /> },
    ],
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
