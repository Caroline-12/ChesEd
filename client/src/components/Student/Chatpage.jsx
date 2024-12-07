import { useState } from "react";
import MyChats from "../MyChats";
import SideDrawer from "../miscellaneous/SideDrawer";
import Chatbox from "../Chatbox";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="w-[380px] flex-shrink-0 h-full border-r border-gray-200 bg-white">
        <MyChats fetchAgain={fetchAgain} />
      </div>
      <div className="flex-1 h-full bg-white">
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default Chatpage;
