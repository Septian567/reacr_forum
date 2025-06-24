import React from 'react';

const AuthForm = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      {children}
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default AuthForm;
