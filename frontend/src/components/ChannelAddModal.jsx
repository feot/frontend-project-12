import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { selectChannels } from '../slices/channelsSlice.js';
import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useAddChannelMutation } from '../services/channels.js';

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

const ChannelAddModal = () => {
  const channelEntities = useSelector(selectChannels);
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const existingChannelNames = Object.values(channelEntities).map(({ name }) => name);
  const [
    addChannel,
    {
      error: addingChannelError,
      isLoading: isAddingChannel
    }
  ] = useAddChannelMutation();

  const handleAddChannel = (name) => {
    addChannel({ name });
  };

  const handleClose = () => dispatch(setIsModalShown(false));

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ text: '' }}
          validationSchema={getValidationSchema(existingChannelNames)}
          validateOnChange={false}
          onSubmit={({ text }) => {
            handleAddChannel(text);
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
                autoFocus
                isInvalid={!isAddingChannel && (errors.text || addingChannelError)}
              />
              <InvalidFeedback
                validationError={errors?.text}
                networkError={addingChannelError}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isAddingChannel}
                className="ms-auto me-1"
              >
                Добавить
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Закрыть
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelAddModal;
