import { AddIcon, BellIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, Input, IconButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "@/api/axios";
import { useEffect, useState } from "react";
import { getSender } from "@/config/ChatLogics";
import { Button } from "@chakra-ui/react";
import { ChatState } from "@/context/ChatProvider";
import useAuth from "@/hooks/useAuth";
import Spinner from "./Spinner";
import SideDrawer from "./miscellaneous/SideDrawer";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const MyChats = () => {
  const { auth } = useAuth();

  const [search, setSearch] = useState("");
  const { selectedChat, setSelectedChat, chats, setChats, notification } = ChatState();
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
      h="100%"
      bg="white"
      className="relative"
    >
      <Box className="flex flex-col h-full">
        {/* Header with search and notifications */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex-1 relative">
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-sm"
              _hover={{ bg: "#F5F5F5" }}
              _focus={{ bg: "white", borderColor: "#FF6B00" }}
            />
            <SearchIcon 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
          </div>
          <div className="ml-2 relative">
            <IconButton
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
              icon={<BellIcon className="h-5 w-5 text-gray-600" />}
              variant="ghost"
            />
            <div className="absolute -top-1 -right-1">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
                style={{ backgroundColor: '#FF6B00' }}
              />
            </div>
          </div>
        </div>

        {/* Chat list */}
        <Box
          className="flex-1 overflow-y-auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#FF6B00',
              borderRadius: '24px',
            },
          }}
        >
          {chats ? (
            <Stack spacing={0}>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  className={`px-3 py-3 rounded-lg transition-all duration-200 my-1 hover:bg-gray-50 ${
                    selectedChat === chat ? 'bg-orange-50' : ''
                  }`}
                  key={chat._id}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <Text className="text-orange-600 font-medium text-lg">
                          {chat.chatName ? chat.chatName[0].toUpperCase() : getSender(auth, chat.users)[0]}
                        </Text>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text className="text-gray-900 font-medium">
                        {!chat.isGroupChat
                          ? getSender(auth, chat.users)
                          : chat.chatName}
                      </Text>
                      <Text className="text-sm text-gray-500 truncate">
                        {chat.latestMessage?.content || "Start a conversation"}
                      </Text>
                    </div>
                  </div>
                </Box>
              ))}
            </Stack>
          ) : (
            <Spinner />
          )}
        </Box>
      </Box>
      <div className="flex flex-col w-full">
            <SideDrawer />
          </div>
    </Box>
  );
};

export default MyChats;
