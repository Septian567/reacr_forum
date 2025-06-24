import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../states/auth/action';
import {
  fetchPostsAndUsers,
  addNewPost,
  votePost,
} from '../states/posts/action';
import {
  selectFilteredPosts,
  selectSelectedCategory,
} from '../states/posts/reducer';

const useMainPage = () => {
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
        console.warn('Tidak login, lewati ambil profil user:', err.message);
      }

      try {
        await dispatch(fetchPostsAndUsers()).unwrap();
      } catch (err) {
        console.warn('Gagal ambil data post/user:', err.message);
      } finally {
        setProgress(100);
      }
    };

    loadData();

    const handleLogout = () => {
      // Redux sudah handle state auth
    };

    window.addEventListener('userLoggedOut', handleLogout);
    return () => {
      window.removeEventListener('userLoggedOut', handleLogout);
      setProgress(0);
    };
  }, [dispatch]);

  const handleAddPost = (newPost) => {
    dispatch(addNewPost(newPost));
  };

  const handleVote = (postId, type) => {
    dispatch(votePost({ postId, type }));
  };

  return {
    progress,
    setProgress,
    user,
    posts,
    selectedCategory,
    handleAddPost,
    handleVote,
  };
};

export default useMainPage;
