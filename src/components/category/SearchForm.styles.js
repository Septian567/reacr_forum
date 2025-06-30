// SearchForm.styles.js
import styled from "styled-components";
import { Search } from "react-feather";

export const SearchContainer = styled.div`
  margin-bottom: 25px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.3);
    background: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 675px) {
    display: none;
  }
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  color: #6c757d;
  opacity: 0.8;

  @media (max-width: 675px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: none;
  background: transparent;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  @media (max-width: 675px) {
    display: none;
    padding: 8px 12px 8px 36px;
  }
`;
