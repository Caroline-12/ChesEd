// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import { io } from "socket.io-client";

// // Initialize the Socket.IO client
// const socket = io("http://localhost:3500"); // Use your backend URL

// export default function ChatModal({
//   showChat,
//   onClose,
//   roomId,
//   senderId,
//   recipientId,
// }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Join the room
//     socket.emit("joinRoom", { roomId, senderId, recipientId });

//     // Listen for previous messages
//     socket.on("previousMessages", (msgs) => {
//       setMessages(msgs);
//     });

//     // Listen for new messages
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("previousMessages");
//       socket.off("receiveMessage");
//     };
//   }, [roomId, senderId, recipientId]);

//   // Scroll to the bottom when messages are updated
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()) {
//       // Send the message via socket
//       socket.emit("sendMessage", {
//         roomId,
//         senderId,
//         recipientId,
//         message: newMessage,
//       });

//       // Add the message locally
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setNewMessage("");
//     }
//   };

//   if (!showChat) return null;

//   return (
//     <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
//       <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
//         <h3 className="font-semibold">Chat</h3>
//         <Button variant="ghost" size="icon" onClick={onClose}>
//           <X className="h-4 w-4" />
//           <span className="sr-only">Close</span>
//         </Button>
//       </div>
//       <div className="flex-grow overflow-y-auto p-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`mb-2 ${
//               message.senderId === senderId ? "text-right" : "text-left"
//             }`}
//           >
//             <div
//               className={`inline-block p-2 rounded-lg ${
//                 message.senderId === senderId
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {message.message}
//             </div>
//             <div className="text-xs text-gray-500 mt-1">
//               {new Date(message.timestamp).toLocaleTimeString()}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 border-t">
//         <form onSubmit={sendMessage} className="flex gap-2">
//           <Input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-grow"
//           />
//           <Button type="submit">Send</Button>
//         </form>
//       </div>
//     </div>
//   );
// }
