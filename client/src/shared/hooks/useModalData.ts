import { selectModal } from '../store/slices/modalSlice/modalSlice';
import { useStoreSelector } from './store.hooks';

const useModalData = () => {
  const { modalData } = useStoreSelector(selectModal);

  return modalData;
};

export default useModalData;
