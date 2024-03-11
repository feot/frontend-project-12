import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../services/channels.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectChannels } from '../slices/channelsSlice.js';
import { selectChannel } from '../slices/uiSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { isError } = useGetChannelsQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const channelEntities = useSelector(selectChannels);

  if (isError || !Object.keys(channelEntities).length) {
    return null;
  }

  const handleClick = (id) => {
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
        <button onClick={() => handleClick(id)} className={className}>{channelName}</button>
      </li>
    )
  });

  return (
    <ul className="nav nav-pills nav-fill h-100 d-block">
      {channelEls}
    </ul>
  );
};

export default Channels;
