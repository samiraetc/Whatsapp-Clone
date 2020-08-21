import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from '../../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState(' ');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const person = prompt('Informe seu nome');

    if (person) {
      db.collection('rooms').add({
        name: person,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />

        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>+ Criar chat</h2>
    </div>
  );
}

export default SidebarChat;
