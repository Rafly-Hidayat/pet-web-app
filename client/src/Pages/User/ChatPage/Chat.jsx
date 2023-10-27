import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropRightLine, RiSendPlane2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";

import InputField from "../../../Components/InputField";
import { GetRoomIdChat } from "../../../Utils/store";

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dataVet, roomId } = location.state || {};
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const socket = io("http://localhost:8000", {
    transports: ["websocket", "polling"],
  });

  const [inputMessage, setInputMessage] = useState();
  const [chatList, setChatList] = useState([]);
  const [room, setRoom] = useState(roomId);

  const { isSuccess: getRoomSuccess, data } = GetRoomIdChat();

  useEffect(() => {
    if (!room && getRoomSuccess) {
      socket.emit("joinRoom", data.data);
      setRoom(data.data);
    }
  }, [getRoomSuccess]);

  useEffect(() => {
    console.log(room);
    if (room) {
      socket.emit("joinRoom", room);
    }
  }, []);

  useEffect(() => {
    socket.on("update", (data) => {
      setChatList(data);
    });
    socket.on("message", (messageData) => {
      console.log(messageData);
      setChatList((prev) => {
        return [...prev, { ...messageData }];
      });
    });
  });

  const manageScrollDownChat = () => {
    setTimeout(() => {
      const el = document.querySelector(".container-items-chat");
      const maxScrollPosition =
        (el && el.scrollHeight ? el.scrollHeight : 0) -
        (el && el.clientHeight ? el.clientHeight : 0);
      if (el) {
        el.scrollTop = maxScrollPosition;
      }
    }, 200);
  };

  const handleInputMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    console.log("handleInputMessage");
    const date = moment().format("l HH:mm");
    socket.emit("message", {
      from: auth?.username,
      room,
      message: inputMessage,
      date,
      userId: auth?.id,
      vetId: dataVet?.id,
    });
    setInputMessage("");
    manageScrollDownChat();
  };

  return (
    <div className="pt-24 flex flex-col h-full space-y-5 px-4 lg:px-20 overflow-hidden text-slate-700">
      <div className="flex items-center text-sm text-slate-700">
        <div
          className="text-slate-400 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Halaman Utama
        </div>
        <RiArrowDropRightLine className="text-xl" />
        <div
          className="text-slate-400 cursor-pointer"
          onClick={() =>
            navigate("/search", { state: { pageName: "Telekonsultasi" } })
          }
        >
          Telekonsultasi
        </div>
        <RiArrowDropRightLine className="text-xl" />
        <div>Chat</div>
      </div>
      <hr className="border w-full" />

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
