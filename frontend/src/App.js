import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { io } from 'socket.io-client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import profanityFilter from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import i18nInstance from './i18next.js';

import { selectIsAuthenticated, logout } from './slices/authSlice.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

import ModalContext from './ModalContext.js';
import MainPage from './pages/main/Main.jsx';
import LoginPage from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import NotFoundPage from './pages/NotFound.jsx';

const profanityFilterInit = () => {
  profanityFilter.list();
  profanityFilter.clearList();
  profanityFilter.add(profanityFilter.getDictionary('en'));
  profanityFilter.add(profanityFilter.getDictionary('ru'));
  profanityFilter.list();
};

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

  useEffect(() => {
    const socket = io();

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });

    profanityFilterInit();
  }, [dispatch]);

  return (
    <ModalContext.Provider value={setModal}>
      <BrowserRouter>
        <I18nextProvider i18n={i18nInstance}>
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
                  element={<LoginPage />}
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
        </I18nextProvider>
        <ToastContainer />
      </BrowserRouter>
    </ModalContext.Provider>
  );
};

export default App;
