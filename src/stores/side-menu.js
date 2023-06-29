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
      // {
      //   icon: "Box",
      //   pathname: "/leadsboard",
      //   title: "Leads Board",
      // },
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
            pathname: "/bndes",
            title: "BNDES Leads",
          },
          {
            icon: "",
            pathname: "/bndes-pf",
            title: "BNDES PF",
          },
          {
            icon: "",
            pathname: "/bndes-mei",
            title: "BNDES MEI",
          },
          {
            icon: "",
            pathname: "/bndes-old",
            title: "BNDES Leads 2.0",
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
