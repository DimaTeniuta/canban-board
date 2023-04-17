import api from '../../api/api';
import { IAuthResponse } from '../../types/authResponse';

class AuthService {
  register(email: string, password: string, name: string) {
    return api.post<IAuthResponse>('/registration', { email, password, name });
  }

  login(email: string, password: string) {
    return api.post<IAuthResponse>('/login', { email, password });
  }

  logout(): Promise<void> {
    return api.post('/logout');
  }
}

const authService = new AuthService();

export default authService;
