import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchThreadDetail,
  fetchAllUsers,
  voteThread,
  voteComment,
  createComment,
} from '../states/thread/action';
import api from '../utils/api';

const useThreadDetail = (id) => {
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

  return {
    thread,
    users,
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
  };
};

export default useThreadDetail;
