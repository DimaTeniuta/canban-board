import { selectModal } from '../store/slices/modalSlice/modalSlice';
import { useStoreSelector } from './storeHooks';

const useModalData = () => {
  const { modalData } = useStoreSelector(selectModal);

  return modalData;
};

export default useModalData;
