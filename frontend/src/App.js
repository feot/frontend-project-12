import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main.jsx';
import Login from './pages/login/Login.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
