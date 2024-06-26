import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import profanityFilter from 'leo-profanity';
import { Formik } from 'formik';
import * as yup from 'yup';

import { selectChannels } from '../../slices/channelsSlice.js';
import {
  selectIsModalShown,
  selectModalProps,
  setIsModalShown,
} from '../../slices/uiSlice.js';
import { useRenameChannelMutation } from '../../services/channels.js';

const getValidationSchema = (existingChannelNames) => yup.object().shape({
  newChannelName: yup.string()
    .trim()
    .min(3, 'minmax')
    .max(20, 'minmax')
    .required('required')
    .transform((value) => profanityFilter.clean(value))
    .notOneOf(existingChannelNames, 'channelRepeat'),
});

const InvalidFeedback = ({ validationError, networkError, t }) => {
  if (!validationError && !networkError) {
    return null;
  }
  const errorMsg = (validationError)
    ? t(`errors.${validationError}`)
    : t('errors.network');

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const ChannelRenameModal = () => {
  const channelEntities = useSelector(selectChannels);
  const { channelId, prevChannelName } = useSelector(selectModalProps);
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
    },
  ] = useRenameChannelMutation();

  const handleRenameChannel = (name) => {
    const nameProfanityFiltered = profanityFilter.clean(name);
    renameChannel({
      id: channelId,
      name: nameProfanityFiltered,
    });
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
          initialValues={{ newChannelName: prevChannelName }}
          validationSchema={getValidationSchema(existingChannelNames)}
          validateOnChange={false}
          onSubmit={({ newChannelName }) => {
            handleRenameChannel(newChannelName);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className="d-flex flex-wrap">
              <FloatingLabel
                label={t('modal.rename.inputLabel')}
                controlId="newChannelName"
                className="w-100 mb-2"
              >
                <Form.Control
                  name="newChannelName"
                  required
                  placeholder={t('modal.rename.inputLabel')}
                  value={values.newChannelName}
                  onChange={handleChange}
                  ref={textInputRef}
                  isInvalid={!isRenamingChannel && (errors.newChannelName || renameChannelError)}
                />
                <InvalidFeedback
                  validationError={errors?.newChannelName}
                  networkError={renameChannelError}
                  t={t}
                />
              </FloatingLabel>
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
