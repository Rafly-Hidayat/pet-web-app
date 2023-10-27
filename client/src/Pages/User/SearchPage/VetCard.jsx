import { useEffect, useState } from "react";
import { GetDataChat, GetPicture } from "../../../Utils/store";
import { useNavigate } from "react-router-dom";

export default function VetCard({
  vet,
  btnLabel,
  auth,
  setModal,
  setOperationDays,
  setOperationhours,
  setVetId,
  vetId,
  pageName,
}) {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState();

  const { isSuccess: successGetPicture, data: picture } = GetPicture(
    vet.userId
  );
  const { isSuccess, data, isError, error } = GetDataChat({
    userId: auth.id,
    vetId,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      console.log(vetId, auth.id, data?.data?.roomId);
      setRoomId(data?.data?.roomId);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const handleClickBtn = (vet) => {
    if (pageName !== "Telekonsultasi") {
      setModal(true);
      setOperationDays(vet.operationDays);
      setOperationhours(vet.operationHours);
      setVetId(vet.id);
    } else {
      navigate("/chat", { state: { dataVet: vet, roomId } });
    }
  };

  return (
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
                <span className="text-slate-700">{vet.experience} Tahun</span>{" "}
              </div>
            </div>
            <div className="text-sm text-slate-400"> {vet.address} </div>
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
            onClick={() => handleClickBtn(vet)}
          >
            {btnLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
