import React from "react";
import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Colaborador from "../pages/colaboradores";
import Dashboard from "../pages/dashboard/Main";
import Login from "../pages/login";
import { Routes, Route } from "react-router-dom";
// import Route from "./Route";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "/colaboradores",
          element: <Colaborador />,
        },
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;

// const Router = () => (
//   <Routes>
//     <Route path="/" element={<Login />} />
//     <Route path="/painel" element={<Dashboard />} />
//     <Route path="/colaboradores" element={<Colaborador />} />
//   </Routes>
// );

// export default Router;
