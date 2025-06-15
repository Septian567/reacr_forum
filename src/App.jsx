import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import ThreadsPage from './pages/MainPage';
import Category from './pages/Category';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/user/:username" element={<DetailPage />} />
          <Route path="/post/:id" element={<DetailPage />} />
        </Routes>
        <Category />
      </div>
    </Router>
  );
}

export default App;
