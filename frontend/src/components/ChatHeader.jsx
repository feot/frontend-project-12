import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectActiveChannel } from '../slices/uiSlice.js';

const ChatHeader = () => {
  const activeChannel = useSelector(selectActiveChannel);
  const { t } = useTranslation();
  const channelName = (activeChannel?.name)
    ? `#${activeChannel.name}`
    : t('chatHeader.fallbackChannelTitle');

  return <b>{channelName}</b>;
};

export default ChatHeader;
