import React, {
  useRef,
  useEffect,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup'
import { useSignupMutation } from '../../services/auth.js';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  username: yup.string().trim()
    .min(3, 'minmax')
    .max(20, 'minmax')
    .required('required'),
  password: yup.string()
    .min(6, 'passwordMin')
    .required('required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'confirmPass')
    .required('required'),
});

const InvalidFeedback = ({ validationError, serverError, t }) => {
  if (!validationError && !serverError) {
    return null;
  }
  const serverErrorType = (serverError?.status === 409) ? 'userExists' : 'network';
  const errorMsg = (validationError)
    ? t(`errors.${validationError}`)
    : t(`errors.${serverErrorType}`);

  return <div className="invalid-feedback text-center w-100 mb-2">{errorMsg}</div>;
};

const Signup = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
                    label={t('signup.username')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t('signup.username')}
                      id="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      ref={usernameRef}
                      isInvalid={(touched.username && errors.username) || signupFailed}
                    />
                    <InvalidFeedback validationError={errors.username} t={t} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={t('signup.password')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder={t('signup.password')}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={(touched.password && errors.password) || signupFailed}
                    />
                    <InvalidFeedback validationError={errors.password} t={t} />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <FloatingLabel
                    label={t('signup.confirmPassword')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder={t('signup.confirmPassword')}
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
                      t={t}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" type="submit" disabled={isSigningUp}>
                    {t('signup.submit')}
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
