import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/Index";
import Auth from "../Pages/Auth/Index";
import Navbar from "../Components/Navbar";

// user
import Main from "../Pages/User/MainPage/Main.jsx";
import Search from "../Pages/User/SearchPage/Search.jsx";
import Chat from "../Pages/User/ChatPage/Chat.jsx";

// vet
import Vet from "../Pages/Vet/MainPage/Main.jsx";

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
      },
      {
        path: "/chat",
        element: <Chat />
      },
      {
        path: "/vet",
        element: <Vet />
      }
    ]
  },
  {
    path: "/welcome",
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
