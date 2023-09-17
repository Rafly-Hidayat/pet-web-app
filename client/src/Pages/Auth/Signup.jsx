export default function Signup({ onLogin }) {
  return (
    <>
      <div className="text-slate-700">Buat Akun Sekarang</div>

      <form action="" className="w-full" onSubmit={() => {}}>
        <div className="space-y-3">
          <input
            type="text"
            className="w-full text-slate-700 rounded-md border border-gray-400 bg-transparent p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F]"
            placeholder="Nama Lengkap"
          />
          <input
            type="text"
            className="w-full text-slate-700 rounded-md border border-gray-400 bg-transparent p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F]"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-full text-slate-700 rounded-md border border-gray-400 bg-transparent p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F]"
            placeholder="Username"
          />
          <input
            type="password"
            className="w-full text-slate-700 rounded-md border border-gray-400 bg-transparent p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F]"
            placeholder="Buat Kata Sandi"
          />
          <input
            type="password"
            className="w-full text-slate-700 rounded-md border border-gray-400 bg-transparent p-2 placeholder:text-sm placeholder:italic focus:outline-[#FF834F]"
            placeholder="Konfirmasi Kata Sandi"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md p-2 mt-5 border bg-[#FF834F] border-[#FF834F] text-center text-white"
        >
          Buat Akun
        </button>
      </form>
      <div className="w-full text-slate-700 text-center text-sm flex items-center justify-center space-x-1">
        <div>Sudah memiliki akun?</div>
        <div className="text-[#FF834F]" onClick={() => onLogin()}>Masuk</div>
        </div>

    </>
  );
}
