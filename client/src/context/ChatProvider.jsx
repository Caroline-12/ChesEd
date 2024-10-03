import { createContext, useContext, useState } from "react";
import addNotification from "react-push-notification";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const getNotification = (newMessageReceived) => {
    addNotification({
      title: "Chessed",
      message: newMessageReceived.content,
      theme: "darkblue",
      icon: "chesed-logo.png",
      native: true,
      onClick: () => {
        console.log("Notification Clicked");
      },
    });

    setNotification((prevNotifications) => [
      ...prevNotifications,
      newMessageReceived,
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        getNotification, // Expose the addNotification function
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
