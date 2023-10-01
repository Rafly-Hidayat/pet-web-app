import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../Assets/Image/logo.png";
import {
  RiMenuLine,
  RiHome4Line,
  RiCustomerService2Line,
  RiAccountCircleLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useState } from "react";

export default function Navbar() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  const [isDropdown, setIsDropdown] = useState(false);

  const menus = [
    { label: "Halaman Utama", icon: <RiHome4Line /> },
    { label: "Konsultasi", icon: <RiCustomerService2Line /> },
    { label: "Profil", icon: <RiAccountCircleLine /> },
    { label: "Keluar", icon: <RiLogoutBoxLine /> },
  ];

  // const navigate = useNavigate();

  // Function to scroll to the section with the given ID
  // const scrollToSection = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return !auth ? (
    <Navigate to="/index" replace />
  ) : (
    <div className="h-screen w-screen overflow-auto">
      <div className="w-full h-20 shadow-sm flex justify-between items-center px-5 sm:px-10 inset-0  absolute top-0 backdrop-blur-md bg-white/30">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="" className="w-7 sm:w-10 aspect-square" />
          <div className="text-xl sm:text-2xl font-semibold">Petwebcare</div>
        </div>

        {/* menu dropdown */}
        <div className="">
          <div className="dropdown inline-block relative">
            <RiMenuLine
              className="cursor-pointer"
              onClick={() => setIsDropdown(!isDropdown)}
            />
            <ul
              className={`rounded absolute right-0 transition-all text-gray-700 pt-1 ${
                !isDropdown && "hidden"
              }`}
            >
              {menus.map((menu, idx) => (
                <li
                  className="flex space-x-2 items-center py-2 px-3 bg-gray-100 hover:bg-gray-200"
                  key={idx}
                >
                  <span className="text-lg">{menu.icon}</span>
                  <div className="cursor-pointer w-full text-sm block whitespace-no-wrap">
                    {menu.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
