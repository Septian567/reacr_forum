import React from 'react';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
} from '../../styles/SearchForm.styles'; // Sesuaikan path jika diperlukan

const SearchForm = ({ searchQuery, setSearchQuery }) => {
  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon size={18} />
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default SearchForm;
