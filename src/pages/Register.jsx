// src/pages/RegisterPage.jsx
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import useRegisterForm from '../hooks/useRegisterForm';

const RegisterPage = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmFocused,
    setIsConfirmFocused,
    registerLoading,
    navigate,
  } = useRegisterForm();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daftar Akun Baru</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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

        <div style={styles.passwordContainer}>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsConfirmFocused(true)}
            onBlur={() => setTimeout(() => setIsConfirmFocused(false), 100)}
            style={styles.input}
          />
          {isConfirmFocused && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowConfirm((prev) => !prev);
              }}
              style={styles.iconButton}
            >
              {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          )}
        </div>

        <button type="submit" style={styles.button} disabled={registerLoading}>
          {registerLoading ? 'Mendaftarkan...' : 'Daftar'}
        </button>

        <div style={styles.footer}>
          <span>Sudah punya akun?</span>
          <button onClick={() => navigate('/login')} style={styles.linkButton}>
            Login di sini
          </button>
        </div>
      </form>
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
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  passwordContainer: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '6px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '20px',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    alignItems: 'center',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default RegisterPage;
