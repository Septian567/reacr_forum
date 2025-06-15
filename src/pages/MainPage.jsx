import React from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import useMainPage from "../hooks/useMainPage"; // pastikan path benar

const MainPage = () => {
  const { posts, handlePost, handleVote, handleDeleteAll } = useMainPage();

  return (
    <div className="column center main-grid">
      <PostForm onPost={handlePost} />

      <div style={{ marginBottom: "15px", textAlign: "right" }}>
        <button
          onClick={handleDeleteAll}
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

      <PostList posts={posts} onVote={handleVote} />
    </div>
  );
};

export default MainPage;
