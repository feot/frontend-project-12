import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useRemoveChannelMutation } from '../services/channels.js';

const InvalidFeedback = ({ networkError }) => {
  if (!networkError) {
    return null;
  }
  const errorMsg = 'Что-то пошло не так, попробуйте снова';

  return <div className="w-100 invalid-feedback text-center">{errorMsg}</div>;
};

const ChannelDeleteModal = ({ id }) => {
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const [
    removeChannel,
    {
      error: removingChannelError,
      isLoading: isRemovingChannel,
    }
  ] = useRemoveChannelMutation();

  const handleRemoveChannel = () => {
    removeChannel(id);
  };

  const handleClose = () => dispatch(setIsModalShown(false));

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы уверены?</p>
        <div className="d-flex">
          <Button
            variant="danger"
            type="submit"
            className="ms-auto me-1"
            disabled={isRemovingChannel}
            onClick={handleRemoveChannel}
          >
            Да
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <InvalidFeedback networkError={removingChannelError} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelDeleteModal;
