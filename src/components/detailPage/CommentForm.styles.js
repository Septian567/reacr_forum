// styles/CommentForm.styles.js
import styled from "styled-components";

export const CommentFormWrapper = styled.form`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const FormInnerWrapper = styled.div`
  flex: 1;
`;

export const ReplyLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  display: block;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #147dd8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
