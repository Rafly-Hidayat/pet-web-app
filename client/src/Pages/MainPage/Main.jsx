import chatVet from "../../Assets/Image/chatVet.png";
import scheduleVet from "../../Assets/Image/scheduleVet.png";
import { RiArrowDropRightLine } from "react-icons/ri";
import { GiDogBowl } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="scroll-smooth overflow-scroll flex-1 bg-[#f8f9fb] mt-24 flex flex-col space-y-5">
      <div className="flex flex-col space-y-5 bg-white pb-10">
        <div className="h-40 p-2 mx-4 bg-[#eef4fe] border-2 border-[#9ab9ce] flex items-center rounded-lg shadow-md cursor-pointer" onClick={() => navigate('/search', { state: {pageName: "Kunjungan Langsung"} })}>
          <div className="w-[70%] flex flex-col space-y-5 text-slate-700">
            <div>
              Jadwalkan kedatangan ke klinik{" "}
              <span className="font-semibold">tanpa antri</span>
            </div>
            <div className="text-sm underline flex items-center">
              Jadwalkan <RiArrowDropRightLine className="text-xl" />{" "}
            </div>
          </div>
          <img src={scheduleVet} className="w-28 -mb-3" alt="schedule vet" />
        </div>

        <div className="h-40 p-2 mx-4 bg-[#edf3ee] border-2 border-[#c8e1ce] flex items-center rounded-lg shadow-md cursor-pointer" onClick={() => navigate('/search', { state: {pageName: "Telekonsultasi"} })}>
          <div className="w-[70%] flex flex-col space-y-7 text-slate-700">
            <div>
              Mulai konsultasi <span className="font-semibold">online</span>{" "}
              sekarang
            </div>
            <div className="text-sm underline flex items-center">
              Mulai <RiArrowDropRightLine className="text-xl" />
            </div>
          </div>
          <img src={chatVet} className="w-28" alt="chat vet" />
        </div>
      </div>

      <div className="space-y-2 pb-4">
        <div className="bg-white text-slate-700 p-4 capitalize flex items-center justify-between">
          Janji Temu yang akan datang
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex flex-col items-center">
            <GiDogBowl className="text-6xl" />
            <div className="text-slate-700">Anda belum memiliki janji temu</div>
          </div>
          <div className="p-4 border border-[#FF834F] text-[#FF834F] rounded cursor-pointer" onClick={() => navigate('/search', { state: {pageName: "Kunjungan Langsung"} })}>Buat janji temu sekarang</div>
        </div>
      </div>
    </div>
  );
}
