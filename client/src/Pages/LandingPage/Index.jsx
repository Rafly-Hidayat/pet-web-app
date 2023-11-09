import landingPage1 from "../../Assets/Image/LandingPage.png";
import logo from "../../Assets/Image/LOGO_BULUBULU.png";
import { BsWhatsapp, BsTiktok } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#fdc074] w-screen h-screen relative overflow-x-hidden">
      <div className="w-full h-20 flex items-center px-5 sm:px-10 inset-0 absolute top-1">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="" className="w-12 lg:w-14" />
          <div className="text-xl sm:text-2xl font-semibold">
            Bulu-bulu Animal Clinic
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full md:justify-between pt-16">
        <img
          src={landingPage1}
          alt="landing page"
          className="w-[80%] lg:hidden"
        />
        <div
          id="1"
          className="lg:w-[50%] h-full flex flex-col items-center md:items-start md:pl-10 justify-center gap-2"
        >
          <div
            className="text-5xl md:text-7xl text-center md:text-start capitalize text-[#598665]"
            style={{ fontFamily: "Lobster" }}
          >
            menjaga hewan peliharaan anda tetap sehat
          </div>
          <div className="pl-2 text-center md:text-start text-2xl italic text-slate-700">
            Solusi Keluhan Hewan Peliharan Anda
          </div>
          <div className="pl-2">
            <div
              className="border border-[#598665] p-3 rounded-full cursor-pointer text-[#598665] hover:bg-[#598665] hover:text-white"
              onClick={() => navigate("/login")}
            >
              Daftar Sekarang &gt;&gt;
            </div>
          </div>
        </div>
        <img
          src={landingPage1}
          alt="landing page"
          className="w-[650px] hidden lg:flex"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 w-full p-5 px-5 absolute bottom-0">
        <div className="gap-1 flex items-center text-center">
          <BsWhatsapp className="text-xl" />
          <div className="text-sm">0813 99818479</div>
        </div>
        <div className="gap-1 flex items-center text-center">
          <BsTiktok className="text-xl" />
          <div className="text-sm">bulubluanimalclinic</div>
        </div>
        <div className="gap-1 flex items-center text-center">
          <FaMapMarkedAlt className="max-sm:text-3xl text-xl" />
          <div className="text-sm">
            Jln Fatmawati Raya no. 55A Cipete selatan, Cilandak, Indonesia 12410
          </div>
        </div>
      </div>
    </div>
  );
}
