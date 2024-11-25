import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "@/api/axios";
import { useEffect } from "react";
import { getSender } from "@/config/ChatLogics";
import { Button } from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";
import useAuth from "@/hooks/useAuth";
import Spinner from "./Spinner";
import SideDrawer from "./miscellaneous/SideDrawer";

const MyChats = () => {
  const { auth } = useAuth();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const response = await axios.get(`/chat/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(response.data);
      setChats(response.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  console.log(chats);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "100%" }}

    >
      <div className="flex flex-col w-full">
            <SideDrawer />
          </div>
      
      <Box
        d="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              (!chat.latestMessage) ? null :
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : ""}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                my={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(auth, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender?.username} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
