export default function ScheduleModal() {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[90%]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between pl-5 p-3 border-b border-solid bg-[#FF834F] border-slate-200 rounded-t-lg  text-white">
              <div className="capitalize font-semibold">
                Gejala Hewan Peliharaan
              </div>
              <i className="el-icon-close font-semibold text-xl hover:cursor-pointer" />
            </div>
            <div className="space-y-1 p-5">
              <div>Gejala apa yang dialami hewan peliharaan Anda ?</div>
              <div className="flex items-center space-x-4 text-center justify-center">
                <textarea className="border-2 w-full" rows="5"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 absolute inset-0 z-20 bg-black" />
    </div>
  );
}
