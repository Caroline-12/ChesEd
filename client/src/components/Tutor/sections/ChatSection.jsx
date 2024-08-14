import React, { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatSection = () => {
  const { auth } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  //   useEffect(() => {
  //     fetchConversations();
  //   }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        withCredentials: true,
      };

      const response = await axios.get(
        `/chat/conversations/${auth.userId}`,
        config
      );
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        withCredentials: true,
      };

      const response = await axios.get(
        `/chat/messages/${conversationId}`,
        config
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        withCredentials: true,
      };

      await axios.post(
        "/chat/send",
        {
          conversationId: selectedConversation.id,
          senderId: auth.userId,
          content: newMessage,
        },
        config
      );

      setNewMessage("");
      fetchMessages(selectedConversation.id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-[calc(100vh-100px)]">
      <Card className="w-1/4 mr-4">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant={
                  selectedConversation?.id === conversation.id
                    ? "default"
                    : "ghost"
                }
                className="w-full justify-start mb-2"
                onClick={() => setSelectedConversation(conversation)}
              >
                {conversation.studentName}
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            {selectedConversation
              ? `Chat with ${selectedConversation.studentName}`
              : "Select a conversation"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          {selectedConversation && (
            <>
              <ScrollArea className="flex-1 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 p-2 rounded-lg ${
                      message.senderId === auth.userId
                        ? "bg-blue-100 ml-auto"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <div className="flex">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSection;
