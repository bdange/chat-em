import React from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

const ChatPanel = (props) => (
  <div className='column is-fullwidth'>
    <MessageList messages={props.messages} />
    <SendMessageForm
      sendMessage={props.sendMessage}
      email={props.email}
      roomid={props.roomId}
      uid={props.uid}/>
  </div>
);

export default ChatPanel;
