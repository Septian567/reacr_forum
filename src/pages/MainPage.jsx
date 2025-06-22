import React, { useEffect, useState } from "react";
import "../styles/columns.css";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import LoadingBar from "react-top-loading-bar";
import {useDispatch,useSelector} from "react-redux";
import PostSkeleton from "../components/PostSkeleton";
import { fetchUserProfile } from "../features/auth/authSlice";
import {
  fetchPostsAndUsers,
  addNewPost,
  votePost,
  selectFilteredPosts,
  selectSelectedCategory,
} from "../features/posts/postSlice";

const MainPage = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const posts = useSelector(selectFilteredPosts);
  const selectedCategory = useSelector(selectSelectedCategory);

  useEffect(() => {
    setProgress(30);

    const loadData = async () => {
      try {
        await dispatch(fetchUserProfile()).unwrap();
      } catch (err) {
        console.warn("Tidak login, lewati ambil profil user:", err.message);
      }

      try {
        await dispatch(fetchPostsAndUsers()).unwrap();
      } catch (err) {
        console.warn("Gagal ambil data post/user:", err.message);
      } finally {
        setProgress(100);
      }
    };

    loadData();

    const handleLogout = () => {
      // Redux sudah handle state auth
    };

    window.addEventListener("userLoggedOut", handleLogout);
    return () => {
      window.removeEventListener("userLoggedOut", handleLogout);
      setProgress(0);
    };
  }, [dispatch]);

  const handleAddPost = (newPost) => {
    dispatch(addNewPost(newPost));
  };

  const handleVote = (postId, type) => {
    dispatch(votePost({ postId, type }));
  };

  return (
    <div className="column center main-grid">
      <LoadingBar
        color="#f11946"
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Tampilkan form hanya jika sudah login */}
      {user && <PostForm onPost={handleAddPost} />}

      {selectedCategory && (
        <div style={{ marginBottom: "10px" }}>
          <strong>kategori:</strong> #{selectedCategory}
        </div>
      )}

      {/* Tampilkan PostList meskipun belum login */}
      {posts && posts.length > 0 ? (
        <PostList posts={posts} onVote={handleVote} />
      ) : (
        <>
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default MainPage;
