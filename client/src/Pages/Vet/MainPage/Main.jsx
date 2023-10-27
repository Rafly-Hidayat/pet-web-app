import { useState } from "react";

import ListChat from "./ListChat";
import Schedule from "./schedule";

export default function Main() {
  const [tab, setTab] = useState("chat");

  return (
    <div className="mt-24 mb-4 flex flex-col flex-1 space-y-5 px-4 lg:px-20 text-slate-700">
      <div className="sticky top-0 w-full flex items-center">
        <div
          className={`w-[50%] text-center p-3 ${
            tab === "chat" && "border-b"
          } cursor-pointer hover:bg-slate-100`}
          onClick={() => setTab("chat")}
        >
          Chats
        </div>
        <div
          className={`w-[50%] text-center p-3 ${
            tab === "janji" && "border-b"
          } cursor-pointer hover:bg-slate-100`}
          onClick={() => setTab("janji")}
        >
          Janji Temu
        </div>
      </div>
      {tab === "chat" ? <ListChat /> : <Schedule />}
    </div>
  );
}
