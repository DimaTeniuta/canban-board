import { validationResult } from "express-validator";
import authService from "./auth.service.js";
import errorService from "../exceptions/error.service.js";
import { chooseAuthResponse } from "./helpers/chooseAuthResponse.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const { email, password, name } = req.body;
      const userData = await authService.registration(email, password, name);
      const response = chooseAuthResponse(res, userData, 400);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json(errorService.setError(errors.errors[0].msg)));
      }
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      const response = chooseAuthResponse(res, userData, 400);

      return response;
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {;
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      const response = chooseAuthResponse(res, userData, 403);

      return response;
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
