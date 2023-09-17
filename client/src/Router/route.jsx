import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/Index";
import Auth from "../Pages/Auth/Index";
import Navbar from "../Components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <LandingPage />
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
