import React from 'react';
import { useSelector } from 'react-redux';
import { useGetInitialDataQuery } from '../../services/initialData.js';
import { selectChannels } from '../../slices/channelsSlice.js';
import { selectMessages } from '../../slices/messagesSlice.js';

const Main = () => {
  useGetInitialDataQuery();

  const channelsEntities = useSelector(selectChannels);
  console.log('channelsEntities', channelsEntities);
  const messagesEntities = useSelector(selectMessages);
  console.log('messagesEntities', messagesEntities);

  return (
    <>
      <p>Hi!</p>
    </>
  );
};

export default Main;
