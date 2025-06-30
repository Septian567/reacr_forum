import styled, { keyframes } from "styled-components";

export const PostSkeletonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const SkeletonAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
`;

export const SkeletonContent = styled.div`
  flex: 1;
`;

export const SkeletonLine = styled.div`
  height: 12px;
  background: #ddd;
  margin-bottom: 8px;
  border-radius: 6px;
  width: ${({ className }) => (className === "short" ? "30%" : "100%")};
`;

export const SkeletonActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const SkeletonButton = styled.div`
  width: 24px;
  height: 24px;
  background: #ccc;
  border-radius: 6px;
`;
