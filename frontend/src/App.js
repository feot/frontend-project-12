import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, logout } from './slices/authSlice.js';
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

import MainPage from './pages/main/Main.jsx';
import LoginPage from './pages/login/Login.jsx';
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

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <header className="shadow-sm">
          <Navbar bg="white" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/">Chat</Navbar.Brand>
              {isAuthenticated && <Button onClick={() => dispatch(logout())}>Выйти</Button>}
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
              path="/"
              element={(
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
