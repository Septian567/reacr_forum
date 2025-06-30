// src/components/LoginForm.jsx
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  LoginFormWrapper,
  LoginInput,
  PasswordContainer,
  IconButton,
  LoginButton,
  ErrorText,
  RegisterContainer,
  RegisterButton,
} from "./LoginForm.styles";

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
    <LoginFormWrapper onSubmit={handleSubmit}>
      <LoginInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordContainer>
        <LoginInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setTimeout(() => setIsPasswordFocused(false), 100)}
        />
        {isPasswordFocused && (
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

      {status === "failed" && error && (
        <ErrorText>
          {error.includes("401") ? "Email atau password salah" : error}
        </ErrorText>
      )}

      <LoginButton type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </LoginButton>

      <RegisterContainer>
        <span>Belum punya akun?</span>
        <RegisterButton type="button" onClick={() => navigate("/register")}>
          Register
        </RegisterButton>
      </RegisterContainer>
    </LoginFormWrapper>
  );
};

export default LoginForm;
