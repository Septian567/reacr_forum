import React from "react";
import { Hash } from "react-feather";
import "../styles/category-list.css";
import { usePostContext } from "../contexts/PostContext"; // ⬅️ gunakan context

const CategoryList = ({ categories }) => {
  const { selectedCategory, toggleCategoryFilter } = usePostContext();

  return (
    <div className="categories-section">
      <div className="categories-list">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;

          return (
            <div
              key={index}
              className={`category-item ${isSelected ? "selected" : ""}`}
              onClick={() => toggleCategoryFilter(category.name)}
              style={{ cursor: "pointer" }}
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
