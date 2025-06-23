import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailSkeleton from '../components/DetailSkeleton';
import PostHeader from '../components/PostHeader';
import PostItem from '../components/PostItem';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import LoadingBar from 'react-top-loading-bar';

import {
  fetchThreadDetail,
  fetchAllUsers,
  voteThread,
  voteComment,
  createComment,
} from '../features/thread/threadSlice';

import api from '../utils/api';
import '../styles/detailPage.css';
import '../styles/postList.css';
import '../styles/CommentForm.css';
import '../styles/CommentList.css';
// Main DetailPage Component
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);

  const {
    threadDetail: thread,
    users,
    loading,
  } = useSelector((state) => state.thread);

  useEffect(() => {
    setProgress(30);
    dispatch(fetchThreadDetail(id));
    dispatch(fetchAllUsers());

    api
      .getOwnProfile()
      .then((profile) => setUser(profile))
      .catch(() => setUser(null))
      .finally(() => setProgress(100));

    const handleLogoutEvent = () => setUser(null);
    window.addEventListener('userLoggedOut', handleLogoutEvent);
    return () => window.removeEventListener('userLoggedOut', handleLogoutEvent);
  }, [id, dispatch]);

  const getUserProfilePhoto = (username) => {
    const found = users.find((u) => u.name === username);
    return found?.avatar || 'https://via.placeholder.com/40';
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setProgress(30);
      dispatch(createComment({ threadId: id, content: comment })).finally(
        () => {
          setProgress(100);
          setComment('');
        }
      );
    }
  };

  const handleVotePost = (type) => {
    setProgress(30);
    dispatch(voteThread({ id, type })).finally(() => setProgress(100));
  };

  const handleVoteComment = (commentId, type) => {
    setProgress(30);
    dispatch(voteComment({ threadId: id, commentId, type })).finally(() =>
      setProgress(100)
    );
  };

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
