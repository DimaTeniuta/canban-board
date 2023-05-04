import { selectModal } from '../store/slices/modalSlice/modalSlice';
import { useStoreSelector } from './storeHooks';

const useModal = () => {
  const modal = useStoreSelector(selectModal);
  return modal;
};

export default useModal;
