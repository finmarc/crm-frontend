import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Dashboard",
      },
      {
        icon: "Box",
        title: "Cadastro",
        subMenu: [
          {
            icon: "User",
            pathname: "/colaboradores",
            title: "Colaboradores",
          },
          {
            icon: "Users",
            pathname: "/clientes",
            title: "Clientes",
          },
          {
            icon: "Briefcase",
            pathname: "/parceiros",
            title: "Parceiros",
          },
          {
            icon: "",
            pathname: "/produtos",
            title: "Produtos",
          },
          {
            icon: "",
            pathname: "/tipo-documentos",
            title: "Tipos de Documento",
          },
        ],
      },

      {
        icon: "Box",
        title: "BNDES",
        subMenu: [
          {
            icon: "",
            pathname: "/bndsLeads",
            title: "BNDES Leads",
          },
          {
            icon: "",
            pathname: "/propostas",
            title: "Propostas",
          },
        ],
      },

      {
        icon: "Box",
        pathname: "/operacional",
        title: "Operacional",
        subMenu: [
          {
            icon: "Archive",
            pathname: "/orcamentos",
            title: "Orçamentos",
          },
          {
            icon: "Layers",
            pathname: "/contratos",
            title: "Contratos",
          },
        ],
      },
    ],
  },
});

export { sideMenu };
