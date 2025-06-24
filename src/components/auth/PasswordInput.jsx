import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
  isFocused,
  setIsFocused,
}) => {
  return (
    <div style={styles.passwordContainer}>
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        style={styles.input}
      />
      {isFocused && (
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
  );
};

const styles = {
  passwordContainer: {
    position: 'relative',
  },
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
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
};

export default PasswordInput;
