import landingPage1 from "../../Assets/Image/landingPage1.png";
import quickAndEasy from "../../Assets/Image/quickAndEasy.png";
import qualityService from "../../Assets/Image/qualityService.png";
import fromHome from "../../Assets/Image/fromHome.png";
import technology from "../../Assets/Image/technology.png";
import { Wave } from "../../Assets/svg/SVG";
import petStep from "../../Assets/svg/petStep.svg";

export default function Index() {
  return (
    <div className="scroll-smooth overflow-scroll w-full h-full">
      <div className="  w-full h-full">
        {/* Slogan */}
        <div className="bg-[#ffffff] w-full sm:grid grid-cols-2 gap-4  content-center pt-24 pb-4">
          <div
            id="1"
            className="flex flex-col items-center md:items-start md:pl-10 justify-center h-full space-y-2"
          >
            <div
              className="w-[80%] h-[250px] rounded-t-full bg-cover bg-center sm:hidden"
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
          </div>
          <div
            className="h-[450px] rounded-l-full bg-cover bg-center hidden sm:flex"
            style={{ backgroundImage: `url(${landingPage1})` }}
          />
        </div>

        {/* Misi */}
        <div
          id="misi"
          className="bg-[#F8F5F2] w-full h-full flex flex-col px-10"
        >
          <div
            className="w-full text-center my-5 text-4xl text-[#92a5a5]"
            style={{ fontFamily: "Lobster" }}
          >
            Misi Utama Kami
          </div>
          <div className="flex items-start space-x-4 lg:space-x-1 overflow-x-auto   no-scrollbar">
            <div
              id="1"
              className="flex flex-col min-w-[80%] lg:min-w-[40%] space-y-4 items-center justify-center "
            >
              <img
                src={quickAndEasy}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg text-slate-700 text-center">
                Mudah dan Cepat
              </div>
              <div className="md:max-w-[80%] text-slate-700 text-center lg:text-justify">
                Menyediakan akses mudah dan cepat ke perawatan kesehatan hewan
                peliharaan yang berkualitas, di mana pun dan kapan pun. Kami
                bertekad untuk meningkatkan kesejahteraan hewan peliharaan
                dengan memberikan akses ke dokter hewan terpercaya dan
                berpengalaman
              </div>
            </div>
            <div
              id="2"
              className="flex flex-col min-w-[80%] lg:min-w-[40%] space-y-4 items-center justify-center "
            >
              <img
                src={qualityService}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg text-slate-700 text-center">
                Pelayanan Berkualitas
              </div>
              <div className="md:max-w-[80%] text-slate-700 text-center lg:text-justify">
                Kami berkomitmen untuk menyediakan pelayanan konsultasi dokter
                hewan yang berkualitas tinggi. Dokter hewan kami adalah para
                profesional berlisensi yang peduli dengan kesehatan hewan
                peliharaan Anda
              </div>
            </div>
            <div
              id="3"
              className="flex flex-col min-w-[80%] lg:min-w-[40%] space-y-4 items-center justify-center "
            >
              <img
                src={fromHome}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg text-slate-700 text-center">
                Kenyamanan Pemilik Hewan Peliharaan
              </div>
              <div className="md:max-w-[80%] text-slate-700 text-center lg:text-justify">
                Kami berusaha untuk membuat pengalaman konsultasi secepat dan
                sesederhana mungkin. Dengan platform kami, Anda dapat
                menghubungi dokter hewan dari kenyamanan rumah Anda sendiri,
                mengurangi stres bagi hewan peliharaan Anda
              </div>
            </div>
            <div
              id="4"
              className="flex flex-col min-w-[80%] lg:min-w-[40%] space-y-4 items-center justify-center "
            >
              <img
                src={technology}
                alt="Mudah dan Cepat"
                className="w-80 aspect-square rounded-3xl border-slate-500 border-4"
              />
              <div className="text-lg text-slate-700 text-center">
                Inovasi dalam Layanan Kesehatan Hewan
              </div>
              <div className="md:max-w-[80%] text-center lg:text-justify">
                Kami selalu mencari cara untuk meningkatkan layanan kami melalui
                inovasi teknologi dan metode perawatan terbaru. Misi kami adalah
                tetap menjadi pemimpin dalam industri kesehatan hewan
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="w-full bg-[#ffffff] -mt-3">
          <Wave fill="#F8F5F2" />

          <div
            id="layanan"
            className="my-5 w-full md:w-[80%] md:h-[550px] bg-[#E8ECED] md:rounded-r-full md:flex flex-col justify-center items-center md:space-y-20"
          >
            <div
              className="py-5 md:py-0 md:w-[80%] text-center text-3xl text-[#92a5a5]"
              style={{ fontFamily: "Lobster" }}
            >
              Layanan Kami
            </div>

            <div className="px-10 flex items-center space-x-10">
              <div className="space-y-5">
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src={petStep}
                    alt="pet step"
                    className="hidden md:flex w-5 aspect-square"
                  />
                  <div className="text-slate-700 text-lg">
                    Realtime Chat dengan Dokter Hewan
                  </div>
                  <img
                    src={petStep}
                    alt="pet step"
                    className="hidden md:flex w-5 aspect-square"
                  />
                </div>
                <div className="text-slate-700">
                  Dapatkan Akses Langsung ke Perawatan Hewan Peliharaan Anda!
                  Dengan Realtime Chat, Anda dapat menghubungi dokter hewan
                  terpercaya kami kapan saja, di mana pun Anda berada. Tidak
                  perlu menunggu lagi untuk menjawab pertanyaan Anda atau
                  memberikan bantuan dalam situasi darurat. Kesehatan hewan
                  peliharaan Anda dalam genggaman Anda. Chat langsung dengan
                  dokter hewan sekarang!
                </div>
              </div>
              {/* <div className="space-y-5">
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src={petStep}
                    alt="pet step"
                    className="w-5 aspect-square"
                  />
                  <div className="text-slate-700 text-lg">
                    Jadwalkan Kunjungan Langsung
                  </div>
                  <img
                    src={petStep}
                    alt="pet step"
                    className="w-5 aspect-square"
                  />
                </div>
                <div className="text-slate-700">
                  Perawatan yang Personal dan Menyeluruh untuk Hewan Peliharaan
                  Anda! Jadwalkan Kunjungan Langsung dengan dokter hewan kami
                  untuk pemeriksaan yang lebih mendalam dan perawatan yang
                  disesuaikan. Kami hadir di tempat Anda, memberikan perawatan
                  yang diberikan dengan cinta dan perhatian. Jangan kompromi
                  dalam merawat hewan peliharaan Anda, jadwalkan kunjungan
                  sekarang untuk kesehatan yang optimal!
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full">
          <div className="text-center md:py-4 text-slate-700">
            @ Petwebcare 2023
          </div>
        </div>
      </div>
    </div>
  );
}
