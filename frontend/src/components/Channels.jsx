import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';

import ModalContext from '../ModalContext.js';
import ChannelAddModal from './ChannelAddModal.jsx';
import ChannelDeleteModal from './ChannelDeleteModal.jsx';
import ChannelRenameModal from './ChannelRenameModal.jsx';

import { useGetChannelsQuery } from '../services/channels.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectChannels } from '../slices/channelsSlice.js';
import { selectChannel, setIsModalShown } from '../slices/uiSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const setModal = useContext(ModalContext);
  const { isError } = useGetChannelsQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const channelEntities = useSelector(selectChannels);

  if (isError || !Object.keys(channelEntities).length) {
    return null;
  }

  const handleChannelAdd = () => {
    setModal(<ChannelAddModal />);
    dispatch(setIsModalShown(true));
  };

  const handleChannelSelect = (id) => {
    dispatch(selectChannel(channelEntities[id]));
  };

  const handleChannelDelete = (id) => {
    setModal(<ChannelDeleteModal id={id} />);
    dispatch(setIsModalShown(true));
  }

  const handleChannelRename = (id) => {
    setModal(<ChannelRenameModal id={id} />);
    dispatch(setIsModalShown(true));
  }

  const channelEls = Object.values(channelEntities).map((channel) => {
    const { id, name, removable } = channel;
    const channelName = `# ${name}`;
    const isActive = id === activeChannel?.id;
    const channelBtnVariant = (isActive) ? 'secondary' : 'none';

    return (
      <li key={id} className="nav-item d-flex w-100">
        <Button
          variant={channelBtnVariant}
          className="w-100 rounded-0 text-start text-truncate overflow-hidden"
          onClick={() => handleChannelSelect(id)}
          title={channelName}
        >
          {channelName}
        </Button>

        {removable && <Dropdown>
          <Dropdown.Toggle
            variant={channelBtnVariant}
            id="channel_dropdown"
            className="rounded-0 px-1"
          >
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleChannelDelete(id)}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChannelRename(id)}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>}
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
