import React from 'react';
import { Container, Title } from '../../styles/AuthFormContainer.styles';

const AuthFormContainer = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default AuthFormContainer;
