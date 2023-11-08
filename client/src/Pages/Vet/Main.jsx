import { useState } from "react";

import ListChat from "./ListChat";
import Schedule from "./Schedule";
import Profile from "./Profile";

export default function Main() {
  const [tab, setTab] = useState("chat");

  const getTab = () => {
    switch (tab) {
      case "chat":
        return <ListChat />;

      case "schedule":
        return <Schedule />;

      case "profile":
        return <Profile />;

      default:
        break;
    }
  };

  return (
    <div className="bg-[#fdc074] pt-20 flex flex-col h-full px-4 lg:px-20 overflow-auto">
      <div className="bg-[#fdc074] sticky top-0 w-full flex items-center">
        <div
          className={`w-[50%] text-center p-3 ${
            tab === "chat" &&
            "border-b border-[#598665] text-[#598665] font-semibold"
          } cursor-pointer lg:text-lg hover:text-[#598665]`}
          onClick={() => setTab("chat")}
        >
          Pesan
        </div>
        <div
          className={`w-[50%] text-center p-3 ${
            tab === "schedule" &&
            "border-b border-[#598665] text-[#598665] font-semibold"
          } cursor-pointer lg:text-lg hover:text-[#598665]`}
          onClick={() => setTab("schedule")}
        >
          Jadwal
        </div>
        <div
          className={`w-[50%] text-center p-3 ${
            tab === "profile" &&
            "border-b border-[#598665] text-[#598665] font-semibold"
          } cursor-pointer lg:text-lg hover:text-[#598665]`}
          onClick={() => setTab("profile")}
        >
          Profil
        </div>
      </div>
      {getTab()}
    </div>
  );
}
