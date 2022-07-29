import { Switch } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Colaborador from "../pages/colaboradores";
import Dashboard from "../pages/dashboard/Main";
import Login from "../pages/login";
import Route from "./Route";

const Router = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      <SideMenu>
        <Route path="/admin" isPrivate component={Dashboard} />
        <Route path="/colaboradores" isPrivate component={Colaborador} />
      </SideMenu>
    </Switch>
  </>
);

export default Router;


