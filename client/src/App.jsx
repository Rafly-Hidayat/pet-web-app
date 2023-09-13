import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/route";
function App() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      console.log("Scroll");
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-auto no-scrollbar">
      <div
        className={`w-full h-20 shadow-sm flex justify-between items-center px-10 inset-0  absolute top-0 ${
          scrolling ? "backdrop-blur-md bg-white/30" : "bg-white"
        }`}
      >
        <div className="text-xl font-semibold">Vetlynic</div>
        {!auth ? (
          <div className="flex items-center space-x-2">
            <a href="#1">Layanan Kami</a>
            <div className="w-2 h-2 rounded-full bg-[#f3f3]"></div>
            <a href="#2">Tentang Kami</a>
            <div> | </div>
            <a href="#3">Daftar</a>
          </div>
        ) : (
          <div>login</div>
        )}
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
