import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useGetChannelsQuery } from '../services/channels.js';
import { selectChannels } from '../slices/channelsSlice.js';
import {
  selectChannel,
  setIsModalShown,
  setModalType,
  setModalProps,
  selectActiveChannel,
} from '../slices/uiSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { isError, error } = useGetChannelsQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const channelEntities = useSelector(selectChannels);
  const { t } = useTranslation();

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }
  if (isError || !Object.keys(channelEntities).length) {
    return null;
  }

  const handleChannelAdd = () => {
    dispatch(setModalType('add'));
    dispatch(setIsModalShown(true));
  };

  const handleChannelSelect = (id) => {
    dispatch(selectChannel(channelEntities[id]));
  };

  const handleChannelDelete = (id) => {
    dispatch(setModalType('delete'));
    dispatch(setModalProps({ channelId: id }));
    dispatch(setIsModalShown(true));
  };

  const handleChannelRename = (id, name) => {
    dispatch(setModalType('rename'));
    dispatch(setModalProps({
      channelId: id,
      prevChannelName: name,
    }));
    dispatch(setIsModalShown(true));
  };

  const channelEls = Object.values(channelEntities).map((channel) => {
    const { id, name, removable } = channel;
    const isActive = id === activeChannel?.id;
    const channelBtnVariant = (isActive) ? 'secondary' : 'none';

    return (
      <li key={id} className="nav-item d-flex w-100">
        <Button
          variant={channelBtnVariant}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleChannelSelect(id)}
          title={name}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        {
          removable && (
            <Dropdown>
              <Dropdown.Toggle
                variant={channelBtnVariant}
                id="channel_dropdown"
                className="rounded-0 px-1"
              >
                <span className="visually-hidden">{t('channels.manage')}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleChannelDelete(id)}
                >
                  {t('channels.delete')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleChannelRename(id, name)}
                >
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        }
      </li>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <b>{t('channels.title')}</b>
        <button className="btn" onClick={handleChannelAdd} type="button">+</button>
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
