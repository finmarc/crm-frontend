import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/admin",
        title: "Dashboard",
      },
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
});

export { sideMenu };
