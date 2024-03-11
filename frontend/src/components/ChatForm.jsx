import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  text: yup.string().trim().required('Required'),
});

const ChatForm = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
  };

  const loginRef = useRef();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ text }}
      validationSchema={schema}
    >
      {({
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className="d-flex gap-1 p-3">
          <Form.Control
            name="text"
            required
            placeholder="Введите сообщение"
            id="text"
            value={text}
            onChange={handleChange}
            ref={loginRef}
          />
          <Button variant="outline-primary" type="submit" disabled={isSubmitting}>
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatForm;
