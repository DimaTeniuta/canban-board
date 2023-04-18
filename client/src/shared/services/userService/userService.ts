import api from '../../api/api';

class UserService {
  getAllUsers(): Promise<void> {
    return api.get('/users');
  }

  getUser(id: string): Promise<void> {
    return api.get(`/users/${id}`);
  }

  updateUser(id: string, name: string): Promise<void> {
    return api.put(`/users/${id}`, { name });
  }
}

const userService = new UserService();

export default userService;
