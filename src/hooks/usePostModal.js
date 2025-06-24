// src/hooks/usePostModal.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../states/auth/action';
import { logout } from '../states/auth/reducer';
import { addNewPost } from '../states/posts/action';

const usePostModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) setShowModal(false);
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Judul dan isi postingan tidak boleh kosong.');
      return;
    }

    try {
      await dispatch(
        addNewPost({
          title: postTitle,
          body: postContent,
          category: category || 'umum',
          user,
        })
      ).unwrap();

      setPostTitle('');
      setPostContent('');
      setCategory('');
      setShowModal(false);
    } catch (err) {
      alert(`Gagal membuat postingan: ${err}`);
    }
  };

  return {
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
  };
};

export default usePostModal;
