import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { IUser } from '../../types/user';
import authService from '../../services/authService/userService';
import { IAuthResponse } from '../../types/authResponse';
import { API_URL } from '../../api/api';

export default class UserStore {
  user: IUser | null = null;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private setAuth(value: boolean) {
    this.isAuth = value;
  }

  private setUser(value: IUser | null) {
    this.user = value;
  }

  private setLoading(value: boolean) {
    this.isLoading = value;
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public async registration(email: string, password: string) {
    try {
      this.setLoading(true);
      const response = await authService.register(email, password);
      console.log('register', response);
      this.setToken(response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  public async login(email: string, password: string) {
    try {
      this.setLoading(true);
      const response = await authService.login(email, password);
      console.log('login', response);
      this.setToken(response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  public async logout() {
    try {
      this.setLoading(true);
      const response = await authService.logout();
      console.log('logout', response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  public async checkAuth() {
    try {
      this.setLoading(true);
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log('checkAuth', response);
      this.setToken(response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }
}
