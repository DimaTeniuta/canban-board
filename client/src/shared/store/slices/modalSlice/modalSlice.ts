import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStoreState } from '../../store.types';
import { IModalStore, TModalFields } from './modalSlice.types';
import DefaultComponent from './helpers/DefaultComponent';

const initialState: IModalStore = {
  open: false,
  title: '',
  Component: DefaultComponent,
  modalData: { data: '' },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<TModalFields>) {
      return { ...state, open: true, ...action.payload };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: IStoreState) => state.modal;
export default modalSlice.reducer;
