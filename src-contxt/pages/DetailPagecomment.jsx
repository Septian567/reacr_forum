import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostHeader from "../components/PostHeader";
import PostContent from "../components/PostContent";
import PostActions from "../components/PostActions";
import ProfilePhoto from "../components/ProfilePhoto";
import "../styles/detailPage.css";
import "../styles/postList.css";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      try {
        const posts = JSON.parse(storedPosts);
        const foundPost = posts.find((p) => p.id.toString() === id);
        setPost(foundPost || null);

        // Ambil komentar dari localStorage
        const storedComments = localStorage.getItem(`comments-${id}`);
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
      } catch (error) {
        console.error("Gagal parsing data dari localStorage", error);
      }
    }
  }, [id]);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: "Kamu",
        content: comment.trim(),
        date: new Date().toISOString(),
      };

      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
      setComment("");

      // Perbarui jumlah komentar di post
      const updatedPost = { ...post, comments: post.comments + 1 };
      setPost(updatedPost);

      const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = allPosts.map((p) =>
        p.id.toString() === id ? updatedPost : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}.${minutes}`;
    const day = date.getDate();
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    return `${time} ${day} ${month} ${year}`;
  };

  if (!post) {
    return (
      <div className="column center main-grid detail-page-container">
        <PostHeader onBack={() => navigate(-1)} author="" />
        <p>Postingan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="column center main-grid detail-page-container">
      <PostHeader onBack={() => navigate(-1)} author={post.author} />
      <div className="post-item">
        <ProfilePhoto />
        <div className="post-content-wrapper">
          <PostContent
            category={post.category}
            content={post.content}
            date={post.date}
          />
          <PostActions
            comments={post.comments}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />

          {/* Form Komentar */}
          <div className="comment-form" style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
              Replying to @{post.author}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis komentar Anda..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Kirim Komentar
            </button>
          </div>

          {/* Daftar Komentar */}
          <div className="comment-list" style={{ marginTop: "30px" }}>
            <h4>Komentar:</h4>
            {comments.length === 0 ? (
              <p>Belum ada komentar.</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    borderTop: "1px solid #eee",
                    padding: "10px 0",
                  }}
                >
                  <strong>{c.author}</strong>{" "}
                  <span style={{ color: "#888", fontSize: "0.85em" }}>
                    • {formatDate(c.date)}
                  </span>
                  <p style={{ marginTop: "4px" }}>{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
