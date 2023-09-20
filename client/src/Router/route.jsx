import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/Index";
import Auth from "../Pages/Auth/Index";
import Test from "../Pages/test";
import Navbar from "../Components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/tes",
        element: <Test />
      }
    ]
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "*",
    element: <div>Not Found2</div>,
  },
]);
