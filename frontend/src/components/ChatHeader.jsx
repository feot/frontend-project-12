import { useSelector } from 'react-redux';
import { selectActiveChannel } from '../slices/uiSlice.js';

const ChatHeader = () => {
  const activeChannel = useSelector(selectActiveChannel);

  return <b>{(activeChannel?.name) ? `#${activeChannel.name}` : ' '}</b>;
};

export default ChatHeader;
