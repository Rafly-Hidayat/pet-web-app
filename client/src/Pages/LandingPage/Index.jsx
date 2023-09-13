import landingPageImage1 from "../../Assets/Image/landingPage1.jpg";

export default function Index() {
  return (
    <div className="mt-20 snap-y snap-mandatory scroll-smooth w-screen h-screen overflow-scroll no-scrollbar">
      <section
        id="1"
        className="bg-red-400 w-full h-full grid grid-cols-2 gap-4 snap-center content-center"
      >
        <div className="text-5xl pl-10 flex items-center h-full">
          Solusi Keluhan Hewan Peliharan Anda 1
        </div>
        <div
          className="h-[400px] rounded-l-full bg-cover bg-center"
          style={{ backgroundImage: `url(${landingPageImage1})` }}
        />
      </section>
      <section
        id="2"
        className="bg-sky-400 w-full h-full grid grid-cols-2 gap-4 snap-center content-center"
      >
        <div className="text-5xl pl-10 flex items-center h-full">
          Solusi Keluhan Hewan Peliharan Anda 2
        </div>
        <div
          className="h-[400px] rounded-l-full bg-cover bg-center"
          style={{ backgroundImage: `url(${landingPageImage1})` }}
        />
      </section>
      <section
        id="3"
        className="bg-emerald-400 w-full h-full grid grid-cols-2 gap-4 snap-center content-center"
      >
        <div className="text-5xl pl-10 flex items-center h-full">
          Solusi Keluhan Hewan Peliharan Anda 3
        </div>
        <div
          className="h-[400px] rounded-l-full bg-cover bg-center"
          style={{ backgroundImage: `url(${landingPageImage1})` }}
        />
      </section>
    </div>
  );
}
