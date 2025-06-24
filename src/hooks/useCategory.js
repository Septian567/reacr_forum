import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedCategory,
  setSelectedCategory,
} from '../states/posts/reducer';

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
