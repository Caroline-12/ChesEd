import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "@/api/axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
// import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "@/context/ChatProvider";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { auth } = useAuth();
  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const goToProfile = () => {
    console.log("Go to Profile");
    navigate("/tutor-dashboard/tutor-profile");
  };

  useEffect(() => {
    handleSearch();
  }, []);
  const handleSearch = async () => {
    // if (!search) {
    //   toast({
    //     title: "Please Enter something in search",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-left",
    //   });
    //   return;
    // }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      const { data } = await axios.get(`/tutors`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const { data } = await axios.post(
        `/chat`,
        { chatWith: userId, myUserId: auth.ID },
        config
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      console.error("Error accessing chat:", error); // Log for debugging
      toast({
        title: "Error fetching the chat",
        description:
          error.response?.data?.message || "Unable to access the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    
  };

  return (
    <>
      <div className=" flex flex-row">
        <div className="border-2 border-gray-400  rounded-full" >
          <Button variant="ghost" onClick={onOpen}>
            <Text className="text-gray-400 px-4">
              <SearchIcon />
              Search User
            </Text>
          </Button>
        </div>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${(auth, notif.sender.username)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={auth.username}
                src={auth.profilePhoto}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={goToProfile}>My Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu> */}
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
