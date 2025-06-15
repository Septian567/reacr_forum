import React from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { usePostContext } from "../contexts/PostContext";

const MainPage = () => {
  const { posts, addPost, votePost, deleteAllPosts, selectedCategory } =
    usePostContext();

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  return (
    <div className="column center main-grid">
      <PostForm onPost={addPost} />

      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <button
          onClick={deleteAllPosts}
          style={{
            backgroundColor: "#ff4d4f",
            border: "none",
            padding: "8px 16px",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete All Posts
        </button>
      </div>

      {selectedCategory && (
        <div style={{ marginBottom: "10px" }}>
          <strong>kategori:</strong> #{selectedCategory}
        </div>
      )}

      <PostList posts={filteredPosts} onVote={votePost} />
    </div>
  );
};

export default MainPage;
