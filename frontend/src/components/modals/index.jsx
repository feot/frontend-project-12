import React from 'react';
import { useSelector } from 'react-redux';
import { selectModalType } from '../../slices/uiSlice.js';
import ChannelAddModal from './ChannelAddModal.jsx';
import ChannelDeleteModal from './ChannelDeleteModal.jsx';
import ChannelRenameModal from './ChannelRenameModal.jsx';

const modals = {
  add: <ChannelAddModal />,
  delete: <ChannelDeleteModal />,
  rename: <ChannelRenameModal />,
};

const ModalController = () => {
  const modalType = useSelector(selectModalType);
  const Modal = modals[modalType];

  return Modal;
};
export default ModalController;
