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
        ],
      },

      {
        icon: "Box",
        pathname: "/bnds",
        title: "BNDS",
        subMenu: [
          {
            icon: "",
            pathname: "/bndsLeads",
            title: "BNDS Leads",
          },
          {
            icon: "",
            pathname: "/BNDS",
            title: "BNDS",
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
