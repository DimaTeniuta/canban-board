import errorService from "../../exceptions/error.service.js";

export const chooseAuthResponse = (res, userData, status) => {
    if (typeof userData === "string") {
        res.status(status).json(errorService.setError(userData));
      } else {
        res.cookie("refreshToken", userData.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.json(userData);
      }
};