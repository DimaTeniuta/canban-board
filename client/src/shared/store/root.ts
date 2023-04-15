import { makeAutoObservable } from 'mobx';
import UserStore from './userStore/userStore';

class RootStore {
  user = new UserStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new RootStore();
export default store;
