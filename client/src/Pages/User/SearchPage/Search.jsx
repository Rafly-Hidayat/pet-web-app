import { RiArrowDropRightLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../../Components/InputField";
import { useEffect, useState } from "react";
import { VetList } from "../../../Utils/store";
import ScheduleModal from "../../../Components/ScheduleModal";
import VetCard from "./VetCard";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const { pageName } = location.state || {};

  const [inputSearch, setInputSearch] = useState("");
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);
  const [modal, setModal] = useState(false);
  const [operationDays, setOperationDays] = useState(false);
  const [operationhours, setOperationhours] = useState(false);
  const [vetId, setVetId] = useState(null);

  const { isSuccess, data } = VetList();

  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      setVets(data.data);
      setFilteredVets(data.data);
    }
  }, [isSuccess, data]);

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
            <VetCard
              key={vet.id}
              vet={vet}
              vetId={vet.id}
              auth={auth}
              setVetId={(val) => setVetId(val)}
              setModal={(val) => setModal(val)}
              setOperationDays={(val) => setOperationDays(val)}
              setOperationhours={(val) => setOperationhours(val)}
              pageName={pageName}
              btnLabel={
                pageName === "Telekonsultasi"
                  ? "Mulai Konsultasi Online"
                  : "Buat Jadwal"
              }
            />
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
