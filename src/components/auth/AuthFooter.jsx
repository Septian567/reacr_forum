import React from 'react';

const AuthFooter = ({ text, buttonText, onClick }) => {
  return (
    <div style={styles.footer}>
      <span>{text}</span>
      <button onClick={onClick} style={styles.linkButton}>
        {buttonText}
      </button>
    </div>
  );
};

const styles = {
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

export default AuthFooter;
