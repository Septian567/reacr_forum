import React from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { usePostContext } from "../contexts/PostContext";

const MainPage = () => {
  const { posts, addPost, votePost, deleteAllPosts } = usePostContext();

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

      <PostList posts={posts} onVote={votePost} />
    </div>
  );
};

export default MainPage;
