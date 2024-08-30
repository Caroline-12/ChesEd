import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useAuth from "@/hooks/useAuth";

export default function ChatModal({ showChat, onClose }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const auth = useAuth();

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  const socket = io("http://localhost:3500", config);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  if (!showChat) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
        <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>
          Close
        </button>
        <div className="flex flex-col mt-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded">
              {msg}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="w-full border rounded px-2 py-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
