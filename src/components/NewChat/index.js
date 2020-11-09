import React, { useState, useEffect } from 'react';

import './style.css';

import api from '../../api';

import ArrowBack from '@material-ui/icons/ArrowBack';

function NewChat({ user, chatList, show, setShow}) {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const getList = async () => {
      if(user !== null) {
        let results = await api.getContactList(user.id)
        setList(results)
      }
    }

    getList()
  }, [user])
  
  async function addNewChat(userTwo) {
    await api.addNewChat(user, userTwo);
    
    handleClose();
  }
  
  function handleClose() {
    setShow(false)
  }

  return(
    <div className="NewChat" style={{ left: show ? 0 : -415 }}>

      <div className="head">
        <div className="back" onClick={handleClose}><ArrowBack style={{ color: '#FFF' }}/></div>
        <div className="title">Nova Conversa</div>
      </div>

      <div className="list"> {list.map((item, key) => ( 
        <div onClick={() => addNewChat(item)} className="item" key={key}>
          <img className="avatar" src={item.avatar} alt=""/>
          <div className="name">{item.name}</div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default NewChat;