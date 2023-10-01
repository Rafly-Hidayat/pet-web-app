import {
  RiArrowDropRightLine,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../Components/InputField";
import { useEffect, useState } from "react";
import { VetList } from "../../Utils/store";
import ScheduleModal from "../../Components/ScheduleModal";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageName } = location.state || {};

  const [inputSearch, setInputSearch] = useState("");
  const [species, setSpecies] = useState("Semua spesies");
  const [specieses] = useState([
    "Semua spesies",
    "Kucing",
    "Domba",
  ]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [vets, setVets] = useState([]);
  const [filteredVets, setFilteredVets] = useState([]);

  const { isSuccess, data } = VetList();

  useEffect(() => {
    if (isSuccess) {
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
      <div className="mt-24 flex flex-col flex-1 space-y-5 px-4 text-slate-700">
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
        <div className="w-96">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <div className="text-slate-700">Spesies hewan : {species}</div>
            {isDropdown ? (
              <RiArrowDropUpLine className="text-2xl" />
            ) : (
              <RiArrowDropDownLine className="text-2xl" />
            )}
          </div>
          <ul
            className={`rounded text-gray-700 text-sm w-[50%] ${
              !isDropdown && "hidden"
            }`}
          >
            {specieses.map((val, idx) => (
              <li
                className="flex items-center py-1 p-2 bg-gray-100 hover:bg-gray-200"
                key={idx}
                onClick={() => {
                  setSpecies(val);
                  setIsDropdown(false);
                }}
              >
                <div className="cursor-pointer w-full text-sm block whitespace-no-wrap">
                  {val}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-flow-dense grid-cols-3 auto-cols-auto gap-2">
          {filteredVets.map((vet) => (
            <div
              className="border-2 shadow-md rounded-md min-h-40 p-3 space-y-3 col-span-3 lg:col-span-1"
              key={vet.id}
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 rounded-full h-24 bg-red-400" />
                <div className="col-span-2 space-y-5 py-2">
                  <div>
                    <div className="font-semibold"> {vet.fullName} </div>
                    <div className="text-sm text-slate-400">
                      Pengalaman:{" "}
                      <span className="text-slate-700">
                        {vet.experience} Tahun
                      </span>{" "}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400"> {vet.address} </div>
                </div>
              </div>
              <hr className="border" />
              <div className="text-sm text-slate-400">
                Bidang Khusu(s):{" "}
                <span className="text-slate-700">{vet.specialist}</span>
              </div>
              <div className="text-sm text-slate-400">
                Hewan Peliharaan Dirawat:{" "}
                <span className="text-slate-700">{vet.treatedAnimals}</span>
              </div>
              <div className="space-y-2">
                <hr className="border" />
                <div className="bg-[#FF834F] rounded-lg text-center p-2 text-white">
                  Jadwal
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScheduleModal />
    </>
  );
}
