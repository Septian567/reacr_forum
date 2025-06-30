// PasswordInput.styles.js
import styled from "styled-components";

export const PasswordContainer = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  padding: 14px 16px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
`;
