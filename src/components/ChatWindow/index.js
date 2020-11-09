import React, {useState, useEffect, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';

import './style.css';

import MessageItem from '../MessageItem';

import Search from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Close from '@material-ui/icons/Close';
import Send from '@material-ui/icons/Send';
import Mic from '@material-ui/icons/Mic';

import api from '../../api';

export default function ChatWindow({user, data}) {
  const body = useRef();

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening]= useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([])

  
  useEffect(() => {
    setList([])

    let unsub = api.onChatContent(data.chatId, setList, setUsers);

    return unsub;
  }, [data.chatId])

  useEffect(() => {
    if(body.current.scrollHeight > body.current.offsetHeight){
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])

  function handleEmojiClick(e, emojiObject) {
    setText(text + emojiObject.emoji)
  }

  function handleOpenEmoji() {
    setEmojiOpen(true)
  }

  function handleCloseEmoji() {
    setEmojiOpen(false)
  }

  function handleMicClick() {
    if(recognition !== null)  {
      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()
    }
  }

  function handleInputKeyUp(e) {
    if(e.keyCode === 13){
      handleSendClick();
    }
  }  

  function handleSendClick() {
    if(text !== '') {
      api.sendMessage(data, user.id, 'text', text);

      setText('');

      setEmojiOpen(false);
    }
  }


  return (
    
    <div className="chatWindow">
      <div className="header">
        <div className="info">
          <img className="avatar" src={data.image} alt="" />
          <div className="name">{data.title}</div>
        </div>
        <div className="header-buttons">
          <div className="button"><Search style={{color: '#919191'}}/></div>

          <div className="button"><AttachFile style={{color: '#919191'}}/></div>

          <div className="button"><MoreVert style={{color: '#919191'}}/></div>
        </div>
      </div>
      
      <div ref={body} className="body">
        {list.map((item, key) => (
          <MessageItem 
            key={key}
            data={item}
            user={user}
          />
        ))}
      </div>

      <div className="emoji-area" style={{
        height: emojiOpen ? '200px' : '0px'
      }}>
        <EmojiPicker 
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="footer">

        <div className="pre">

          <div
            className="button" 
            onClick={handleCloseEmoji} 
            style={{width: emojiOpen ? 40 : 0}}
          >
            <Close style={{color: '#919191'}}/>
          </div>

          <div className="button" onClick={handleOpenEmoji} >
            <InsertEmoticon style={{color: emojiOpen ? '#009688' : '#919191'}}/>
          </div>

        </div>

        <div className="input-area">
          <input 
            className="input"
            type="text"
            placeholder="Digite uma mensagem..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>

        <div className="pos">

          {text === '' ? (
            <div onClick={handleMicClick} className="button"><Mic style={{color: listening ? '#126ECE' : '#919191'}}/></div>
          ) : (
            <div onClick={handleSendClick} className="button"><Send style={{color: '#919191'}}/></div>
          )}

        </div>
      </div>
    </div>
  );
}