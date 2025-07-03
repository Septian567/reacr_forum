// PostForm.styled.js

import styled from 'styled-components';

export const PostFormWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
`;

export const ProfileWrapper = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CircleIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: greenyellow;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
`;

export const FormFields = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 6px;
  background: white;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 6px;
  background: white;
  resize: vertical;
  min-height: 60px;
`;

export const SubmitAction = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  background-color: #3a86ff;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #2a76ef;
  }
`;

export const BtnText = styled.span``;

export const BtnIcon = styled.span`
  display: none;
`;
