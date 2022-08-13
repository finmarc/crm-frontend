import { Switch } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import Colaborador from "../pages/colaboradores";
import ColaboradorEdit from "../pages/colaboradores/edit";
import { Form } from "../pages/colaboradores/Form";
import ColaboradorDetails from "../pages/colaboradores/show";
import Dashboard from "../pages/dashboard/Main";
import Login from "../pages/login";
import Route from "./Route";

const Router = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
''
      <SideMenu>
        <Route path="/" exact isPrivate component={Dashboard} />
        <Route path="/admin" isPrivate component={Dashboard} />
        <Route path="/colaboradores" isPrivate component={Colaborador} />
        <Route path="/colaborador/new" isPrivate component={Form} />
        <Route path="/colaborador/show/:id" isPrivate component={ColaboradorDetails} />
        <Route path="/colaborador/edit/:id" isPrivate component={ColaboradorEdit} />
      </SideMenu>
    </Switch>
  </>
);

export default Router;


