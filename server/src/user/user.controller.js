import { validationResult } from "express-validator";
import { chooseUserResponse } from "./helpers/checkUserResponse.js";
import userService from "./user.service.js";
import errorService from "../exceptions/error.service.js";

class UserController {
  async getUser(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);
      const response = chooseUserResponse(res, user);
      return response;
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const userId = req.user.id;
      const id = req.params.id;
      if (id !== userId) {
        return next(res.status(400).json("Bad request"));
      }
      const { name } = req.body;
      const user = await userService.updateUser(userId, name);
      const response = chooseUserResponse(res, user);
      return response;
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;
      if (id !== userId) {
        return next(res.status(400).json("Bad request"));
      }
      const user = await userService.deleteUser(userId);
      const response = chooseUserResponse(res, user);
      return response;
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
