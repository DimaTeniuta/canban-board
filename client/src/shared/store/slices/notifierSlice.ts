import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStoreState } from '../types/api.types';
import { INotifierStore } from '../types/notifierSlice.types';

const initialState: INotifierStore = {
  alertArray: [],
  alertId: 0,
};

const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    openErrorAlert(state, action: PayloadAction<string>) {
      const newAlertId = state.alertId + 1;
      const alertData = {
        id: newAlertId,
        message: action.payload || 'error',
        type: 'error' as const,
      };
      const newAlertArray = [...state.alertArray, alertData];
      setTimeout(() => closeAlert(newAlertId), 5000);
      return { ...state, alertArray: newAlertArray, alertId: newAlertId };
    },

    closeAlert(state, action: PayloadAction<number>) {
      return {
        ...state,
        alertArray: state.alertArray.filter((alert) => alert.id !== action.payload),
      };
    },
  },
});

export const { openErrorAlert, closeAlert } = notifierSlice.actions;
export const selectNotifier = (state: IStoreState) => state.notifier;
export default notifierSlice.reducer;
