import { useEffect, useState } from "react";
import { GetPicture, VetListChat } from "../../Utils/store";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

export default function ListChat() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const navigate = useNavigate();
  const socket = io("http://localhost:8000", {
    transports: ["websocket", "polling"],
  });
  const queryClient = useQueryClient();

  const [listChat, setListChat] = useState([]);

  const { isSuccess, data, refetch } = VetListChat(auth.idVet);

  useEffect(() => {
    socket.on("vetMessage", (messageData) => {
      if (messageData.vetId === auth.idVet) {
        queryClient.invalidateQueries(["VetListChat"]);
        refetch();
      }
    });
  });

  useEffect(() => {
    if (isSuccess) {
      setListChat(data.data);
    }
  }, [isSuccess, data]);

  return (
    <div className="h-full py-4">
      <div className="flex flex-col flex-1 overflow-y-auto space-y-4 p-2 container-items-chat overflow-auto">
        {listChat.length ? (
          listChat.map((chat, idx) => (
            <ChatComponent
              key={idx}
              chat={chat}
              handleClick={() =>
                navigate("/vet/chat", {
                  state: { roomId: chat.roomId, user: chat.user },
                })
              }
            />
          ))
        ) : (
          <div>Tidak ada daftar pesan</div>
        )}
      </div>
    </div>
  );
}

function ChatComponent({ chat, handleClick }) {
  const { isSuccess: successGetPicture, data: picture } = GetPicture(
    chat?.user?.id
  );
  return (
    <div
      className="p-2 pr-6 lg:pr-10 rounded-full flex items-center space-x-4 cursor-pointer bg-[#edf3ee] border-2 border-[#c8e1ce]"
      onClick={() => handleClick()}
    >
      {successGetPicture ? (
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img src={URL.createObjectURL(picture)} alt="pp" />
          </div>
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-red-400" />
      )}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-start">
          <div className="font-semibold lg:text-lg">{chat.user.fullName}</div>
          <div className="">{chat.message}</div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div>{chat.date.split(" ")[0]}</div>
          <div>{chat.date.split(" ")[1]}</div>
        </div>
      </div>
    </div>
  );
}
