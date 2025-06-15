import React from 'react';
import { Hash } from 'react-feather';
import '../styles/category-list.css';

const CategoryList = ({ categories }) => {
  return (
    <div className="categories-section">
      <div className="categories-list">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-content">
              <Hash size={16} className="hashtag-icon" />
              <span className="category-text">
                {category.name}
                <span className="category-count">({category.count})</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
