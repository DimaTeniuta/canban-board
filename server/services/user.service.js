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

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

const userService = new UserService();
export default userService;
