import { RouteObject } from "react-router-dom";

import { CITY_PAGE_ROUTE, HOME_PAGE_ROUTE } from "./lib/constants/routes";
import CityPage from "./pages/city-page";
import HomePage from "./pages/home-page";

export const publicRoutes: RouteObject[] = [
  {
    path: HOME_PAGE_ROUTE,
    element: <HomePage />,
  },
  {
    path: CITY_PAGE_ROUTE,
    element: <CityPage />,
  },
];
