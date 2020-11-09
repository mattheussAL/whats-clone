import React, { useState, useEffect } from 'react';

import ChatList from './components/ChatList';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import './styles/GlobalStyles.css'

import DonutLarge from '@material-ui/icons/DonutLarge';
import Chat from '@material-ui/icons/Chat';
import MoreVert from '@material-ui/icons/MoreVert';
import Search from '@material-ui/icons/Search';

import api from './api';

function App() {
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState({
    id: 'Nl6l8PYIWa4rzuoEDuXL',
    name: 'Fulano',
    avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png',
  });
  const [showNewChat , setShowNewChat] = useState(false);

  useEffect(() => {
    if(user !== null) {
      let unsub = api.onChatList(user.id, setChatList)

      return unsub;
    }
  }, [user])

  function handleNewChat() { setShowNewChat(true) }

  async function handleLoginData(u) {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    
    await api.addUser(newUser);
    setUser(newUser);
  }

  if(user === null) { return (<Login onReceive={handleLoginData}/>) }

  return (
    <div className="app-window">
      <div className="sidebar">
          <NewChat chatList={chatList} user={user} show={showNewChat} setShow={setShowNewChat} />
          <header>
            <img className="avatar" src={user.avatar} alt="avatar"/>
            <div className="buttons">
              <div className="header-btn"><DonutLarge style={{color: '#919191'}}/></div>

              <div className="header-btn" onClick={handleNewChat}><Chat style={{color: '#919191'}}/></div>

              <div className="header-btn"><MoreVert style={{color: '#919191'}}/></div>
            </div>
          </header>

          <div className="search">
            <div className="input">

              <Search fontSize='small' style={{color:"#919191"}}/>
              <input type="text" placeholder="Procurar ou começar uma nova conversa"/>

            </div>
          </div>

          <div className="chat-list">
            {chatList.map((item, key) => (
              <ChatList key={key} active={activeChat.chatId === chatList[key].chatId} avatar={item.image} name={item.title} onClick={() => setActiveChat(chatList[key])}/>
            ))}
          </div>

      </div>

      <div className="content-area">
        { activeChat.chatId !== undefined && 
          <ChatWindow 
            user={user}
            data={activeChat}
          />  
        }
        { activeChat.chatId === undefined &&
          <ChatIntro /> 
        }
      </div>

    </div>
  );
}

export default App;
