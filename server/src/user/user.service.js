import UserDto from "./dto/user.dto.js";
import userModel from "./user.model.js";

class UserService {
  async getUser(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      return "Not Found";
    }
    const userDto = new UserDto(user);
    return userDto;
  }

  async updateUser(userId, userName) {
    const res = await userModel.findOneAndUpdate({ _id: userId }, { name: userName });
    if (!res) {
      return "Not Found";
    }
    const user = await userModel.findById(userId);
    const userDto = new UserDto(user);
    return userDto;
  }

  async deleteUser(userId) {
    await userModel.findOneAndDelete({ _id: userId });
    return { message: "success" };
  }
}

const userService = new UserService();
export default userService;
