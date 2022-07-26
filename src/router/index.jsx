import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Colaborador from "../pages/colaboradores";
import Dashboard from "../pages/dashboard/Main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/colaboradores",
          element: <Colaborador />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
