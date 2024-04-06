import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Spinner from './Spinner.jsx';
import { useGetMessagesQuery } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectMessages } from '../slices/messagesSlice.js';

const Messages = () => {
  const { isError, error, isLoading } = useGetMessagesQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const messageEntities = useSelector(selectMessages);
  const messages = Object.values(messageEntities)
    .filter(({ channelId }) => channelId === activeChannel?.id);

  const messagesContainerRef = useRef();
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
    }
  }, [messages]);

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }
  if (isError || !messages.length) {
    return null;
  }

  return (
    <div ref={messagesContainerRef} className="h-100 overflow-auto text-break">
      {isLoading && <Spinner />}
      {
        messages.map((message) => {
          const { id, username, body } = message;
          return (
            <div key={id}>
              <b>{username}</b>
              :
              {body}
            </div>
          );
        })
      }
    </div>
  );
};

export default Messages;
