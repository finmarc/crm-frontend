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
import TipoDocumento from "../pages/tipo-documento";
import TipoDocumentoEdit from "../pages/tipo-documento/edit";
import PartnerEdit from "../pages/parceiros/edit";
import PartnersDetails from "../pages/parceiros/show";
import Route from "./Route";
import { Form } from "../pages/colaboradores/Form";
import { Form as ParceiroForm } from "../pages/parceiros/Form";
import { Form as TipoDocumentoForm } from "../pages/tipo-documento/Form";
import { Form as ClienteForm } from "../pages/clientes/Form";
import { CreateBudget } from "../pages/budgets/create";
import { Budget } from "../pages/budgets";
import EditBudget from "../pages/budgets/edit";
import { ProductIndex } from "../pages/products";
import { CreateProduct } from "../pages/products/create";
import ProdutoEdit from "../pages/products/edit";
import { BndsLeads } from "../pages/BNDESLeads";
import BndesLeadsDetails from '../pages/BNDESLeads/show'
import {Leadsboard} from '../pages/leadsboard'
import { BndsLeadsOld } from '../pages/BNDESLeads/index-old'
import BndesLeadsDetailsOld from '../pages/BNDESLeads/show-old'
import BndesLeadsDetailsPF from '../pages/BNDESLeadsPF/show'
import { BndsLeadsPF } from '../pages/BNDESLeadsPF'
import { BndsLeadsMei } from '../pages/BNDESLeadsMei'
import BndesLeadsDetailsMei from '../pages/BNDESLeadsMei/show'

const Router = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      ''
      <SideMenu>
        <Route path="/" exact isPrivate component={Dashboard} />
        <Route path="/admin" isPrivate component={Dashboard} />
        <Route path="/colaboradores" isPrivate component={Colaborador} />
        <Route path="/colaborador" exact isPrivate component={Form} />
        <Route
          path="/colaborador/:id/visualizar"
          exact
          isPrivate
          component={ColaboradorDetails}
        />
        <Route
          path="/colaborador/:id"
          exact
          isPrivate
          component={ColaboradorEdit}
        />
        <Route path="/clientes" isPrivate component={Cliente} />
        <Route path="/cliente" exact isPrivate component={ClienteForm} />
        <Route
          path="/cliente/:id/visualizar"
          exact
          isPrivate
          component={ClientDetails}
        />
        <Route path="/cliente/:id" exact isPrivate component={ClientEdit} />
        <Route path="/parceiros" isPrivate component={Parceiro} />
        <Route path="/parceiro" exact isPrivate component={ParceiroForm} />
        <Route
          path="/parceiro/:id/visualizar"
          exact
          isPrivate
          component={PartnersDetails}
        />
        <Route path="/parceiro/:id" exact isPrivate component={PartnerEdit} />

        <Route path="/tipo-documentos" isPrivate component={TipoDocumento} />
        <Route
          path="/tipo-documento"
          exact
          isPrivate
          component={TipoDocumentoForm}
        />
        {/* <Route path="/tipo-documento/:id/visualizar" exact isPrivate component={PartnersDetails} /> */}
        <Route
          path="/tipo-documento/:id"
          exact
          isPrivate
          component={TipoDocumentoEdit}
        />

        <Route path="/produtos" exact isPrivate component={ProductIndex} />
        <Route path="/produto/:id" exact isPrivate component={ProdutoEdit} />
        <Route
          path="/produto/:id/visualizar"
          exact
          isPrivate
          component={ProdutoEdit}
        />
        <Route path="/produto" exact isPrivate component={CreateProduct} />

        <Route path="/orcamentos" exact isPrivate component={Budget} />
        <Route path="/orcamento/:id" exact isPrivate component={EditBudget} />
        <Route
          path="/orcamento/:id/visualizar"
          exact
          isPrivate
          component={EditBudget}
        />
        <Route path="/orcamento" exact isPrivate component={CreateBudget} />
        <Route path="/bndes" exact isPrivate component={BndsLeads} />
        <Route path="/bndes-old" exact isPrivate component={BndsLeadsOld} />
        <Route path="/bndes-pf" exact isPrivate component={BndsLeadsPF} />
        <Route path="/bndes-mei" exact isPrivate component={BndsLeadsMei} />
        <Route
          path="/leads/:id/visualizar"
          exact
          isPrivate
          component={BndesLeadsDetails}
        />
        <Route
          path="/leads-old/:id/visualizar"
          exact
          isPrivate
          component={BndesLeadsDetailsOld}
        />
        <Route
          path="/leads-pf/:id/visualizar"
          exact
          isPrivate
          component={BndesLeadsDetailsPF}
        />
        <Route
          path="/leads-mei/:id/visualizar"
          exact
          isPrivate
          component={BndesLeadsDetailsMei}
        />
        <Route path="/leadsboard" exact isPrivate component={Leadsboard} />
      </SideMenu>
    </Switch>
  </>
);

export default Router;
