import React from 'react';
import { Search } from 'react-feather';
import '../../styles/search-form.css';

const SearchForm = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchForm;
