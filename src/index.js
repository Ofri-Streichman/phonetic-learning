//   // "Studypage": "http://ofri-streichman.github.io/phonetic-learning",

import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Root from "./pages/Root";
import Study from "./pages/Study";
import Practice from "./pages/Practice";
import Test from "./pages/Test";
import HomePage from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/study",
        element: <Study />,
      },
      {
        path: "/practice",
        element: <Practice />,
      },
      {
        path: "/test",
        // loader: testLoader
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);