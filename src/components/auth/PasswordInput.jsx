import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
  PasswordContainer,
  StyledInput,
  IconButton,
} from '../../styles/PasswordInput.styles';
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
    <PasswordContainer>
      <StyledInput
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
      />
      {isFocused && (
        <IconButton
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </IconButton>
      )}
    </PasswordContainer>
  );
};

export default PasswordInput;
