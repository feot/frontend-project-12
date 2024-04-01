import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';

import { selectChannels } from '../slices/channelsSlice.js';
import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useRenameChannelMutation } from '../services/channels.js';

const getValidationSchema = (existingChannelNames) => {
  return yup.object().shape({
    text: yup.string()
      .trim()
      .min(3, 'minmax')
      .max(20, 'minmax')
      .required('required')
      .notOneOf(existingChannelNames, 'channelRepeat'),
  });
}

const InvalidFeedback = ({ validationError, networkError, t }) => {
  if (!validationError && !networkError) {
    return null;
  }
  const errorMsg = (validationError)
    ? t(`errors.${validationError}`)
    : t('errors.network');

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const ChannelRenameModal = ({ id, prevName }) => {
  const channelEntities = useSelector(selectChannels);
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const { t } = useTranslation();
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
    textInputRef.current.select();
  }, [isModalShown]);

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ text: prevName }}
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
                placeholder={t('modal.rename.inputPlaceholder')}
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
                t={t}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={isRenamingChannel}
                className="ms-auto me-1"
              >
                {t('modal.rename.submit')}
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                {t('modal.cancel')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelRenameModal;
