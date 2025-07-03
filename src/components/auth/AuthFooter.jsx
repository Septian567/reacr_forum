import React from 'react';
import { FooterContainer, LinkButton } from '../../styles/AuthFooter.styles';

const AuthFooter = ({ text, buttonText, onClick }) => {
  return (
    <FooterContainer>
      <span>{text}</span>
      <LinkButton onClick={onClick}>{buttonText}</LinkButton>
    </FooterContainer>
  );
};

export default AuthFooter;
