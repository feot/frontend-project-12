import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectMessages } from '../slices/messagesSlice.js';

const Messages = () => {
  const { isError } = useGetMessagesQuery();
  const activeChannel = useSelector(selectActiveChannel);
  const messageEntities = useSelector(selectMessages);
  const messages = Object.values(messageEntities)
    .filter(({ channelId }) => channelId === activeChannel?.id);

  if (isError || !messages.length) {
    return null;
  }

  return (
    <>
      {
        messages.map((message) => {
          const { id, username, body } = message;
          return <div key={id}><b>{username}</b>: {body}</div>
        })
      }
    </>
  );
};

export default Messages;
