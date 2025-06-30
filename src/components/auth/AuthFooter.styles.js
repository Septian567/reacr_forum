// AuthFooter.styles.js
import styled from "styled-components";

export const FooterContainer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
`;

export const LinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #0056b3;
  }
`;
