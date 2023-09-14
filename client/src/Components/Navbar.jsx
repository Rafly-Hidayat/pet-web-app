import logo from "../Assets/Image/logo.png";
export default function Navbar({ auth }) {
  // Function to scroll to the section with the given ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-20 shadow-sm flex justify-between items-center px-5 sm:px-10 inset-0  absolute top-0 backdrop-blur-md bg-white/30">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="" className="w-7 sm:w-10 aspect-square" />
        <div className="text-xl sm:text-2xl font-semibold">Petwebcare</div>
      </div>
      {!auth ? (
        <div className="hidden items-center space-x-2 sm:flex">
          <div
            className="cursor-pointer"
            onClick={() => scrollToSection("misi")}
          >
            Misi Kami
          </div>
          <div className="w-2 h-2 rounded-full bg-[#f3ab7b]"></div>
          <div
            className="cursor-pointer"
            onClick={() => scrollToSection("layanan")}
          >
            Layanan Kami
          </div>
          <div> | </div>
          <div className="cursor-pointer" onClick={() => scrollToSection("3")}>
            Daftar
          </div>
        </div>
      ) : (
        <div>login</div>
      )}
    </div>
  );
}
