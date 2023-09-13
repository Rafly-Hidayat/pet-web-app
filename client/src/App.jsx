import { RouterProvider } from "react-router-dom";
import { router } from "./Router/route";
import Navbar from "./Components/Navbar.jsx"

function App() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  return (
    <div className="h-screen w-screen overflow-auto no-scrollbar">
      <Navbar auth={auth} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
