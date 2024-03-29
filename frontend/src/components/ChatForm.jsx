import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useSendMessageMutation } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectUsername } from '../slices/authSlice.js';

const schema = yup.object().shape({
  text: yup.string().trim().required('Required'),
});

const InvalidFeedback = ({ validationError, networkError }) => {
  if (!validationError && !networkError) {
    return null;
  }

  const errorMsg = (() => {
    if (validationError === 'required') {
      return 'Поле не может быть пустым';
    }
    return 'Что-то пошло не так, попробуйте снова';
  })();

  return <div className="w-100 invalid-feedback text-center">{errorMsg}</div>;
};

const ChatForm = () => {
  const activeChannel = useSelector(selectActiveChannel);
  const username = useSelector(selectUsername);
  const [
    sendMessage,
    { error: sendMessageError, isLoading: isSendingMessage }
  ] = useSendMessageMutation();

  const handleSendMessage = (text) => {
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

  return (
    <Formik
      initialValues={{ text: '' }}
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={({ text }, { resetForm }) => {
        handleSendMessage(text);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="d-flex flex-wrap gap-1 p-3 pt-0">
          <Form.Control
            name="text"
            required
            placeholder="Введите сообщение"
            id="text"
            className="w-auto flex-grow-1"
            value={values.text}
            onChange={handleChange}
            autoFocus
            isInvalid={!isSendingMessage && (errors.text || sendMessageError)}
          />
          <Button variant="outline-primary" type="submit" disabled={isSendingMessage}>
            Отправить
          </Button>
          <InvalidFeedback
            validationError={errors?.text}
            networkError={sendMessageError}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChatForm;
