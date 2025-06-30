// LoginForm.styles.js
import styled from "styled-components";

export const LoginFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LoginInput = styled.input`
  padding: 14px 20px;
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const PasswordContainer = styled.div`
  position: relative;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
`;

export const LoginButton = styled.button`
  padding: 14px;
  font-size: 18px;
  border-radius: 6px;
  background-color: #1890ff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1678d4;
  }
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const RegisterContainer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
`;

export const RegisterButton = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 16px;

  &:hover {
    color: #0f65c4;
  }
`;
