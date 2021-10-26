import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import Messages from "../components/Chat/Messages";
import MessageInput from "../components/Chat/MessageInput";
import LoginContext from "../context/LoginContext";
import { useHistory } from "react-router-dom";

import "../components/Chat/chatbox.css";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const { token } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div>
      {!token && history.push("/login")}
      <header className="chat header">React Chat</header>
      {socket ? (
        <div className="chat_main">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}
