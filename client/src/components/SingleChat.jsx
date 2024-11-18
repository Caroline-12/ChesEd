import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/react";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState, useRef } from "react";
import axios from "@/api/axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import io from "socket.io-client";

import { ChatState } from "@/context/ChatProvider";
import useAuth from "@/hooks/useAuth";
const ENDPOINT = "http://localhost:3500";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const socketRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    getNotification,
  } = ChatState();

  console.log(notification, "ttttttttt");
  const { auth } = useAuth();

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      setLoading(true);

      const response = await axios.get(`/message/${selectedChat._id}`, config);
      setMessages(response.data);
      console.log(response.data);
      setLoading(false);

      socketRef.current.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socketRef.current.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        };
        setNewMessage("");
        const response = await axios.post(
          "/message",
          {
            content: newMessage,
            chatId: selectedChat,
            senderId: auth.ID,
          },
          config
        );
        socketRef.current.emit("new message", response.data);
        setMessages([...messages, response.data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    if (auth?.ID) {
      socketRef.current = io(ENDPOINT);
      socketRef.current.emit("setup", auth);
      socketRef.current.on("connected", () => setSocketConnected(true));
      socketRef.current.on("typing", () => setIsTyping(true));
      socketRef.current.on("stop typing", () => setIsTyping(false));

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect(auth);
        }
      };
    }
  }, [auth]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("message received", (newMessageReceived) => {
        console.log("Message sent and received");
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          if (!notification.includes(newMessageReceived)) {
            getNotification(newMessageReceived);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        }
      });

      return () => {
        socketRef.current.off("message received");
      };
    }
  }, [selectedChat, notification, fetchAgain, setFetchAgain, setNotification]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socketRef.current.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socketRef.current.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
        <Text
          fontSize={{ base: "28px", md: "30px" }}
          pb={3}
          px={2}
          w="100%"
          fontFamily="Work sans"
          display="flex"
          justifyContent={{ base: "space-between" }}
          alignItems="center"
          bg="#ffffff"
        >
          <IconButton
            display={{ base: "flex", md: "none" }}
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat("")}
          />
          {messages && !selectedChat.isGroupChat && (
            <>
              {getSender(auth, selectedChat.users)}
              <ProfileModal user={getSenderFull(auth, selectedChat.users)} />
            </>
          )}
        </Text>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="calc(100vh - 220px)" // Adjust height dynamically
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading ? (
            <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
          ) : (
            <div
              className="messages"
              style={{
                display: "flex",
                flexDirection: "column-reverse", // Ensures newest messages show first
                overflowY: "scroll",
                height: "100%",
              }}
            >
              <ScrollableChat messages={messages} />
            </div>
          )}
      
          <FormControl
            onKeyDown={sendMessage}
            id="first-name"
            isRequired
            mt={3}
          >
            {istyping && (
              <div>
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            )}
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={typingHandler}
            />
          </FormControl>
        </Box>
      </>
      
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
