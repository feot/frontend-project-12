import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { addChannel, removeChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const SocketListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io();

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);
};
export default SocketListener;
