import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import UserDto from "../dtos/user.dto.js";
import ApiError from "../exceptions/api.error.js";

class UserService {
  async registration(email, password) {
    const userBd = await userModel.findOne({ email });
    if (userBd) {
      throw ApiError.BadRequest("The email has already existed");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashPassword });
    const userDto = new UserDto(user); // id, email
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

const userService = new UserService();
export default userService;
