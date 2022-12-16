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
        pathname: "/cadastro",
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
        ],
      },

      {
        icon: "Box",
        title: "BNDES",
        subMenu: [
          {
            icon: "",
            pathname: "/bndesLeads",
            title: "BNDES Leads",
          },
          {
            icon: "",
            pathname: "/BNDES",
            title: "BNDES",
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
