import React from 'react';
import '../../styles/NavSection.css';
import PostModal from './PostModal';
import usePostModal from '../../hooks/usePostModal';

import NavLinks from './NavLinks';
import AuthButton from './AuthButton';
import PostButton from './PostButton';

const NavSection = () => {
  const {
    showModal,
    setShowModal,
    postTitle,
    setPostTitle,
    postContent,
    setPostContent,
    category,
    setCategory,
    handleLogout,
    handlePost,
    user,
  } = usePostModal();

  return (
    <>
      <div className="nav-section">
        <NavLinks />
        <AuthButton user={user} onLogout={handleLogout} />
        {user && <PostButton onClick={() => setShowModal(true)} />}
      </div>

      {showModal && (
        <PostModal
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postContent={postContent}
          setPostContent={setPostContent}
          category={category}
          setCategory={setCategory}
          onClose={() => setShowModal(false)}
          onPost={handlePost}
          user={user}
        />
      )}
    </>
  );
};

export default NavSection;
