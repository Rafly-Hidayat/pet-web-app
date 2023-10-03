import landingPage1 from "../../Assets/Image/LandingPage.png";
import logo from "../../Assets/Image/logo.png";
import { BsWhatsapp, BsTiktok } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
export default function Index() {
  return (
    <div className="bg-[#F6FFFD] w-screen h-screen relative overflow-x-hidden">
      <div className="w-full h-20 flex items-center px-5 sm:px-10 inset-0 absolute top-0">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="" className="w-7 sm:w-10 aspect-square" />
          <div className="text-xl sm:text-2xl font-semibold">Petwebcare</div>
        </div>
      </div>
      <section className="w-full h-full relative">
        <div className="flex items-center h-full w-full justify-between">
          <div
            id="1"
            className="md:w-[50%] h-full flex flex-col items-center md:items-start md:pl-10 justify-center space-y-2"
          >
            <div
              className="w-[80%] h-[250px] bg-cover bg-center sm:hidden"
              style={{ backgroundImage: `url(${landingPage1})` }}
            />
            <div
              className="text-5xl md:text-7xl text-center md:text-start capitalize text-[#92a5a5]"
              style={{ fontFamily: "Lobster" }}
            >
              menjaga hewan peliharaan anda tetap sehat
            </div>
            <div className="pl-2 text-center md:text-start text-2xl italic text-slate-700">
              Solusi Keluhan Hewan Peliharan Anda
            </div>
            <div className="pl-2">
              <div className="border border-[#FF834F] p-3 rounded-full cursor-pointer text-[#FF834F] hover:bg-[#FF834F] hover:text-white">
                Daftar Sekarang &gt;&gt;
              </div>
            </div>
          </div>
          <img
            src={landingPage1}
            alt="landing page"
            className="w-[650px] hidden md:flex"
          />
        </div>
        <div className="absolute bottom-10 left-10 flex items-center space-x-7">
          <div className="space-x-1 flex items-center">
            <BsWhatsapp className="text-xl" />
            <div>909090909090</div>
          </div>
          <div className="space-x-1 flex items-center">
            <BsTiktok className="text-xl" />
            <div>abcdefg</div>
          </div>
          <div className="space-x-1 flex items-center">
            <FaMapMarkedAlt className="text-xl" />
            <div>Jln 123</div>
          </div>
        </div>
      </section>
    </div>
  );
}
