import userModel from "../user/user.model.js";
import bcrypt from "bcrypt";
import tokenService from "../token/token.service.js";
import UserDto from './dto/auth.dto.js';

class AuthService {
  async registration(email, password, name) {
    const userBd = await userModel.findOne({ email });
    if (userBd) {
      return "The email has already existed";
    }
  
    const nameBd = await userModel.findOne({ name });
    if (nameBd) {
      return "The nick name has already existed";
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashPassword, name });
    const userDto = new UserDto(user);
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
      return "Invalid email or password";
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      return "Invalid email or password";
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
      return 'Unauthorized';
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      return 'Unauthorized';
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
}

const authService = new AuthService();
export default authService;
