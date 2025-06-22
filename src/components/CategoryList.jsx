import React from "react";
import { Hash } from "react-feather";
import "../styles/category-list.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../features/posts/postSlice";

const CategoryList = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleToggle = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
  };

  return (
    <div className="categories-section">
      <div className="categories-list">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;

          return (
            <div
              key={index}
              className={`category-item ${isSelected ? "selected" : ""}`}
              onClick={() => handleToggle(category.name)}
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
