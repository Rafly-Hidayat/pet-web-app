import { useState } from "react";
import { io } from "socket.io-client";
import InputField from "../../../Components/InputField";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function Chat() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const socket = io("http://localhost:8000", {
    transports: ["websocket", "polling"],
  });

  const [inputMessage, setInputMessage] = useState();
  const [chatList, setChatList] = useState([]);
  const [room, setRoom] = useState("");

  const handleInputMessage = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full">
      <div className="flex flex-col flex-1 overflow-y-auto space-y-4 p-2 container-items-chat">
        {room}
        {chatList.map((chat, idx) => (
          <div
            key={idx}
            className={`flex ${
              chat.from === auth.username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`bg-[#DCF6DD] p-2 rounded-lg text-sm break-all max-w-[90%] ${
                chat.from === auth.username
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              }`}
            >
              {chat.message}
              <div className="flex justify-end text-xs"> {chat.date} </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-200 sticky bottom-3 p-3 rounded-lg">
        <form
          onSubmit={handleInputMessage}
          className="flex space-x-2 items-center"
        >
          <InputField
            placeholder="Pesan..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit">
            <RiSendPlane2Fill className="text-4xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
