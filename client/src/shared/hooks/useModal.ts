import { selectModal } from '../store/slices/modalSlice/modalSlice';
import { useStoreSelector } from './store.hooks';

const useModal = () => {
  const modal = useStoreSelector(selectModal);
  return modal;
};

export default useModal;
