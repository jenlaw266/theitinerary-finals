import React, { useState } from "react";
import "./chatbox.css";

export default function NewMessage({ socket }) {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("message", value);
    setValue("");
  };

  return (
    <form onSubmit={submitForm} className="chat form">
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
}
