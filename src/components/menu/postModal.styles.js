// PostModalStyles.js
import styled, { keyframes } from "styled-components";

// Optional smooth fade-in
const fadeInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  padding-top: 60px;
`;

export const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const ModalNoBackdrop = styled(Modal)`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
`;

export const ModalInner = styled.div`
  padding: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProfilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
`;

export const ProfileIconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Username = styled.span`
  font-weight: bold;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const ModalTextarea = styled.textarea`
  min-height: 100px;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
`;

export const ModalPostButton = styled.button`
  background-color: #1890ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
`;
