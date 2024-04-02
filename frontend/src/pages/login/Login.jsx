import React, {
  useRef,
  useEffect,
} from 'react';
import { useLoginMutation } from '../../services/auth.js';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  username: yup.string().trim().required('required'),
  password: yup.string().required('required'),
});

const InvalidFeedback = ({ validationError, serverError, t }) => {
  if (!validationError && !serverError) {
    return null;
  }
  const serverErrorType = (serverError?.status === 401) ? 'auth' : 'network';
  const errorMsg = (validationError)
    ? t(`errors.${validationError}`)
    : t(`errors.${serverErrorType}`);

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [
    login,
    {
      isSuccess,
      isError: authFailed,
      error: loginError,
      isLoading: isLoggingIn,
    },
  ] = useLoginMutation();
  const loginHandler = (credentials) => login(credentials);

  const loginRef = useRef();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  if (isSuccess) {
    const from = location?.state?.from || '/';
    return <Navigate to={from}/>;
  }

  const handleSignupNav = () => {
    navigate('/signup')
  };

  return (
    <div className="container">
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
              <Form onSubmit={handleSubmit} className="mb-1">
                <Form.Group className="mb-3" controlId="username">
                  <FloatingLabel
                    label={t('login.username')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('login.username')}
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      ref={loginRef}
                      isInvalid={(touched.username && errors.username) || authFailed}
                    />
                    <InvalidFeedback validationError={errors.username} t={t} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={t('login.password')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="password"
                      required
                      placeholder={t('login.password')}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={(touched.password && errors.password) || authFailed}
                    />
                    <InvalidFeedback
                      validationError={errors.password}
                      serverError={loginError}
                      t={t}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={isLoggingIn}>
                    {t('login.submit')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Button
            variant="outline-primary"
            onClick={handleSignupNav}
          >
            {t('login.signup')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
