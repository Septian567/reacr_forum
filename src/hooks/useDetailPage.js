import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const useDetailPage = () => {
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
        upvotes: 0,
        downvotes: 0,
      };

      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
      setComment("");

      const updatedPost = { ...post, comments: post.comments + 1 };
      setPost(updatedPost);

      const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = allPosts.map((p) =>
        p.id.toString() === id ? updatedPost : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
  };

  const handleVoteComment = (commentId, type) => {
    const updatedComments = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          upvotes: type === "up" ? c.upvotes + 1 : c.upvotes,
          downvotes: type === "down" ? c.downvotes + 1 : c.downvotes,
        };
      }
      return c;
    });

    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const handlePostVote = (type) => {
    const updatedPost = {
      ...post,
      upvotes: type === "up" ? post.upvotes + 1 : post.upvotes,
      downvotes: type === "down" ? post.downvotes + 1 : post.downvotes,
    };

    setPost(updatedPost);

    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = allPosts.map((p) =>
      p.id.toString() === id ? updatedPost : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return {
    post,
    comment,
    setComment,
    comments,
    handleAddComment,
    handleVoteComment,
    handlePostVote,
    navigate,
  };
};

export default useDetailPage;
