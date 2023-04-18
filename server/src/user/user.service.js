import userModel from "./user.model.js";

class UserService {
  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }

  async getUser(userId) {
    const user = await userModel.findById(userId);
    return user;
  }

  async updateUser(userId, userName) {
    await userModel.findOneAndUpdate({ _id: userId }, { name: userName });
    const user = await userModel.findById(userId);
    return user;
  }

  async deleteUser(userId) {
    await userModel.findOneAndDelete({ _id: userId });
    return { message: 'success'};
  }
}

const userService = new UserService();
export default userService;
