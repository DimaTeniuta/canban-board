import { validationResult } from "express-validator";
import authService from "./auth.service.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const { email, password, name } = req.body;
      const userData = await authService.registration(email, password, name);
      if (typeof userData === "string") {
        res.status(400).json(userData);
      } else {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(res.status(400).json("Validation error"));
      }
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      if (typeof userData === "string") {
        res.status(400).json(userData);
      } else {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(userData);
      }
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
      if (typeof userData === "string") {
        res.status(401).json(userData);
      } else {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(userData);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUsers(_, res, next) {
    try {
      const users = await authService.getAllUsers();
      const filteredUsers = users.map((user) => {
        return { email: user.email, id: user._id, name: user.name };
      });
      res.json(filteredUsers);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
