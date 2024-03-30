import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { selectChannels } from '../slices/channelsSlice.js';
import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useRenameChannelMutation } from '../services/channels.js';

const getValidationSchema = (existingChannelNames) => {
  return yup.object().shape({
    text: yup.string()
      .trim()
      .min(3, 'min')
      .max(20, 'max')
      .required('required')
      .notOneOf(existingChannelNames, 'repeat'),
  });
}

const InvalidFeedback = ({ validationError, networkError }) => {
  if (!validationError && !networkError) {
    return null;
  }

  const errorMsg = (() => {
    if (validationError === 'min' || validationError === 'max') {
      return 'Название должно быть не меньше 3 и не больше 20 символов';
    } else if (validationError === 'repeat') {
      return 'Такой канал уже есть';
    } else if (validationError === 'required') {
      return 'Поле не может быть пустым';
    }
    return 'Что-то пошло не так, попробуйте снова';
  })();

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const ChannelRenameModal = ({ id }) => {
  const channelEntities = useSelector(selectChannels);
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const existingChannelNames = Object.values(channelEntities).map(({ name }) => name);
  const [
    renameChannel,
    {
      error: renameChannelError,
      isLoading: isRenamingChannel,
    }
  ] = useRenameChannelMutation();

  const handleRenameChannel = (id, name) => {
    renameChannel({ id, name });
  };

  const handleClose = () => dispatch(setIsModalShown(false));
  
  useEffect(() => {
    textInputRef.current.focus();
  }, [])

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ text: '' }}
          validationSchema={getValidationSchema(existingChannelNames)}
          validateOnChange={false}
          onSubmit={({ text }) => {
            handleRenameChannel(id, text);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className="d-flex flex-wrap">
              <Form.Control
                name="text"
                required
                placeholder="Введите название"
                id="text"
                className="mb-2"
                value={values.text}
                onChange={handleChange}
                ref={textInputRef}
                isInvalid={!isRenamingChannel && (errors.text || renameChannelError)}
              />
              <InvalidFeedback
                validationError={errors?.text}
                networkError={renameChannelError}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isRenamingChannel}
                className="ms-auto me-1"
              >
                Ок
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRenameModal;
