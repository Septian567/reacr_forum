import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetLoginState } from '../features/auth/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { status, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Mohon isi semua kolom!');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  // Reset error saat pertama kali masuk halaman login
  useEffect(() => {
    dispatch(resetLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/');
    }
  }, [status, user, navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Selamat Datang</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setTimeout(() => setIsPasswordFocused(false), 100)}
            style={styles.input}
          />
          {isPasswordFocused && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
              style={styles.iconButton}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          )}
        </div>

        {status === 'failed' && error && (
          <p
            style={{
              color: 'red',
              fontSize: '14px',
              textAlign: 'left',
              marginTop: '-10px',
              marginBottom: '10px',
            }}
          >
            {error.includes('401') ? 'Email atau password salah' : error}
          </p>
        )}

        <button
          type="submit"
          style={styles.button}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={styles.registerContainer}>
        <span>Belum punya akun?</span>
        <button
          onClick={() => navigate('/register')}
          style={styles.registerButton}
        >
          Register
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    width: '90%',
    margin: '100px auto',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    marginBottom: '30px',
    fontSize: '28px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '14px 20px',
    fontSize: '18px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
  },
  button: {
    padding: '14px',
    fontSize: '18px',
    borderRadius: '6px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  registerContainer: {
    marginTop: '20px',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    alignItems: 'center',
  },
  registerButton: {
    background: 'none',
    border: 'none',
    color: '#1890ff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '16px',
  },
};

export default LoginPage;
