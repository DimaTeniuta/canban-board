import errorService from "../../exceptions/error.service.js";

export const chooseUserResponse = (res, user) => {
  if (typeof user === "string") {
    if (user === "Not Found") {
      return res.status(404).json(errorService.setError(user));
    }
    return res.status(400).json(errorService.setError(user));
  }
  return res.json(user);
};