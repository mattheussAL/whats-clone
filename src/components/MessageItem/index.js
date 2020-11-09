import React from 'react';

import './style.css';

function MessageItem({data, user}) {
  return (
    <div className="message-line" style={{ justifyContent: user.name === data.author ? 'flex-end' : 'flex-start' }}>
      <div className="message-item"  style={{ background: user.name === data.author ? '#DCF8C6' : '#FFF' }}>
        <div className="message-text">{data.body}</div>
        <div className="message-data">{data.hour}</div>
      </div>
    </div>
  );
}

export default MessageItem;