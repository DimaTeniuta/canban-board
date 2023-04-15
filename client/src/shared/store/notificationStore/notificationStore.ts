import { makeAutoObservable } from 'mobx';
import { IAlert } from './notificationStore.types';

class NotificationStore {
  alertArray: IAlert[] = [];
  alertId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  openErrorAlert(errorMessage?: string) {
    const alertData: IAlert = {
      id: ++this.alertId,
      message: errorMessage || 'error',
      type: 'error',
    };
    this.alertArray.push(alertData);
    this.autoCloseAlert(alertData.id);
  }

  autoCloseAlert(id: number) {
    setTimeout(() => this.closeAlert(id), 5000);
  }

  closeAlert(id: number) {
    this.alertArray = this.alertArray.filter((alert) => alert.id !== id);
  }
}

export const notificationStore = new NotificationStore();
