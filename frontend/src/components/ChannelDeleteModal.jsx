import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useRemoveChannelMutation } from '../services/channels.js';

const InvalidFeedback = ({ networkError, t }) => {
  if (!networkError) {
    return null;
  }
  const errorMsg = t('errors.network');

  return <div className="w-100 invalid-feedback text-center">{errorMsg}</div>;
};

const ChannelDeleteModal = ({ id }) => {
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [
    removeChannel,
    {
      error: removingChannelError,
      isLoading: isRemovingChannel,
    },
  ] = useRemoveChannelMutation();

  const handleRemoveChannel = () => {
    removeChannel(id);
  };

  const handleClose = () => dispatch(setIsModalShown(false));

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modal.delete.bodyText')}</p>
        <div className="d-flex">
          <Button
            variant="danger"
            type="submit"
            className="ms-auto me-1"
            disabled={isRemovingChannel}
            onClick={handleRemoveChannel}
          >
            {t('modal.delete.submit')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>
          <InvalidFeedback networkError={removingChannelError} t={t} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelDeleteModal;
