import React from 'react';

import './style.css'

import api from '../../api';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export default function Login({onReceive}) {

  async function handleFacebook(){
    let result = await api.fbPopup();

    if(result) {
      onReceive(result.user)
    } else {
      alert("Erro de Login")
    }
  }

  return (
    <>
      <div className="header-login"><WhatsAppIcon style={{
        color: '#FFF',
        marginLeft: 15,
        fontSize: 50
      }}/>
      </div>

      <div className="login">

        <button onClick={handleFacebook}>
          Logar com facebook
        </button>
      </div>
    </>
  );
}

