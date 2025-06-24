import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useThreadDetail from '../hooks/useThreadDetail';

import DetailSkeleton from '../components/detailPage/DetailSkeleton';
import PostHeader from '../components/detailPage/PostHeader';
import PostItem from '../components/detailPage/PostItem';
import CommentForm from '../components/detailPage/CommentForm';
import CommentList from '../components/detailPage/CommentList';
import LoadingBar from 'react-top-loading-bar';

import '../styles/detailPage.css';
import '../styles/postList.css';
import '../styles/CommentForm.css';
import '../styles/CommentList.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    thread,
    user,
    loading,
    progress,
    comment,
    setComment,
    setProgress,
    getUserProfilePhoto,
    handleAddComment,
    handleVotePost,
    handleVoteComment,
  } = useThreadDetail(id);

  if (loading || !thread) {
    return (
      <div className="column center main-grid detail-page-container">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <PostHeader onBack={() => navigate(-1)} author="" />
        <DetailSkeleton />
      </div>
    );
  }

  return (
    <div className="column center main-grid detail-page-container">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <PostHeader onBack={() => navigate(-1)} author={thread.owner.name} />
      <PostItem
        post={thread}
        onVote={handleVotePost}
        getPhoto={getUserProfilePhoto}
      />
      {user && (
        <CommentForm
          author={thread.owner.name}
          comment={comment}
          setComment={setComment}
          onSubmit={handleAddComment}
          getPhoto={getUserProfilePhoto}
        />
      )}
      <CommentList
        comments={thread.comments}
        onVote={handleVoteComment}
        getPhoto={getUserProfilePhoto}
      />
    </div>
  );
};

export default DetailPage;
