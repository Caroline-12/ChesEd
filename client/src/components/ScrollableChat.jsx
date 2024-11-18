import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import useAuth from "@/hooks/useAuth";

const ScrollableChat = ({ messages }) => {
  const { auth } = useAuth();

  return (
    <ScrollableFeed forceScroll>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, auth.ID) ||
              isLastMessage(messages, i, auth.ID)) && (
              <Tooltip
                label={m.sender?.username}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender?.username}
                  src={m.sender?.avatar}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: m.sender?._id === auth.ID ? "#BEE3F8" : "#B9F5D0",
                marginLeft: isSameSenderMargin(messages, m, i, auth.ID),
                marginTop: isSameUser(messages, m, i, auth.ID) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
