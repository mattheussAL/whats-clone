import React, { useState, useEffect}from 'react';

import './style.css';

export default function ChatList({onClick, name, avatar, active, data}) {

  // const [time, setTime] = useState('');

  // useEffect(() => {
  //   if(data.lastMessageDate > 0){
  //     let d = new Date(data.lastMessageDate.seconds * 1000);
  //     let hours = d.getHours();
  //     let minutes = d.getMinutes();

  //     hours = hours < 10 ? '0' + hours : hours;
  //     minutes = minutes < 10 ? '0' + minutes : minutes;

  //     setTime(`${hours}:${minutes}`)
  //   }
  // }, [data])


  return (
    <div className={`chatList ${active ? 'active' : ''}`} onClick={onClick} >

      <img className="avatar" src={avatar} alt="avatar"/>
      
      <div className="chatLines">
        <div className="line">
          <div className="name">{name}</div>
          <div className="date">22:00</div>
        </div>

        <div className="line">
          <div className="lastMsg">
            <p>Opa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

