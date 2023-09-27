import React, { Component } from 'react';
// import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './Home';
import About from './Practice';


function App() {
  return (
    <>
      <h1>My App</h1>
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <About />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "/Home",
    //     element: <Home />,
    //   }
    // ],
  },
]);

export default App;
