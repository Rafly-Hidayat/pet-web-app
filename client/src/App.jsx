import { RouterProvider } from "react-router-dom";
import { router } from "./Router/route";

function App() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
