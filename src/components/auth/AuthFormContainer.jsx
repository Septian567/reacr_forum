import React from 'react';

const AuthFormContainer = ({ title, children }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      {children}
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
};

export default AuthFormContainer;
