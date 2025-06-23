// containers/CategoryListContainer.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../features/posts/postSlice";
import CategoryList from "../components/CategoryList";

const CategoryListContainer = ({ categories }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleSelectCategory = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
  };

  return (
    <CategoryList
      categories={categories}
      selectedCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default CategoryListContainer;
