import { useNavigate } from 'react-router-dom';

const usePostList = (userId) => {
  const navigate = useNavigate();

  const handleNavigate = (postId) => {
    navigate(`/post/${postId}`);
  };

  const hasUpvoted = (post) => post.upVotesBy?.includes(userId);
  const hasDownvoted = (post) => post.downVotesBy?.includes(userId);

  return {
    handleNavigate,
    hasUpvoted,
    hasDownvoted,
  };
};

export default usePostList;
