import React from 'react';
import { Hash } from 'react-feather';
import '../../styles/category-list.css';
import { useCategory } from '../../hooks/useCategory';

const CategoryList = ({ categories }) => {
  const { selectedCategory, toggleCategory } = useCategory();

  return (
    <div className="categories-section">
      <div className="categories-list">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;

          return (
            <div
              key={index}
              className={`category-item ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleCategory(category.name)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-content">
                <Hash size={16} className="hashtag-icon" />
                <span className="category-text">
                  {category.name}
                  <span className="category-count">({category.count})</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
