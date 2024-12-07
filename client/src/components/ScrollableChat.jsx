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
                backgroundColor: m.sender?._id === auth.ID ? "#FF6B00" : "#F5F5F5",
                color: m.sender?._id === auth.ID ? "white" : "#1A1A1A",
                marginLeft: isSameSenderMargin(messages, m, i, auth.ID),
                marginTop: isSameUser(messages, m, i, auth.ID) ? 3 : 10,
                borderRadius: "16px",
                padding: "10px 16px",
                maxWidth: "70%",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                wordBreak: "break-word",
                position: "relative",
                transition: "all 0.2s ease",
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
