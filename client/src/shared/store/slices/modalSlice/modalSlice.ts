import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '../../store.types';
import { IModalStore } from './modalSlice.types';
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
    openModal(state, action) {
      return { ...state, ...action.payload };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: IStoreState) => state.modal;
export default modalSlice.reducer;
