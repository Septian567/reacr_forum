// src/components/AuthButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut } from 'react-feather';

const AuthButton = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return user ? (
    <div className="nav-item" onClick={onLogout} style={{ cursor: 'pointer' }}>
      <LogOut size={20} className="nav-icon" />
      <span className="nav-text">Logout</span>
    </div>
  ) : (
    <div
      className="nav-item"
      onClick={() => navigate('/login')}
      style={{ cursor: 'pointer' }}
    >
      <LogIn size={20} className="nav-icon" />
      <span className="nav-text">Login</span>
    </div>
  );
};

export default AuthButton;
