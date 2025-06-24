import React, { useState } from 'react';
import SearchForm from '../components/category/SearchForm';
import CategoryList from '../components/category/CategoryList'; // GANTI IMPORT
import { useSelector } from 'react-redux';
import { selectAllPosts } from '../states/posts/reducer';

const Category = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const posts = useSelector(selectAllPosts);

  const categoryMap = posts.reduce((acc, post) => {
    const key = post.category;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
  }));

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="column right glassmorphism">
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CategoryList categories={filteredCategories} />
    </div>
  );
};

export default Category;
