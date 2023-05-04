import { selectUser } from '../store/slices/userSlice/userSlice';
import { useStoreSelector } from './storeHooks';

const useUser = () => {
  const user = useStoreSelector(selectUser);
  return user;
};

export default useUser;
