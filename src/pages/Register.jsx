import React from 'react';
import useRegisterForm from '../hooks/useRegisterForm';
import AuthFormContainer from '../components/auth/AuthFormContainer';
import AuthForm from '../components/auth/AuthForm';
import PasswordInput from '../components/auth/PasswordInput';
import AuthFooter from '../components/auth/AuthFooter';

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
    <AuthFormContainer title="Daftar Akun Baru">
      <AuthForm onSubmit={handleSubmit}>
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

        <PasswordInput
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isFocused={isPasswordFocused}
          setIsFocused={setIsPasswordFocused}
        />

        <PasswordInput
          name="confirmPassword"
          placeholder="Konfirmasi Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPassword={showConfirm}
          setShowPassword={setShowConfirm}
          isFocused={isConfirmFocused}
          setIsFocused={setIsConfirmFocused}
        />

        <button type="submit" style={styles.button} disabled={registerLoading}>
          {registerLoading ? 'Mendaftarkan...' : 'Daftar'}
        </button>

        <AuthFooter
          text="Sudah punya akun?"
          buttonText="Login di sini"
          onClick={() => navigate('/login')}
        />
      </AuthForm>
    </AuthFormContainer>
  );
};

const styles = {
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
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
};

export default RegisterPage;
