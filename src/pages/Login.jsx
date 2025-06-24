// src/pages/LoginPage.jsx
import React from 'react';
import useLoginForm from '../hooks/useLoginForm';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const formProps = useLoginForm();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Selamat Datang</h2>
      <LoginForm {...formProps} />
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
};

export default LoginPage;
