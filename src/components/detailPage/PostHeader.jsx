import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "react-feather";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  position: relative;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
  color: #3a86ff;
  font-weight: 500;
  margin-bottom: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const BackText = styled.span`
  font-size: 1rem;
`;

const PostHeader = ({ onBack }) => (
  <HeaderWrapper>
    <BackButton onClick={onBack}>
      <ArrowLeft size={18} />
      <BackText>Back</BackText>
    </BackButton>
  </HeaderWrapper>
);

export default PostHeader;
