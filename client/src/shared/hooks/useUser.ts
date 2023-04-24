import { selectUser } from '../store/slices/userSlice';
import { useStoreSelector } from './store.hooks';

const useUser = () => {
  const user = useStoreSelector(selectUser);
  return user;
};

export default useUser;
