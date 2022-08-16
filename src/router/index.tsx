import { Switch } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import ClientDetails from "../pages/clientes/show";
import Colaborador from "../pages/colaboradores";
import ColaboradorEdit from "../pages/colaboradores/edit";
import ColaboradorDetails from "../pages/colaboradores/show";
import Cliente from "../pages/clientes";
import ClientEdit from "../pages/clientes/edit";
import Dashboard from "../pages/dashboard/Main";
import Login from "../pages/login";
import Parceiro from "../pages/parceiros";
import PartnerEdit from "../pages/parceiros/edit";
import PartnersDetails from "../pages/parceiros/show";
import Route from "./Route";
import { Form } from "../pages/colaboradores/Form";
import { Form as ParceiroForm } from "../pages/parceiros/Form";
import { Form as ClienteForm } from "../pages/clientes/Form"



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
        <Route path="/clientes" isPrivate component={Cliente} />
        <Route path="/cliente/new"isPrivate component={ClienteForm} />
        <Route path="/cliente/show/:id" isPrivate component={ClientDetails} />
        <Route path="/cliente/edit/:id" isPrivate component={ClientEdit} />
        <Route path="/parceiros" isPrivate component={Parceiro} />
        <Route path="/parceiro/new" isPrivate component={ParceiroForm} />
        <Route path="/parceiro/show/:id" isPrivate component={PartnersDetails} />
        <Route path="/parceiro/edit/:id" isPrivate component={PartnerEdit} />
      </SideMenu>
    </Switch>
  </>
);

export default Router;


