import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { io } from 'socket.io-client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useSendMessageMutation } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectUsername } from '../slices/authSlice.js';
import { addMessage } from '../slices/messagesSlice.js';

const schema = yup.object().shape({
  text: yup.string().trim().required('Required'),
});

const socket = io();

const ChatForm = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector(selectActiveChannel);
  const username = useSelector(selectUsername);
  const [text, setText] = useState('');
  const [
    sendMessage,
    { error: sendMessageError, isLoading: isSendingMessage }
  ] = useSendMessageMutation();

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const channelId = activeChannel?.id;

    if (channelId) {
      const newMessage = {
        body: text,
        channelId: activeChannel.id,
        username,
      };
      sendMessage(newMessage);
    }
  };

  const textInputRef = useRef();

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
    setText('');
  });

  return (
    <Formik
      initialValues={{ text }}
      validationSchema={schema}
    >
      {() => (
        <Form onSubmit={handleSubmit} className="d-flex flex-wrap gap-1 p-3 pt-0">
          <Form.Control
            name="text"
            required
            placeholder="Введите сообщение"
            id="text"
            className="w-auto flex-grow-1"
            value={text}
            onChange={handleChange}
            ref={textInputRef}
            isInvalid={!isSendingMessage && sendMessageError}
          />
          <Button variant="outline-primary" type="submit" disabled={isSendingMessage}>
            Отправить
          </Button>
          {sendMessageError && <div className="w-100 invalid-feedback text-center">Что-то пошло не так, попробуйте снова</div>}
        </Form>
      )}
    </Formik>
  );
};

export default ChatForm;
