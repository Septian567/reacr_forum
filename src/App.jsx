// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './states/index';
import Menu from './pages/Menu';
import Leaderboard from './pages/Leaderboard';
import ThreadsPage from './pages/MainPage';
import Category from './pages/Category';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

// Komponen terpisah untuk bisa pakai useLocation setelah Router
function AppContent() {
  const location = useLocation();
  const hideLayout =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="container">
      {!hideLayout && <Menu />}
      <Routes>
        <Route path="/" element={<ThreadsPage />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      {!hideLayout && <Category />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
