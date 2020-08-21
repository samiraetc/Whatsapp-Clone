import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';

function Chat() {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState(' ');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState(' ');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data())),
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  function showHoursMinutes(message) {
    var date = new Date(message.timestamp?.toDate());
    var hours = date.getHours();
    var minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }

  function LastSeen(messages) {
    var date = new Date(
      messages[messages.length - 1]?.timestamp?.toDate(),
    ).toUTCString();

    var day = date.getDay;
    var hour = date.getHours;
    var minute = date.getMinutes;
    return date;
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>{LastSeen(messages)}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && 'chat__reciever'
            }`}
          >
            {message.message}
            <span className="chat__timestamp">{showHoursMinutes(message)}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Digite uma mensagem"
          />
          <button onClick={sendMessage} type="submit">
            Digite uma mensagem
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
