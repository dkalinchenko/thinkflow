import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Features",
    path: "/#features",
    newTab: false,
  },
  {
    id: 3,
    title: "Compare Products",
    path: "/#use-cases",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Laptops",
        path: "/compare/laptops",
        newTab: false,
      },
      {
        id: 32,
        title: "Smartphones",
        path: "/compare/smartphones",
        newTab: false,
      },
      {
        id: 33,
        title: "Headphones",
        path: "/compare/headphones",
        newTab: false,
      },
      {
        id: 34,
        title: "Cameras",
        path: "/compare/cameras",
        newTab: false,
      },
      {
        id: 35,
        title: "Smartwatches",
        path: "/compare/smartwatches",
        newTab: false,
      },
      {
        id: 36,
        title: "Vacuum Cleaners",
        path: "/compare/vacuum-cleaners",
        newTab: false,
      },
      {
        id: 37,
        title: "Air Purifiers",
        path: "/compare/air-purifiers",
        newTab: false,
      },
      {
        id: 38,
        title: "Coffee Makers",
        path: "/compare/coffee-makers",
        newTab: false,
      },
      {
        id: 39,
        title: "Treadmills",
        path: "/compare/treadmills",
        newTab: false,
      },
      {
        id: 40,
        title: "Exercise Bikes",
        path: "/compare/exercise-bikes",
        newTab: false,
      },
    ],
  },
];
export default menuData;
