import React from "react";
import { FooterContainer, LinkButton } from "./AuthFooter.styles"; // Sesuaikan path

const AuthFooter = ({ text, buttonText, onClick }) => {
  return (
    <FooterContainer>
      <span>{text}</span>
      <LinkButton onClick={onClick}>{buttonText}</LinkButton>
    </FooterContainer>
  );
};

export default AuthFooter;
