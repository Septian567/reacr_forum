import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { votePost, selectFilteredPosts } from '../features/posts/postSlice';

const usePostList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  const handleVote = (postId, type) => {
    dispatch(votePost({ postId, type }));
  };

  return {
    posts,
    handleNavigate,
    handleVote,
  };
};

export default usePostList;
