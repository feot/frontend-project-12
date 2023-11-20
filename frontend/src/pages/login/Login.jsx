import React, {
  useRef,
  useEffect,
} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'

import Header from '../../components/Header.jsx';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const Login = () => {
  const loginRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    loginRef.current.focus();
  }, [])

  return (
    <>
      <Header />
      <div className="container h-100 py-3">
        <div className="d-flex h-100">
          <div className="col-12 col-sm-8 col-lg-4  m-auto">
            <div className="p-3 card shadow-sm">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                validateOnChange="false"
                onSubmit={(values) => {
                  console.log('Submitting the form with data:', values);
                }}
              >
                {({
                  values,
                  isValid,
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
                          className={touched.username && !isValid && 'is-invalid'}
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
                          className={touched.password && !isValid && 'is-invalid'}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" type="submit">
                        Войти
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
