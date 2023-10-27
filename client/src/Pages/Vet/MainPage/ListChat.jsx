import { useEffect, useState } from "react";
import { VetListChat } from "../../../Utils/store";

export default function ListChat() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  const [listChat, setListChat] = useState([]);

  const { isSuccess, data } = VetListChat(auth.id);

  useEffect(() => {
    if (isSuccess) {
      setListChat(data.data);
    }
  }, [isSuccess]);

  return (
    <div className="h-full">
      <div className="flex flex-col flex-1 overflow-y-auto space-y-4 p-2 container-items-chat">
        {listChat.length ? (
          listChat.map((chat, idx) => (
            <div key={idx} className="p-3 px-10 flex items-center space-x-4">
              <div className="w-5 h-5 rounded-full bg-red-500"></div>
              <div className="flex flex-col justify-start">
                <div className="font-semibold">{chat.user.fullName}</div>
                <div className="text-sm">{chat.message}</div>
              </div>
            </div>
          ))
        ) : (
          <div>Tidak ada daftar chat</div>
        )}
      </div>
    </div>
  );
}
