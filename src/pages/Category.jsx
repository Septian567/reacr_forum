import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import CategoryList from "../components/CategoryList";

const Category = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy post list (biasanya ini berasal dari props, context, atau fetch)
  const posts = [
    { id: 1, category: "React", content: "Post 1" },
    { id: 2, category: "Redux", content: "Post 2" },
    { id: 3, category: "React", content: "Post 3" },
    { id: 4, category: "Javascript", content: "Post 4" },
    { id: 5, category: "Redux", content: "Post 5" },
  ];

  // Hitung jumlah post per kategori
  const categoryMap = posts.reduce((acc, post) => {
    const key = post.category;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Ubah ke format array
  const categories = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
  }));

  // Filter kategori berdasarkan pencarian
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
