import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./pages/Root.jsx";
import ErrorPage from "./pages/error-page";
import Practice from "./pages/Practice.jsx"

const router = createBrowserRouter([
  {
    path: "/phonetic-learning/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/phonetic-learning/practice",
    element: <Practice />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/phonetic-learning/learn",
    element: <Practice />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
