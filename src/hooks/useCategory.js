// src/hooks/useCategory.js
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedCategory,
  setSelectedCategory,
} from '../features/posts/postSlice';

export const useCategory = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);

  const toggleCategory = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
  };

  return {
    selectedCategory,
    toggleCategory,
  };
};
