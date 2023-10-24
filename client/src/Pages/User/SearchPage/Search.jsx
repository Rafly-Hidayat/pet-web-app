import { RiArrowDropRightLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../../Components/InputField";
import { useEffect, useState } from "react";
import { VetList, GetPicture } from "../../../Utils/store";
import ScheduleModal from "../../../Components/ScheduleModal";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageName } = location.state || {};

  const [inputSearch, setInputSearch] = useState("");
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [modal, setModal] = useState(false);
  const [operationDays, setOperationDays] = useState(false);
  const [operationhours, setOperationhours] = useState(false);
  const [vetId, setVetId] = useState(null);

  const { isSuccess, data } = VetList();
  const { isSuccess: successGetPicture, data: picture } = GetPicture(2);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data)
      setVets(data.data);
      setFilteredVets(data.data);
    }
    if (successGetPicture) {
      console.log(URL.createObjectURL(picture));
    }
  }, [isSuccess, data, successGetPicture]);

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
    const filterVets = vets.filter((vet) =>
      vet.fullName.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilteredVets(filterVets);
  };

  return (
    <>
      <div className="mt-24 mb-4 flex flex-col flex-1 space-y-5 px-4 lg:px-20 text-slate-700">
        <div className="flex items-center text-sm text-slate-700">
          <div
            className="text-slate-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Halaman Utama
          </div>
          <RiArrowDropRightLine className="text-xl" />
          <div>{pageName || ""}</div>
        </div>
        <InputField
          placeholder="Cari Nama Dokter Hewan"
          value={inputSearch}
          onChange={handleSearch}
        />
        <div className="grid grid-flow-dense grid-cols-2 auto-cols-auto gap-4">
          {filteredVets.map((vet) => (
            <div
              className="border-2 shadow-md rounded-md min-h-40 p-3 space-y-3 col-span-2 lg:col-span-1 flex flex-col lg:flex-row items-center space-x-2"
              key={vet.id}
            >
              <div className="w-[60%] lg:w-[40%] flex justify-center">
                {successGetPicture && (
                  <img src={URL.createObjectURL(picture)} alt="tes" />
                )}
                <div className="w-24 rounded-full h-24 bg-red-400" />
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="col-span-2">
                    <div>
                      <div className="font-semibold"> {vet.fullName} </div>
                      <div className="text-sm text-slate-400">
                        Pengalaman:{" "}
                        <span className="text-slate-700">
                          {vet.experience} Tahun
                        </span>{" "}
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      {" "}
                      {vet.address}{" "}
                    </div>
                  </div>
                </div>
                <hr className="border" />
                <div className="text-sm text-slate-400">
                  Hari :{" "}
                  <span className="text-slate-700">
                    {vet.operationDays.join(", ")}.
                  </span>
                </div>
                <div className="text-sm text-slate-400">
                  Jam Operasi :{" "}
                  <span className="text-slate-700">{vet.operationHours}</span>
                </div>
                <div className="space-y-2">
                  <hr className="border" />
                  <div
                    className="bg-[#FF834F] rounded-lg text-center p-2 text-white cursor-pointer"
                    onClick={() => {
                      if (pageName !== 'Telekonsultasi') {
                        setModal(true);
                        setOperationDays(vet.operationDays);
                        setOperationhours(vet.operationHours);
                        setVetId(vet.id);
                      } else {
                        navigate("/chat", { state: { dataVet: vet } })
                      }
                    }}
                  >
                    {pageName === 'Telekonsultasi' ? 'Mulai Konsultasi Online' : 'Buat Jadwal'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <ScheduleModal
          setModal={() => setModal(false)}
          operationDays={operationDays}
          operationHours={operationhours}
          vetId={vetId}
          close={() => setModal(false)}
        />
      )}
    </>
  );
}
