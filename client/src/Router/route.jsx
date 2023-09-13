import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/LandingPage/Index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <div>Not Found2</div>,
  },
]);
