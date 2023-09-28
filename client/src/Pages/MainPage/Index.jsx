import { useState } from "react";
import chatVet from "../../Assets/Image/chatVet.png";
import scheduleVet from "../../Assets/Image/scheduleVet.png";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";

export default function Index() {
    const [isJanji, setIsJanji] = useState(false)

  return (
    <div className="scroll-smooth overflow-scroll w-full h-full mt-24 bg-[#f8f9fb] flex flex-col space-y-5">
      <div className="flex flex-col space-y-5 bg-white pb-10">
        <div className="h-40 p-2 mx-4 bg-[#eef4fe] border-2 border-[#9ab9ce] flex items-center rounded-lg shadow-md">
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

        <div className="h-40 p-2 mx-4 bg-[#edf3ee] border-2 border-[#c8e1ce] flex items-center rounded-lg shadow-md">
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

      <div className="bg-white p-4 space-y-10 transition-all">
        <div className="text-slate-700 capitalize flex items-center justify-between" onClick={() => setIsJanji(!isJanji)}>
          Janji Temu yang akan datang
          <RiArrowDropDownLine className="text-2xl" />
        </div>
        <div className={`${!isJanji && 'hidden'}`}>Anda belum memiliki janji temu</div>
      </div>
    </div>
  );
}
