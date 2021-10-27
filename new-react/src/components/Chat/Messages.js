import React, { useEffect, useState, useContext } from "react";
import LoginContext from "../../context/LoginContext";
import "./chatbox.css";

export default function Messages({ socket }) {
  const [messages, setMessages] = useState({});
  const { token } = useContext(LoginContext);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        // const user = { id: "anon", name: token };
        // prevMessages["user"] = user;
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        console.log(newMessages);
        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("message", messageListener);
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket, token]);

  // console.log(messages);
  // console.log("object.value ", Object.values(messages));

  return (
    <div className="message-list">
      {messages.length &&
        [...Object.values(messages)]
          .sort((a, b) => a.time - b.time)
          .map((message) => (
            <div
              key={message.id}
              className="message-container"
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              <span className="user">{message.user.name}:</span>
              <span className="message">{message.value}</span>
              <span className="date">
                {new Date(message.time).toLocaleTimeString()}
              </span>
            </div>
          ))}
    </div>
  );
}
