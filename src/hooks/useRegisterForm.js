import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../states/auth/action';
import { resetRegisterState } from '../states/auth/reducer';
import { useNavigate } from 'react-router-dom';

const useRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerLoading, isRegistered, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      alert('Registrasi berhasil! Silakan login.');
      dispatch(resetRegisterState());
      navigate('/login');
    }
    if (error) {
      alert(`Registrasi gagal: ${error}`);
    }
  }, [isRegistered, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert('Mohon isi semua kolom!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi tidak cocok!');
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmFocused,
    setIsConfirmFocused,
    registerLoading,
    navigate,
  };
};

export default useRegisterForm;
