import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import profanityFilter from 'leo-profanity';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';

import { useSendMessageMutation } from '../services/messages.js';
import { selectActiveChannel } from '../slices/uiSlice.js';
import { selectUsername } from '../slices/authSlice.js';

const schema = yup.object().shape({
  text: yup.string().trim().required('required'),
});

const InvalidFeedback = ({ validationError, networkError, t }) => {
  if (!validationError && !networkError) {
    return null;
  }
  const errorMsg = (validationError)
    ? t(`errors.${validationError}`)
    : t('errors.network');

  return <div className="w-100 invalid-feedback text-center">{errorMsg}</div>;
};

const ChatForm = () => {
  const activeChannel = useSelector(selectActiveChannel);
  const username = useSelector(selectUsername);
  const textInputRef = useRef();
  const { t } = useTranslation();
  const [
    sendMessage,
    { error: sendMessageError, isLoading: isSendingMessage },
  ] = useSendMessageMutation();

  useEffect(() => {
    textInputRef.current.focus();
  }, [activeChannel]);

  const handleSendMessage = (text) => {
    const channelId = activeChannel?.id;
    const textProfanityFiltered = profanityFilter.clean(text);

    if (channelId) {
      const newMessage = {
        body: textProfanityFiltered,
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
            aria-label={t('msgForm.inputLabel')}
            placeholder={t('msgForm.inputPlaceholder')}
            id="text"
            className="w-auto flex-grow-1"
            ref={textInputRef}
            value={values.text}
            onChange={handleChange}
            isInvalid={!isSendingMessage && (errors.text || sendMessageError)}
          />
          <Button variant="outline-primary" type="submit" disabled={isSendingMessage}>
            {t('msgForm.submit')}
          </Button>
          <InvalidFeedback
            validationError={errors?.text}
            networkError={sendMessageError}
            t={t}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChatForm;
