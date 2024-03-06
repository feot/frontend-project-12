import React, {
  useRef,
  useEffect,
} from 'react';
import { useLoginMutation } from '../../services/login.js';
import { Navigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  username: yup.string().trim().required('Required'),
  password: yup.string().required('Required'),
});

const getErrorMsg = (loginError) => {
  if (loginError) {
    return (loginError.data.error === 'Unauthorized')
      ? 'Неверные имя пользователя или пароль'
      : 'Что-то пошло не так, попробуйте снова';
  }
  return null;
};

const Login = () => {
  const location = useLocation();

  const [
    login,
    { error: loginError, isLoading: isLoggingIn, isSuccess },
  ] = useLoginMutation();
  const loginHandler = (credentials) => login(credentials);

  const loginRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const authFailed = !!loginError;
  const authErrorMessage = getErrorMsg(loginError);

  if (isSuccess) {
    const from = location?.state?.from || '/';
    return <Navigate to={from}/>;
  }

  return (
    <>
      <div className="col-12 col-sm-8 col-lg-4  m-auto py-3">
        <div className="p-3 card shadow-sm">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={schema}
            onSubmit={(values) => {
              loginHandler(values);
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
                    label="username"
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="username"
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      ref={loginRef}
                      isInvalid={(touched.username && errors.username) || authFailed}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={"password"}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="password"
                      required
                      placeholder={"password"}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      ref={passRef}
                      isInvalid={(touched.password && errors.password) || authFailed}
                    />
                    {authErrorMessage && <div className="text-center invalid-feedback">{authErrorMessage}</div>}
                  </FloatingLabel>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" type="submit" disabled={isLoggingIn}>
                    Войти
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Login;
