import React, { useState, useEffect, useContext } from "react";
import io from 'socket.io-client';
import LoginContext from "../context/LoginContext";
import DataContext from "../context/DataContext";
import ScrollToBottom from "react-scroll-to-bottom";
import '../styles/chat.scss'

const socket = io('http://localhost:3001')

function Chat() {
  const [messages, setMessages] = useState('')
  const [chat, setChat] = useState([])
  const { token } = useContext(LoginContext);
  const { currentTrip } = useContext(DataContext);

  useEffect(() => {
    getMessages().then((data) => {
      setChat(data.message)
    });
  }, []);

  console.log('chat', chat)

  async function getMessages(id) {
    return fetch(`http://localhost:8080/api/chat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      return data.json();
    });
  }

  useEffect(() => {
    socket.on('connection', message => {
      setChat([...chat, message])
    })

    socket.on('message', data => {
      setChat([...chat, data])
    })
  })
  const username = token

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', {username, messages})
    setMessages('')
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1 className="chat-title">{currentTrip.name} Chat</h1>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {chat.map((data, index)=>{
            return(
              <div
              className="message"
              id={username === data.username ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{data.messages}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{data.username}</p>
                </div>
              </div>
            </div>
              
            )
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <form className="chat-form" onSubmit={sendMessage}>
          <input type="text" name="message"
          placeholder='Type message'
          value={messages}
          onChange={(e)=>{setMessages(e.target.value)}}
          required
          autoComplete="off"
          ></input>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;