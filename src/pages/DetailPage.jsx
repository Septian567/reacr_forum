import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useThreadDetail from '../hooks/useThreadDetail';

import DetailSkeleton from '../components/detailPage/DetailSkeleton';
import PostHeader from '../components/detailPage/PostHeader';
import PostItem from '../components/detailPage/PostItem';
import CommentForm from '../components/detailPage/CommentForm';
import CommentList from '../components/detailPage/CommentList';
import LoadingBar from 'react-top-loading-bar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  gap: 8px;
`;

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
      <Container className="main-grid column center">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <PostHeader onBack={() => navigate(-1)} author="" />
        <DetailSkeleton />
      </Container>
    );
  }

  return (
    <Container className="main-grid column center">
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
    </Container>
  );
};

export default DetailPage;
