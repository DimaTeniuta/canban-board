import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '../../store.types';
import { IModalStore } from './modalSlice.types';
import DefaultComponent from './helpers/DefaultComponent';

const initialState: IModalStore = {
  open: false,
  title: '',
  Component: DefaultComponent,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(_, action) {
      return { ...action.payload };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: IStoreState) => state.modal;
export default modalSlice.reducer;
