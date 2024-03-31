import React, {
  useRef,
  useEffect,
} from 'react';
import { useSignupMutation } from '../../services/auth.js';
import { Navigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  username: yup.string().trim()
    .min(3, 'min3')
    .max(20, 'max20')
    .required('required'),
  password: yup.string()
    .min(6, 'min6')
    .required('required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'confirmPass')
    .required('required'),
});

const InvalidFeedback = ({ validationError, serverError }) => {
  if (!validationError && !serverError) {
    return null;
  }

  const errorMsg = (() => {
    if (validationError === 'min3') {
      return 'Не меньше 3 символов';
    } else if (validationError === 'min6') {
      return 'Не меньше 6 символов';
    } else if (validationError === 'max20') {
      return 'Не больше 20 символов';
    } else if (validationError === 'confirmPass') {
      return 'Пароли должны совпадать';
    } else if (validationError === 'required') {
      return 'Поле не может быть пустым';
    } else if (serverError?.status === 409) {
      return 'Пользователь с таким именем уже есть';
    }
    return 'Что-то пошло не так, попробуйте снова';
  })();

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const Signup = () => {
  const location = useLocation();

  const [
    signup,
    {
      isError: signupFailed,
      error: signupError,
      isLoading: isSigningUp,
      isSuccess: signedUp
    },
  ] = useSignupMutation();
  const signupHandler = (credentials) => signup(credentials);

  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  if (signedUp) {
    const from = location?.state?.from || '/';
    return <Navigate to={from}/>;
  }

  return (
    <div className="container">
      <div className="col-12 col-sm-8 col-lg-4  m-auto py-3">
        <div className="p-3 card shadow-sm">
          <Formik
            initialValues={{
              username: '',
              password: '', 
              confirmPassword: '', 
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              signupHandler(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <FloatingLabel
                    label="Логин"
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Логин"
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      ref={usernameRef}
                      isInvalid={(touched.username && errors.username) || signupFailed}
                    />
                    <InvalidFeedback validationError={errors.username} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={"Пароль"}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder={"Пароль"}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={(touched.password && errors.password) || signupFailed}
                    />
                    <InvalidFeedback validationError={errors.password} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={"Подтвердите пароль"}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder={"Подтвердите пароль"}
                      id="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      isInvalid={
                        (touched.confirmPassword && errors.confirmPassword) || signupFailed
                      }
                    />
                    <InvalidFeedback
                      validationError={errors.confirmPassword}
                      serverError={signupError}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" type="submit" disabled={isSigningUp}>
                    Зарегистрироваться
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signup;
