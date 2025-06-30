import React from "react";
import { StyledForm } from "./AuthForm.styles"; // Pastikan path sesuai

const AuthForm = ({ onSubmit, children }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default AuthForm;
