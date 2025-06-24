import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../states/auth/action';
import { resetLoginState } from '../states/auth/reducer';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const { status, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Mohon isi semua kolom!');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    dispatch(resetLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/');
    }
  }, [status, user, navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isPasswordFocused,
    setIsPasswordFocused,
    handleSubmit,
    status,
    error,
  };
};

export default useLoginForm;
