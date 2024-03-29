import React, {
  useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import ModalContext from '../ModalContext.js';
import ChannelNameModal from './ChannelNameModal.jsx';

import { useGetChannelsQuery } from '../services/channels.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectChannels, addChannel } from '../slices/channelsSlice.js';
import { selectChannel, setIsModalShown } from '../slices/uiSlice.js';

const socket = io();

const Channels = () => {
  const dispatch = useDispatch();
  const setModal = useContext(ModalContext);
  const { isError } = useGetChannelsQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const channelEntities = useSelector(selectChannels);

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  if (isError || !Object.keys(channelEntities).length) {
    return null;
  }

  const handleChannelAdd = () => {
    setModal(<ChannelNameModal />);
    dispatch(setIsModalShown(true));
  };

  const handleChannelSelect = (id) => {
    dispatch(selectChannel(channelEntities[id]));
  };

  const channelEls = Object.values(channelEntities).map((channel) => {
    const { id, name } = channel;
    const channelName = `# ${name}`;
    const isActive = id === activeChannel?.id;
    const className = (isActive)
      ? 'w-100 rounded-0 text-start btn btn-secondary'
      : 'w-100 rounded-0 text-start btn';

    return (
      <li key={id} className="nav-item w-100">
        <button onClick={() => handleChannelSelect(id)} className={className}>{channelName}</button>
      </li>
    )
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <b>Каналы</b>
        <button className="btn" onClick={handleChannelAdd}>+</button>
      </div>
      <div className="overflow-auto h-100">
        <ul className="nav nav-pills nav-fill h-100 d-block">
          {channelEls}
        </ul>
      </div>
    </>
  );
};

export default Channels;
