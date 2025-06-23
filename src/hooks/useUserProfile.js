import { useSelector } from 'react-redux';

const useUserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  return { user };
};

export default useUserProfile;
