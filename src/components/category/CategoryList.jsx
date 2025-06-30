// CategoryList.jsx
import React from "react";
import { useCategory } from "../../hooks/useCategory";
import {
  CategoriesSection,
  CategoriesList,
  CategoryItem,
  CategoryContent,
  HashtagIcon,
  CategoryText,
  CategoryCount,
} from "./CategoryList.styles";

const CategoryList = ({ categories }) => {
  const { selectedCategory, toggleCategory } = useCategory();

  return (
    <CategoriesSection>
      <CategoriesList>
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;
          return (
            <CategoryItem
              key={index}
              className={isSelected ? "selected" : ""}
              onClick={() => toggleCategory(category.name)}
            >
              <CategoryContent>
                <HashtagIcon size={16} />
                <CategoryText>
                  {category.name}
                  <CategoryCount>({category.count})</CategoryCount>
                </CategoryText>
              </CategoryContent>
            </CategoryItem>
          );
        })}
      </CategoriesList>
    </CategoriesSection>
  );
};

export default CategoryList;
