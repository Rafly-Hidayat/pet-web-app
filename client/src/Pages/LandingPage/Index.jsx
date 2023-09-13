import landingPage1 from "../../Assets/Image/landingPage1.png";
import quickAndEasy from "../../Assets/Image/quickAndEasy.png";
import qualityService from "../../Assets/Image/qualityService.png";
import fromHome from "../../Assets/Image/fromHome.png";
import technology from "../../Assets/Image/technology.png";

export default function Index() {
  return (
    <div className="scroll-smooth overflow-scroll no-scrollbar w-full h-full">
      <div className="snap-y snap-mandatory w-full h-full">
        <div
          id="1"
          className="bg-[#f3f8fc] mt-10 w-full h-full grid grid-cols-2 gap-4 snap-center content-center"
        >
          <div className="pl-10 flex flex-col justify-center h-full space-y-2">
            <div
              className="text-7xl capitalize text-[#92a5a5]"
              style={{ fontFamily: "Lobster" }}
            >
              menjaga hewan peliharaan anda tetap sehat
            </div>
            <div className="pl-2 text-2xl italic text-slate-700">
              Solusi Keluhan Hewan Peliharan Anda
            </div>
          </div>
          <div
            className="h-[450px] rounded-l-full bg-cover bg-center"
            style={{ backgroundImage: `url(${landingPage1})` }}
          />
        </div>
        <div
          id="2"
          className="bg-[#f3f8fc] w-full h-full snap-center flex flex-col px-10"
        >
          <div
            className="w-full text-center my-5 text-5xl text-[#92a5a5]"
            style={{ fontFamily: "Lobster" }}
          >
            Misi Utama Kami
          </div>
          <div className="flex items-start space-x-1 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <div className="flex flex-col min-w-[40%] space-y-4 items-center justify-center snap-start">
              <img
                src={quickAndEasy}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg">Mudah dan Cepat</div>
              <div className="max-w-[80%] text-justify">
                Menyediakan akses mudah dan cepat ke perawatan kesehatan hewan
                peliharaan yang berkualitas, di mana pun dan kapan pun. Kami
                bertekad untuk meningkatkan kesejahteraan hewan peliharaan
                dengan memberikan akses ke dokter hewan terpercaya dan
                berpengalaman
              </div>
            </div>
            <div className="flex flex-col min-w-[40%] space-y-4 items-center justify-center snap-start">
              <img
                src={qualityService}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg">Pelayanan Berkualitas</div>
              <div className="max-w-[80%] text-justify">
                Kami berkomitmen untuk menyediakan pelayanan konsultasi dokter
                hewan yang berkualitas tinggi. Dokter hewan kami adalah para
                profesional berlisensi yang peduli dengan kesehatan hewan
                peliharaan Anda
              </div>
            </div>
            <div className="flex flex-col min-w-[40%] space-y-4 items-center justify-center snap-start">
              <img
                src={fromHome}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg">Kenyamanan Pemilik Hewan Peliharaan</div>
              <div className="max-w-[80%] text-justify">
                Kami berusaha untuk membuat pengalaman konsultasi secepat dan
                sesederhana mungkin. Dengan platform kami, Anda dapat
                menghubungi dokter hewan dari kenyamanan rumah Anda sendiri,
                mengurangi stres bagi hewan peliharaan Anda
              </div>
            </div>
            <div className="flex flex-col min-w-[40%] space-y-4 items-center justify-center snap-start">
              <img
                src={technology}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg">
                Inovasi dalam Layanan Kesehatan Hewan
              </div>
              <div className="max-w-[80%] text-justify">
                Kami selalu mencari cara untuk meningkatkan layanan kami melalui
                inovasi teknologi dan metode perawatan terbaru. Misi kami adalah
                tetap menjadi pemimpin dalam industri kesehatan hewan
              </div>
            </div>
          </div>
        </div>
        <div
          id="3"
          className="bg-[#f3f8fc] w-full h-full grid grid-cols-2 gap-4 snap-center content-center"
        >
          <div className="text-5xl pl-10 flex items-center h-full">
            Solusi Keluhan Hewan Peliharan Anda 3
          </div>
          <div
            className="h-[400px] rounded-l-full bg-cover bg-center"
            style={{ backgroundImage: `url(${landingPage1})` }}
          />
        </div>
        <div className="w-full h-10 flex items-center justify-center bg-[#ffffff]">
          @ Petwebapp 2023
        </div>
      </div>
    </div>
  );
}
