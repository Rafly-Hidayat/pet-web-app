import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/Index";
import Auth from "../Pages/Auth/Index";
import Main from "../Pages/MainPage/Main.jsx";
import Search from "../Pages/SearchPage/Search.jsx";
import Navbar from "../Components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/search",
        element: <Search />
      }
    ]
  },
  {
    path: "/main",
    element: <LandingPage />
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
