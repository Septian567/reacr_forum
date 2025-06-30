import React from "react";
import { Container, Title } from "./AuthFormContainer.styles"; // Sesuaikan path jika perlu

const AuthFormContainer = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default AuthFormContainer;
