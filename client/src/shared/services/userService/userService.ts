import api from '../../api/api';

class UserService {
  getAllUsers(): Promise<void> {
    return api.get('/users');
  }
}

const userService = new UserService();

export default userService;
