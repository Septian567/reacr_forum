import { useState } from 'react';
import { useSelector } from 'react-redux';

const usePostForm = (onPost) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim() || !content.trim()) {
      alert('Judul, kategori, dan konten tidak boleh kosong.');
      return;
    }

    if (!user) {
      alert('Data user belum siap. Coba lagi sebentar.');
      return;
    }

    setLoading(true);

    try {
      await onPost({
        title,
        body: content,
        category,
        user,
      });

      setTitle('');
      setCategory('');
      setContent('');
    } catch (error) {
      alert(`Gagal membuat postingan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    category,
    content,
    loading,
    user,
    setTitle,
    setCategory,
    setContent,
    handleSubmit,
  };
};

export default usePostForm;
