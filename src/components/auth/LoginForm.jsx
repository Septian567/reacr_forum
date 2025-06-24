// src/components/LoginForm.jsx
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginForm.css';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isPasswordFocused,
  setIsPasswordFocused,
  handleSubmit,
  status,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setTimeout(() => setIsPasswordFocused(false), 100)}
          className="login-input"
        />
        {isPasswordFocused && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            className="icon-button"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>

      {status === 'failed' && error && (
        <p className="error-text">
          {error.includes('401') ? 'Email atau password salah' : error}
        </p>
      )}

      <button
        type="submit"
        className="login-button"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </button>

      <div className="register-container">
        <span>Belum punya akun?</span>
        <button
          onClick={() => navigate('/register')}
          className="register-button"
          type="button"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
