import React from 'react';
import '../styles/columns.css';
import PostForm from '../components/mainPage/PostForm';
import PostList from '../components/mainPage/PostList';
import PostSkeleton from '../components/mainPage/PostSkeleton';
import LoadingBar from 'react-top-loading-bar';
import useMainPage from '../hooks/useMainPage';

const MainPage = () => {
  const {
    progress,
    setProgress,
    user,
    posts,
    selectedCategory,
    handleAddPost,
    handleVote,
  } = useMainPage();

  return (
    <div className="column center main-grid">
      <LoadingBar
        color="#f11946"
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />

      {user && <PostForm onPost={handleAddPost} />}

      {selectedCategory && (
        <div style={{ marginBottom: '10px' }}>
          <strong>kategori:</strong> #{selectedCategory}
        </div>
      )}

      {posts && posts.length > 0 ? (
        <PostList posts={posts} onVote={handleVote} userId={user?.id} />
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
