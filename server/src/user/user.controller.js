import userService from "./user.service.js";

class UserController {
  async getAllUsers(_, res, next) {
    try {
      const users = await userService.getAllUsers();
      const filteredUsers = users.map((user) => {
        return { email: user.email, id: user._id, name: user.name };
      });
      res.json(filteredUsers);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);
      res.json({ email: user.email, id: user._id, name: user.name });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;
      if (id !== userId) {
        return next(res.status(400).json("Bad request"));
      }
      const { name } = req.body;
      const user = await userService.updateUser(userId, name);
      res.json({ email: user.email, id: user._id, name: user.name });
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
      const response = await userService.deleteUser(userId);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
