import UserDto from "./dto/user.dto.js";
import userModel from "./user.model.js";
import boardModel from "../board/board.model.js";
import columnModel from "../column/column.model.js";
import taskModel from "../task/task.model.js";

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
    const res = await userModel.findOneAndUpdate(
      { _id: userId },
      { name: userName }
    );
    if (!res) {
      return "Not Found";
    }
    const user = await userModel.findById(userId);
    const userDto = new UserDto(user);
    return userDto;
  }

  async deleteUser(userId) {
    const res = await userModel.findOneAndDelete({ _id: userId });
    if (!res) {
      return "Not Found";
    }
    await boardModel.deleteMany({ userId });
    await columnModel.deleteMany({ userId });
    await taskModel.deleteMany({ userId });
    return { message: "success" };
  }
}

const userService = new UserService();
export default userService;
