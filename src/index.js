import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/error-page.jsx";
import Root from "./pages/Root.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "/Home",
    //     element: <Home />,
    //   },
    //   {
    //     path: "/Add",
    //     element: <Add />,
    //   },
    //   {
    //     path: "/WeekList",
    //     element: <WeekList />,
    //   },
    //   {
    //     path: "/weeks/:weekId/:englishWord",
    //     element: <Card />,
    //     loader: cardLoader,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
