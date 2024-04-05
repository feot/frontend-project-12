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

import { selectChannels } from '../slices/channelsSlice.js';
import { selectIsModalShown, setIsModalShown } from '../slices/uiSlice.js';
import { useAddChannelMutation } from '../services/channels.js';

const getValidationSchema = (existingChannelNames) => yup.object().shape({
  channelName: yup.string()
    .trim()
    .min(3, 'minmax')
    .max(20, 'minmax')
    .required('required')
    .notOneOf(existingChannelNames, 'channelRepeat')
    .test(
      'notExpletive',
      'profanity',
      (value) => profanityFilter.check(value) === false,
    ),
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

const ChannelAddModal = () => {
  const channelEntities = useSelector(selectChannels);
  const isModalShown = useSelector(selectIsModalShown);
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const { t } = useTranslation();
  const existingChannelNames = Object.values(channelEntities).map(({ name }) => name);
  const [
    addChannel,
    {
      error: addingChannelError,
      isLoading: isAddingChannel,
    }
  ] = useAddChannelMutation();

  const handleAddChannel = (name) => {
    const nameProfanityFiltered = profanityFilter.clean(name);
    console.log({ nameProfanityFiltered });
    addChannel({ name: nameProfanityFiltered });
  };

  const handleClose = () => dispatch(setIsModalShown(false));

  useEffect(() => {
    textInputRef.current.focus();
  }, [isModalShown]);

  return (
    <Modal show={isModalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          validationSchema={getValidationSchema(existingChannelNames)}
          validateOnChange={false}
          onSubmit={({ channelName }) => {
            handleAddChannel(channelName);
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
                label={t('modal.add.inputLabel')}
                controlId="channelName"
                className="w-100 mb-2"
              >
                <Form.Control
                  name="channelName"
                  required
                  placeholder={t('modal.add.inputLabel')}
                  value={values.channelName}
                  onChange={handleChange}
                  ref={textInputRef}
                  isInvalid={!isAddingChannel && (errors.channelName || addingChannelError)}
                />
                <InvalidFeedback
                  validationError={errors?.channelName}
                  networkError={addingChannelError}
                  t={t}
                />
              </FloatingLabel>
              <Button
                variant="primary"
                type="submit"
                disabled={isAddingChannel}
                className="ms-auto me-1"
              >
                {t('modal.add.submit')}
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

export default ChannelAddModal;
