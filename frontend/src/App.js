import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Container,
  Navbar,
  Button,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalContext from './ModalContext.js';
import { selectIsAuthenticated, logout } from './slices/authSlice.js';

import MainPage from './pages/main/Main.jsx';
import LoginPage from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import NotFoundPage from './pages/NotFound.jsx';

const PrivateRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();

  return (
    isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { t } = useTranslation();

  const [Modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={setModal}>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <header className="shadow-sm">
            <Navbar bg="white" expand="lg">
              <Container>
                <Navbar.Brand as={Link} to="/">{t('header.logo')}</Navbar.Brand>
                {isAuthenticated && <Button onClick={() => dispatch(logout())}>{t('header.logout')}</Button>}
              </Container>
            </Navbar>
          </header>

          <main className="d-flex align-items-center h-100 py-3 overflow-hidden">
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/"
                element={(
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <MainPage />
                  </PrivateRoute>
                )}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
        {Modal}
        <ToastContainer />
      </BrowserRouter>
    </ModalContext.Provider>
  );
};

export default App;
