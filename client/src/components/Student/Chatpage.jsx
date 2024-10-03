import { useState } from "react";
import MyChats from "../MyChats";
import SideDrawer from "../miscellaneous/SideDrawer";
import Chatbox from "../Chatbox";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MyChats fetchAgain={fetchAgain} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </div>
  );
};

export default Chatpage;
