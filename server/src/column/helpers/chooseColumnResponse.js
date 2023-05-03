import errorService from "../../exceptions/error.service.js";

export const chooseColumnResponse = (res, column) => {
  if (typeof column === "string") {
    if (column === "Not Found") {
      return res.status(404).json(errorService.setError(column));
    }
    return res.status(400).json(errorService.setError(column));
  }
  return res.json(column);
};
