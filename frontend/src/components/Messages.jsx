import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { useGetMessagesQuery } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectMessages, addMessage } from '../slices/messagesSlice.js';

const socket = io();

const Messages = () => {
  const dispatch = useDispatch();
  const { isError } = useGetMessagesQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const messageEntities = useSelector(selectMessages);
  const messages = Object.values(messageEntities)
    .filter(({ channelId }) => channelId === activeChannel?.id);

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const messagesContainerRef = useRef();
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
    }
  }, [messages]);

  if (isError || !messages.length) {
    return null;
  }

  return (
    <div ref={messagesContainerRef} className="h-100 overflow-auto text-break">
      {
        messages.map((message) => {
          const { id, username, body } = message;
          return <div key={id}><b>{username}</b>: {body}</div>
        })
      }
    </div>
  );
};

export default Messages;
