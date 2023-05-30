import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from "./Components/NotFound/NotFound";
import Brands from "./Components/Brands/Brands";
import ProdDetails from "./Components/ProdDetails/ProdDetails";

export default function App() {
  // Routing

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "brands", element: <Brands /> },
        { path: "prodDetails/:id", element: <ProdDetails /> },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "", element: <Home /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
